(function () {
  const TRACKS = [
    { id: "bgm_title",   title: "雪落之前的残响",   subtitle: "Main Theme — Winter Piano & Strings", file: "assets/audio/bgm_title.mp3" },
    { id: "bgm_daily",   title: "午后银杏树下",     subtitle: "Campus Afternoon — Acoustic Piano & Guitar", file: "assets/audio/bgm_daily.mp3" },
    { id: "bgm_kanade",  title: "冰晶与玻璃杯",     subtitle: "九条奏 Theme — Minor Piano & Celesta", file: "assets/audio/bgm_kanade.mp3" },
    { id: "bgm_kaoru",   title: "暖阳下的琴弦",     subtitle: "君安芳 Theme — Fingerpicked Acoustic Guitar", file: "assets/audio/bgm_kaoru.mp3" },
    { id: "bgm_rinne",   title: "归途的街灯",       subtitle: "橘凛音 Theme — Light Piano & Chimes", file: "assets/audio/bgm_rinne.mp3" },
    { id: "bgm_tension", title: "未说出口的真相",   subtitle: "Conflict — Sparse Winter Strings", file: "assets/audio/bgm_tension.mp3" },
    { id: "bgm_climax",  title: "白雪降临的夜晚",   subtitle: "Finale — Emotional Winter Ensemble", file: "assets/audio/bgm_climax.mp3" }
  ];

  const SFX_MAP = {
    click:     "assets/audio/sfx_click.wav",
    hover:     "assets/audio/sfx_hover.wav",
    save:      "assets/audio/sfx_save.wav",
    chime:     "assets/audio/sfx_chime.mp3",
    door:      "assets/audio/sfx_door.wav",
    page:      "assets/audio/sfx_page.wav",
    heartbeat: "assets/audio/sfx_heartbeat.wav"
  };

  class AudioManager {
    constructor() {
      this.bgmVol = 0.65;
      this.sfxVol = 0.75;
      this.currentId = null;
      this.unlocked = false;
      this.needsResume = false;
      this._playSeq = 0;
      this._fadeTimer = null;
      this._stallTimer = null;

      // Keep a single persistent BGM <audio> element so iOS Safari retains
      // user-gesture unlock across scene switches, auto-advance, and CDN retries.
      this.bgmEl = new Audio();
      this.bgmEl.loop = true;
      this.bgmEl.preload = "auto";
      this.bgmEl.playsInline = true;
      this.currentAudio = this.bgmEl;

      this.resolveUrlFn = (relPath) => relPath;
      this.onFallbackFn = null;

      this.blobCache = new Map();
      this.prefetchPromises = new Map();
      this.ctx = null;
      this.sfxBuffers = new Map();
      this.sfxPending = new Map();
    }

    setUrlResolver(resolveFn, onFallbackFn) {
      if (typeof resolveFn === "function") this.resolveUrlFn = resolveFn;
      this.onFallbackFn = typeof onFallbackFn === "function" ? onFallbackFn : null;
    }

    _canFetch() {
      return typeof location !== "undefined" && (location.protocol === "http:" || location.protocol === "https:");
    }

    async _fetchWithCdnFallback(relPath) {
      const primaryUrl = this.resolveUrlFn(relPath, false);
      const cdnUrl = this.resolveUrlFn(relPath, true);
      const tryFetch = async (url) => {
        const ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
        const timer = ctrl ? setTimeout(() => ctrl.abort(), 5000) : null;
        try {
          const res = await fetch(url, ctrl ? { signal: ctrl.signal } : undefined);
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res;
        } finally {
          if (timer) clearTimeout(timer);
        }
      };
      try {
        return await tryFetch(primaryUrl);
      } catch (_) {
        if (cdnUrl && cdnUrl !== primaryUrl) {
          if (this.onFallbackFn) this.onFallbackFn();
          return await tryFetch(cdnUrl);
        }
        throw _;
      }
    }

    preloadBGM(id) {
      if (!id || !this._canFetch()) return Promise.resolve();
      const track = TRACKS.find(t => t.id === id);
      if (!track) return Promise.resolve();
      if (this.blobCache.has(track.file)) return Promise.resolve();
      if (this.prefetchPromises.has(track.file)) return this.prefetchPromises.get(track.file);

      const p = this._fetchWithCdnFallback(track.file)
        .then(res => res.blob())
        .then(blob => {
          if (!this.blobCache.has(track.file) && blob && blob.size > 0) {
            this.blobCache.set(track.file, URL.createObjectURL(blob));
          }
        })
        .catch(() => {})
        .finally(() => {
          this.prefetchPromises.delete(track.file);
        });
      this.prefetchPromises.set(track.file, p);
      return p;
    }

    _ensureCtx() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) {
          try { this.ctx = new AC(); } catch (_) {}
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    _warmSFX(name) {
      const src = SFX_MAP[name];
      if (!src || !this._canFetch() || this.sfxBuffers.has(src) || this.sfxPending.has(src)) return;
      const ctx = this.ctx;
      if (!ctx) return;
      const p = this._fetchWithCdnFallback(src)
        .then(res => res.arrayBuffer())
        .then(buf => new Promise((resolve, reject) => {
          ctx.decodeAudioData(buf, resolve, reject);
        }))
        .then(decoded => {
          this.sfxBuffers.set(src, decoded);
        })
        .catch(() => {})
        .finally(() => {
          this.sfxPending.delete(src);
        });
      this.sfxPending.set(src, p);
    }

    setVolumes(bgmVol, sfxVol) {
      this.bgmVol = Math.max(0, Math.min(1, bgmVol));
      this.sfxVol = Math.max(0, Math.min(1, sfxVol));
      if (this.bgmEl) {
        this.bgmEl.volume = this.bgmVol;
      }
    }

    _clearTimers() {
      if (this._fadeTimer) {
        clearInterval(this._fadeTimer);
        this._fadeTimer = null;
      }
      if (this._stallTimer) {
        clearTimeout(this._stallTimer);
        this._stallTimer = null;
      }
    }

    unlock() {
      this._ensureCtx();
      if (!this.unlocked) {
        ["click", "hover", "page"].forEach(n => this._warmSFX(n));
      }
      if (this.currentId && (this.needsResume || this.bgmEl.paused)) {
        const track = TRACKS.find(t => t.id === this.currentId);
        if (track && this.bgmEl.readyState < 2 && this.blobCache.has(track.file)) {
          const cached = this.blobCache.get(track.file);
          if (this.bgmEl.src !== cached) this.bgmEl.src = cached;
        }
        this.bgmEl.volume = this.bgmVol;
        const p = this.bgmEl.play();
        if (p && typeof p.then === "function") {
          p.then(() => {
            this.unlocked = true;
            this.needsResume = false;
          }).catch(() => {
            this.needsResume = true;
          });
        } else {
          this.unlocked = true;
          this.needsResume = false;
        }
      }
    }

    _startPlayback(seq, fadeMs) {
      const p = this.bgmEl.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          if (this._playSeq !== seq) return;
          this.unlocked = true;
          this.needsResume = false;
          this.fadeIn(this.bgmEl, this.bgmVol, fadeMs);
        }).catch(() => {
          if (this._playSeq !== seq) return;
          this.needsResume = true;
        });
      } else {
        this.unlocked = true;
        this.needsResume = false;
        this.fadeIn(this.bgmEl, this.bgmVol, fadeMs);
      }
    }

    playBGM(id) {
      if (!id) {
        this.stopBGM();
        return;
      }
      const track = TRACKS.find(t => t.id === id);
      if (!track) return;

      if (this.currentId === id && this.bgmEl.src) {
        if (!this.bgmEl.paused) return;
        this.bgmEl.volume = this.bgmVol;
        this._startPlayback(this._playSeq, 350);
        return;
      }

      const seq = ++this._playSeq;
      this.currentId = id;
      this.needsResume = false;
      this._clearTimers();

      if (this.blobCache.has(track.file)) {
        this.bgmEl.oncanplay = null;
        this.bgmEl.onplaying = null;
        this.bgmEl.onerror = null;
        this.bgmEl.src = this.blobCache.get(track.file);
        this.bgmEl.volume = 0;
        this._startPlayback(seq, 450);
        return;
      }

      const primaryUrl = this.resolveUrlFn(track.file, false);
      const cdnUrl = this.resolveUrlFn(track.file, true);
      let triedFallback = !cdnUrl || cdnUrl === primaryUrl;

      const clearReadyHooks = () => {
        if (this._stallTimer) {
          clearTimeout(this._stallTimer);
          this._stallTimer = null;
        }
      };

      const switchToCdn = () => {
        if (this._playSeq !== seq || triedFallback) return;
        triedFallback = true;
        clearReadyHooks();
        if (this.onFallbackFn) this.onFallbackFn();
        this.bgmEl.src = cdnUrl;
        this.bgmEl.load();
        this._startPlayback(seq, 450);
      };

      this.bgmEl.oncanplay = () => { if (this._playSeq === seq) clearReadyHooks(); };
      this.bgmEl.onplaying = () => { if (this._playSeq === seq) clearReadyHooks(); };
      this.bgmEl.onerror = () => { if (this._playSeq === seq) switchToCdn(); };

      if (!triedFallback) {
        this._stallTimer = setTimeout(() => {
          if (this._playSeq === seq && this.bgmEl.readyState < 2 && this.currentId === id) {
            switchToCdn();
          }
        }, 5000);
      }

      this.bgmEl.src = primaryUrl;
      this.bgmEl.volume = 0;
      if (!this.unlocked) this.preloadBGM(id);
      this._startPlayback(seq, 450);
    }

    stopBGM() {
      const seq = ++this._playSeq;
      this.currentId = null;
      this.needsResume = false;
      this._clearTimers();
      this.bgmEl.oncanplay = null;
      this.bgmEl.onplaying = null;
      this.bgmEl.onerror = null;
      this.fadeOutAndStop(this.bgmEl, 400, seq);
    }

    fadeIn(audio, targetVol, durationMs) {
      if (this._fadeTimer) clearInterval(this._fadeTimer);
      const seq = this._playSeq;
      audio.volume = 0;
      const steps = 14;
      const stepTime = Math.max(16, durationMs / steps);
      let step = 0;
      this._fadeTimer = setInterval(() => {
        if (this._playSeq !== seq) {
          clearInterval(this._fadeTimer);
          this._fadeTimer = null;
          return;
        }
        step++;
        audio.volume = Math.min(targetVol, (step / steps) * targetVol);
        if (step >= steps) {
          clearInterval(this._fadeTimer);
          this._fadeTimer = null;
        }
      }, stepTime);
    }

    fadeOutAndStop(audio, durationMs, seq) {
      if (this._fadeTimer) clearInterval(this._fadeTimer);
      const startVol = audio.volume;
      const steps = 12;
      const stepTime = Math.max(16, durationMs / steps);
      let step = 0;
      this._fadeTimer = setInterval(() => {
        if (this._playSeq !== seq) {
          clearInterval(this._fadeTimer);
          this._fadeTimer = null;
          return;
        }
        step++;
        audio.volume = Math.max(0, startVol * (1 - step / steps));
        if (step >= steps) {
          clearInterval(this._fadeTimer);
          this._fadeTimer = null;
          audio.pause();
        }
      }, stepTime);
    }

    playSFX(name) {
      const src = SFX_MAP[name];
      if (!src || this.sfxVol <= 0.01) return;

      const ctx = this._ensureCtx();
      if (ctx && ctx.state === "running") {
        const decoded = this.sfxBuffers.get(src);
        if (decoded) {
          try {
            const source = ctx.createBufferSource();
            source.buffer = decoded;
            const gain = ctx.createGain();
            gain.gain.value = this.sfxVol;
            source.connect(gain);
            gain.connect(ctx.destination);
            source.start(0);
            return;
          } catch (_) {}
        } else {
          this._warmSFX(name);
        }
      }

      const url = this.resolveUrlFn(src, false);
      const sfx = new Audio(url);
      sfx.volume = this.sfxVol;
      sfx.play().catch(() => {});
    }

    getTracks() {
      return TRACKS;
    }
  }

  window.AudioMgr = new AudioManager();
})();
