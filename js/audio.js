(function () {
  const TRACKS = [
    { id: "bgm_title",   title: "雪落之前的残响",   subtitle: "Main Theme — Winter Piano & Strings", file: "assets/audio/bgm_title.wav" },
    { id: "bgm_daily",   title: "午后银杏树下",     subtitle: "Campus Afternoon — Acoustic Piano & Guitar", file: "assets/audio/bgm_daily.wav" },
    { id: "bgm_kanade",  title: "冰晶与玻璃杯",     subtitle: "九条奏 Theme — Minor Piano & Celesta", file: "assets/audio/bgm_kanade.wav" },
    { id: "bgm_kaoru",   title: "暖阳下的琴弦",     subtitle: "君安芳 Theme — Fingerpicked Acoustic Guitar", file: "assets/audio/bgm_kaoru.wav" },
    { id: "bgm_rinne",   title: "归途的街灯",       subtitle: "橘凛音 Theme — Light Piano & Chimes", file: "assets/audio/bgm_rinne.wav" },
    { id: "bgm_tension", title: "未说出口的真相",   subtitle: "Conflict — Sparse Winter Strings", file: "assets/audio/bgm_tension.wav" },
    { id: "bgm_climax",  title: "白雪降临的夜晚",   subtitle: "Finale — Emotional Winter Ensemble", file: "assets/audio/bgm_climax.wav" }
  ];

  const SFX_MAP = {
    click:     "assets/audio/sfx_click.wav",
    hover:     "assets/audio/sfx_hover.wav",
    save:      "assets/audio/sfx_save.wav",
    chime:     "assets/audio/sfx_chime.wav",
    door:      "assets/audio/sfx_door.wav",
    page:      "assets/audio/sfx_page.wav",
    heartbeat: "assets/audio/sfx_heartbeat.wav"
  };

  class AudioManager {
    constructor() {
      this.bgmVol = 0.65;
      this.sfxVol = 0.75;
      this.currentId = null;
      this.currentAudio = null;
      this.fadeTimer = null;
      this.unlocked = false;
    }

    setVolumes(bgmVol, sfxVol) {
      this.bgmVol = Math.max(0, Math.min(1, bgmVol));
      this.sfxVol = Math.max(0, Math.min(1, sfxVol));
      if (this.currentAudio) {
        this.currentAudio.volume = this.bgmVol;
      }
    }

    unlock() {
      this.unlocked = true;
      if (this.currentId && this.currentAudio && this.currentAudio.paused) {
        this.currentAudio.volume = this.bgmVol;
        this.currentAudio.play().catch(() => {});
      }
    }

    playBGM(id) {
      if (!id) {
        this.stopBGM();
        return;
      }
      if (this.currentId === id && this.currentAudio && !this.currentAudio.paused) {
        return;
      }
      const track = TRACKS.find(t => t.id === id);
      if (!track) return;

      const oldAudio = this.currentAudio;
      this.currentId = id;

      const nextAudio = new Audio(track.file);
      nextAudio.loop = true;
      nextAudio.volume = 0;
      this.currentAudio = nextAudio;

      nextAudio.play().then(() => {
        this.fadeIn(nextAudio, this.bgmVol, 650);
      }).catch(() => {
        // Will auto-resume on first user interaction via unlock()
      });

      if (oldAudio) {
        this.fadeOutAndStop(oldAudio, 550);
      }
    }

    stopBGM() {
      this.currentId = null;
      if (this.currentAudio) {
        const old = this.currentAudio;
        this.currentAudio = null;
        this.fadeOutAndStop(old, 450);
      }
    }

    fadeIn(audio, targetVol, durationMs) {
      const steps = 16;
      const stepTime = durationMs / steps;
      let step = 0;
      const timer = setInterval(() => {
        if (audio !== this.currentAudio) {
          clearInterval(timer);
          return;
        }
        step++;
        audio.volume = Math.min(targetVol, (step / steps) * targetVol);
        if (step >= steps) clearInterval(timer);
      }, stepTime);
    }

    fadeOutAndStop(audio, durationMs) {
      const startVol = audio.volume;
      const steps = 14;
      const stepTime = durationMs / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        audio.volume = Math.max(0, startVol * (1 - step / steps));
        if (step >= steps) {
          clearInterval(timer);
          audio.pause();
          audio.src = "";
        }
      }, stepTime);
    }

    playSFX(name) {
      const src = SFX_MAP[name];
      if (!src || this.sfxVol <= 0.01) return;
      const sfx = new Audio(src);
      sfx.volume = this.sfxVol;
      sfx.play().catch(() => {});
    }

    getTracks() {
      return TRACKS;
    }
  }

  window.AudioMgr = new AudioManager();
})();
