(function () {
  const GLOBAL_KEY = "echoes_snow_global_v1";
  const SAVES_KEY = "echoes_snow_saves_v1";
  const QUICK_KEY = "echoes_snow_qsave_v1";
  const AUTO_KEY = "echoes_snow_autosave_v1";

  const CG_META = [
    { id: "cg_kanade_library",        title: "镜片后的秘密 · 九条奏",    file: "assets/images/cg/cg_kanade_library.webp" },
    { id: "cg_kaoru_rooftop",         title: "黄昏的弦音 · 君安芳",      file: "assets/images/cg/cg_kaoru_rooftop.webp" },
    { id: "cg_rinne_snow",            title: "雪夜的眼泪 · 橘凛音",      file: "assets/images/cg/cg_rinne_snow.webp" },
    { id: "cg_shuraba_confrontation", title: "失温的合奏 · 旧部室之夜",  file: "assets/images/cg/cg_shuraba_confrontation.webp" },
    { id: "cg_finale_snow",           title: "初雪降临的瞬间 · 终章",    file: "assets/images/cg/cg_finale_snow.webp" }
  ];

  const BG_FILES = {
    bg_title:            "assets/images/bg/bg_title.webp",
    bg_clubroom:         "assets/images/bg/bg_clubroom.webp",
    bg_clubroom_night:   "assets/images/bg/bg_clubroom_night.webp",
    bg_classroom:        "assets/images/bg/bg_classroom.webp",
    bg_classroom_winter: "assets/images/bg/bg_classroom_winter.webp",
    bg_rooftop:          "assets/images/bg/bg_rooftop.webp",
    bg_rooftop_snow:     "assets/images/bg/bg_rooftop_snow.webp",
    bg_library:          "assets/images/bg/bg_library.webp",
    bg_music_room:       "assets/images/bg/bg_music_room.webp",
    bg_hallway:          "assets/images/bg/bg_hallway.webp",
    bg_hallway_night:    "assets/images/bg/bg_hallway_night.webp",
    bg_station_night:    "assets/images/bg/bg_station_night.webp",
    bg_winter_street:    "assets/images/bg/bg_winter_street.webp",
    bg_shopping_street:  "assets/images/bg/bg_shopping_street.webp",
    bg_room_rinne:       "assets/images/bg/bg_room_rinne.webp",
    bg_room_rinne_dark:  "assets/images/bg/bg_room_rinne_dark.webp",
    bg_street_snow:      "assets/images/bg/bg_street_snow.webp"
  };

  const CHAR_FILES = {
    kanade_normal:  "assets/images/char/kanade_normal.webp",
    kanade_glasses: "assets/images/char/kanade_glasses.webp",
    kanade_sad:     "assets/images/char/kanade_sad.webp",
    kanade_hold:    "assets/images/char/kanade_hold.webp",
    kanade_side:    "assets/images/char/kanade_side.webp",
    kanade_smile:   "assets/images/char/kanade_smile.webp",
    kanade_think:   "assets/images/char/kanade_think.webp",
    kaoru_normal:   "assets/images/char/kaoru_normal.webp",
    kaoru_happy:    "assets/images/char/kaoru_happy.webp",
    kaoru_sad:      "assets/images/char/kaoru_sad.webp",
    kaoru_shy:      "assets/images/char/kaoru_shy.webp",
    kaoru_look:     "assets/images/char/kaoru_look.webp",
    kaoru_guitar:   "assets/images/char/kaoru_guitar.webp",
    kaoru_ear:      "assets/images/char/kaoru_ear.webp",
    rinne_tsun:     "assets/images/char/rinne_tsun.webp",
    rinne_normal:   "assets/images/char/rinne_normal.webp",
    rinne_cry:      "assets/images/char/rinne_cry.webp",
    rinne_shy:      "assets/images/char/rinne_shy.webp",
    rinne_smile:    "assets/images/char/rinne_smile.webp",
    rinne_hip:      "assets/images/char/rinne_hip.webp",
    shota_normal:   "assets/images/char/shota_normal.webp",
    yuma_normal:    "assets/images/char/yuma_normal.webp"
  };

  const DEFAULT_CONFIG = {
    textSpeed: 72,
    autoSpeed: 55,
    bgmVol: 65,
    sfxVol: 75,
    skipMode: "read",
    particles: true,
    cdnAccel: false
  };

  function detectGitHubCDNBase() {
    try {
      const host = window.location.hostname || "";
      if (!host.endsWith(".github.io")) return null;
      const owner = host.split(".")[0];
      const parts = (window.location.pathname || "/").split("/").filter(Boolean);
      const repo = (parts.length > 0 && !parts[0].includes(".")) ? parts[0] : `${owner}.github.io`;
      return `https://cdn.jsdelivr.net/gh/${owner}/${repo}@HEAD/`;
    } catch (e) {
      return null;
    }
  }

  /* ==================== PARTICLE SYSTEM ==================== */
  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.mode = "none";
      this.enabled = true;
      this.particles = [];
      this.running = false;
    }

    setMode(mode) {
      if (this.mode === mode) return;
      this.mode = mode || "none";
      this.particles = [];
      const count = mode === "snow_heavy" ? 95 : mode === "snow" ? 50 : mode === "leaves" ? 24 : 0;
      for (let i = 0; i < count; i++) {
        this.particles.push(this.spawn(true));
      }
      if (count > 0 && !this.running) {
        this.running = true;
        requestAnimationFrame(() => this.loop());
      }
    }

    setEnabled(val) {
      this.enabled = val;
      if (!val) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }

    spawn(randomY = false) {
      const w = this.canvas.width || 1280;
      const h = this.canvas.height || 720;
      if (this.mode === "leaves") {
        return {
          x: Math.random() * w,
          y: randomY ? Math.random() * h : -20,
          r: 4 + Math.random() * 5,
          vx: -0.6 - Math.random() * 0.8,
          vy: 0.7 + Math.random() * 0.8,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 0.04,
          alpha: 0.55 + Math.random() * 0.35
        };
      }
      const heavy = this.mode === "snow_heavy";
      return {
        x: Math.random() * w,
        y: randomY ? Math.random() * h : -10,
        r: (heavy ? 1.8 : 1.3) + Math.random() * (heavy ? 3.2 : 2.2),
        vx: (Math.random() - 0.45) * (heavy ? 1.2 : 0.6),
        vy: (heavy ? 1.3 : 0.75) + Math.random() * (heavy ? 1.6 : 0.95),
        phase: Math.random() * Math.PI * 2,
        alpha: 0.45 + Math.random() * 0.48
      };
    }

    loop() {
      if (this.mode === "none") {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.running = false;
        return;
      }
      const w = (this.canvas.width = this.canvas.clientWidth || 1280);
      const h = (this.canvas.height = this.canvas.clientHeight || 720);
      this.ctx.clearRect(0, 0, w, h);

      if (this.enabled) {
        for (let i = 0; i < this.particles.length; i++) {
          const p = this.particles[i];
          if (this.mode === "leaves") {
            p.x += p.vx + Math.sin(p.y * 0.02) * 0.4;
            p.y += p.vy;
            p.rot += p.vrot;
            if (p.y > h + 20 || p.x < -30) {
              this.particles[i] = this.spawn(false);
              this.particles[i].x = Math.random() * (w + 150);
              continue;
            }
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rot);
            this.ctx.fillStyle = `rgba(242, 196, 86, ${p.alpha})`;
            this.ctx.beginPath();
            this.ctx.moveTo(0, -p.r);
            this.ctx.quadraticCurveTo(p.r, -p.r * 0.3, p.r * 0.7, p.r * 0.8);
            this.ctx.quadraticCurveTo(0, p.r * 0.4, -p.r * 0.7, p.r * 0.8);
            this.ctx.quadraticCurveTo(-p.r, -p.r * 0.3, 0, -p.r);
            this.ctx.fill();
            this.ctx.restore();
          } else {
            p.phase += 0.02;
            p.x += p.vx + Math.sin(p.phase) * 0.35;
            p.y += p.vy;
            if (p.y > h + 10) {
              this.particles[i] = this.spawn(false);
              continue;
            }
            this.ctx.fillStyle = `rgba(235, 244, 255, ${p.alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            this.ctx.fill();
          }
        }
      }
      requestAnimationFrame(() => this.loop());
    }
  }

  /* ==================== MAIN VN ENGINE ==================== */
  class VNEngine {
    constructor() {
      this.global = this.loadGlobal();
      this.state = this.createEmptyState();
      this.scenes = {};
      this.typingTimer = null;
      this.autoTimer = null;
      this.skipTimer = null;
      this.isTyping = false;
      this.fullLine = "";
      this.currentStepMeta = null;
      this.autoMode = false;
      this.skipMode = false;
      this.uiHidden = false;
      this.inGame = false;
      this.waitingChoice = false;
      this.saveLoadAction = "save";
      this.cdnBase = detectGitHubCDNBase();
      this.cdnAutoFallback = false;
      this.assetCache = new Map();
      this.preloadQueue = [];
      this.queuedSet = new Set();
      this.inFlightLoads = 0;

      this.cacheDOM();
      this.particles = new ParticleSystem(this.el.particleCanvas);
      this.titleSnow = new ParticleSystem(this.el.titleSnowCanvas);
      this.titleSnow.setMode("snow");

      this.applyConfig();
      this.bindEvents();
      this.refreshTitleButtons();
    }

    cacheDOM() {
      const $ = id => document.getElementById(id);
      this.el = {
        stageFrame: $("stage-frame"),
        bgBack: $("bg-layer-back"),
        bgFront: $("bg-layer-front"),
        cgLayer: $("cg-layer"),
        spriteLeft: $("sprite-left"),
        spriteCenter: $("sprite-center"),
        spriteRight: $("sprite-right"),
        particleCanvas: $("particle-canvas"),
        titleSnowCanvas: $("title-snow-canvas"),
        fxOverlay: $("fx-overlay"),
        hudTop: $("hud-top"),
        hudDate: $("hud-date"),
        hudLocation: $("hud-location"),
        tagAuto: $("tag-auto"),
        tagSkip: $("tag-skip"),
        choiceOverlay: $("choice-overlay"),
        choiceList: $("choice-list"),
        dialogueContainer: $("dialogue-container"),
        dialogueBox: $("dialogue-box"),
        namePlate: $("name-plate"),
        speakerName: $("speaker-name"),
        dialogueText: $("dialogue-text"),
        nextIndicator: $("next-indicator"),
        btnAuto: $("btn-auto"),
        btnSkip: $("btn-skip"),
        titleScreen: $("title-screen"),
        btnNewGame: $("btn-new-game"),
        btnContinue: $("btn-continue"),
        btnTitleLoad: $("btn-title-load"),
        btnGallery: $("btn-gallery"),
        btnMusic: $("btn-music"),
        btnTitleConfig: $("btn-title-config"),
        titleProgressHint: $("title-progress-hint"),
        endingScreen: $("ending-screen"),
        endingBadge: $("ending-badge"),
        endingTitle: $("ending-title"),
        endingDesc: $("ending-desc"),
        endingStats: $("ending-stats"),
        btnEndingReturn: $("btn-ending-return"),
        modalSaveLoad: $("modal-saveload"),
        saveLoadTitle: $("saveload-title"),
        saveSlotsGrid: $("save-slots-grid"),
        modalBacklog: $("modal-backlog"),
        backlogList: $("backlog-list"),
        modalConfig: $("modal-config"),
        modalGallery: $("modal-gallery"),
        galleryGrid: $("gallery-grid"),
        cgLightbox: $("cg-lightbox"),
        cgLightboxImg: $("cg-lightbox-img"),
        cgLightboxCaption: $("cg-lightbox-caption"),
        modalMusic: $("modal-music"),
        musicList: $("music-list"),
        toast: $("toast")
      };
    }

    loadGlobal() {
      try {
        const raw = localStorage.getItem(GLOBAL_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          return {
            unlockedCGs: parsed.unlockedCGs || [],
            unlockedEndings: parsed.unlockedEndings || [],
            readSteps: parsed.readSteps || {},
            config: Object.assign({}, DEFAULT_CONFIG, parsed.config || {})
          };
        }
      } catch (e) {}
      return {
        unlockedCGs: [],
        unlockedEndings: [],
        readSteps: {},
        config: Object.assign({}, DEFAULT_CONFIG)
      };
    }

    saveGlobal() {
      try {
        localStorage.setItem(GLOBAL_KEY, JSON.stringify(this.global));
      } catch (e) {}
    }

    createEmptyState() {
      return {
        sceneId: "prologue_1",
        stepIdx: 0,
        bg: "bg_classroom",
        cg: null,
        bgm: null,
        weather: "leaves",
        date: "11月24日 · 周五",
        location: "樱见丘学园 · 2年B组",
        sprites: { left: null, center: null, right: null },
        affection: { kanade: 0, kaoru: 0, rinne: 0, hesitation: 0 },
        flags: {},
        backlog: [],
        lastLine: ""
      };
    }

    init(scenes) {
      this.scenes = scenes;
      const titleBgEl = document.querySelector(".title-bg");
      if (titleBgEl) {
        this.loadImageResilient(BG_FILES.bg_title, url => {
          titleBgEl.style.backgroundImage = `url('${url}')`;
        });
      }
      this.preloadOpening();
      window.AudioMgr.playBGM("bgm_title");
    }

    resolveAssetUrl(relPath, forceCdn = false) {
      if (!relPath) return "";
      if (this.assetCache.has(relPath)) return this.assetCache.get(relPath);
      const useCdn = forceCdn || (this.global && this.global.config && this.global.config.cdnAccel) || this.cdnAutoFallback;
      if (useCdn && this.cdnBase) return this.cdnBase + relPath;
      return relPath;
    }

    loadImageResilient(relPath, callback) {
      if (!relPath) return;
      if (this.assetCache.has(relPath)) {
        if (callback) callback(this.assetCache.get(relPath));
        return;
      }
      const primaryUrl = this.resolveAssetUrl(relPath, false);
      const cdnUrl = (this.cdnBase && primaryUrl !== this.cdnBase + relPath) ? (this.cdnBase + relPath) : null;
      let done = false;
      let timer = null;

      const finish = (finalUrl) => {
        if (done) return;
        done = true;
        if (timer) clearTimeout(timer);
        this.assetCache.set(relPath, finalUrl);
        if (callback) callback(finalUrl);
      };

      const tryFallbackOrRetry = () => {
        if (done) return;
        if (cdnUrl) {
          this.cdnAutoFallback = true;
          const img2 = new Image();
          img2.decoding = "async";
          img2.onload = () => finish(cdnUrl);
          img2.onerror = () => finish(relPath);
          img2.src = cdnUrl;
          return;
        }
        const imgRetry = new Image();
        imgRetry.decoding = "async";
        imgRetry.onload = () => finish(primaryUrl);
        imgRetry.onerror = () => finish(primaryUrl);
        imgRetry.src = primaryUrl + (primaryUrl.includes("?") ? "&" : "?") + "r=1";
      };

      const img = new Image();
      img.decoding = "async";
      img.onload = () => finish(primaryUrl);
      img.onerror = tryFallbackOrRetry;
      timer = setTimeout(tryFallbackOrRetry, 5000);
      img.src = primaryUrl;
    }

    enqueueAsset(relPath) {
      if (!relPath || this.assetCache.has(relPath) || this.queuedSet.has(relPath)) return;
      this.queuedSet.add(relPath);
      this.preloadQueue.push(relPath);
      this.pumpPreloadQueue();
    }

    pumpPreloadQueue() {
      while (this.inFlightLoads < 2 && this.preloadQueue.length > 0) {
        const relPath = this.preloadQueue.shift();
        this.queuedSet.delete(relPath);
        if (this.assetCache.has(relPath)) continue;
        this.inFlightLoads++;
        this.loadImageResilient(relPath, () => {
          this.inFlightLoads = Math.max(0, this.inFlightLoads - 1);
          this.pumpPreloadQueue();
        });
      }
    }

    preloadOpening() {
      [BG_FILES.bg_classroom, CHAR_FILES.yuma_normal, CHAR_FILES.shota_normal, CHAR_FILES.kaoru_normal]
        .forEach(p => this.enqueueAsset(p));
    }

    preloadUpcoming(sceneId, startIdx) {
      const scene = this.scenes[sceneId];
      if (!scene) return;
      const collectStep = (st) => {
        if (!st) return;
        if (st.bg && BG_FILES[st.bg]) this.enqueueAsset(BG_FILES[st.bg]);
        if (st.cg) {
          const m = CG_META.find(c => c.id === st.cg);
          if (m) this.enqueueAsset(m.file);
        }
        if (st.sprites) {
          Object.values(st.sprites).forEach(k => {
            if (k && CHAR_FILES[k]) this.enqueueAsset(CHAR_FILES[k]);
          });
        }
      };
      const endIdx = Math.min(scene.length, startIdx + 10);
      for (let i = startIdx; i < endIdx; i++) {
        const st = scene[i];
        collectStep(st);
        if (st.goto && this.scenes[st.goto]) collectStep(this.scenes[st.goto][0]);
        if (st.choice) {
          st.choice.forEach(opt => {
            if (opt.goto && this.scenes[opt.goto]) collectStep(this.scenes[opt.goto][0]);
          });
        }
      }
    }

    /* ==================== CONFIG ==================== */
    applyConfig() {
      const c = this.global.config;
      window.AudioMgr.setVolumes(c.bgmVol / 100, c.sfxVol / 100);
      this.particles.setEnabled(c.particles);
      this.titleSnow.setEnabled(c.particles);

      document.getElementById("cfg-text-speed").value = c.textSpeed;
      document.getElementById("val-text-speed").textContent = c.textSpeed;
      document.getElementById("cfg-auto-speed").value = c.autoSpeed;
      document.getElementById("val-auto-speed").textContent = c.autoSpeed;
      document.getElementById("cfg-bgm-vol").value = c.bgmVol;
      document.getElementById("val-bgm-vol").textContent = c.bgmVol + "%";
      document.getElementById("cfg-sfx-vol").value = c.sfxVol;
      document.getElementById("val-sfx-vol").textContent = c.sfxVol + "%";
      document.getElementById("cfg-particles").checked = c.particles;
      const cdnEl = document.getElementById("cfg-cdn");
      if (cdnEl) cdnEl.checked = !!c.cdnAccel;
      document.querySelectorAll('input[name="skip-mode"]').forEach(el => {
        el.checked = el.value === c.skipMode;
      });
    }

    /* ==================== UI & EVENTS ==================== */
    bindEvents() {
      document.addEventListener("pointerdown", () => window.AudioMgr.unlock());
      document.addEventListener("touchstart", () => window.AudioMgr.unlock(), { passive: true });

      this.el.btnNewGame.addEventListener("click", () => {
        window.AudioMgr.playSFX("click");
        this.startNewGame();
      });

      this.el.btnContinue.addEventListener("click", () => {
        window.AudioMgr.playSFX("click");
        const auto = this.readSlot(AUTO_KEY);
        if (auto) this.loadState(auto);
      });

      this.el.btnTitleLoad.addEventListener("click", () => {
        window.AudioMgr.playSFX("click");
        this.openSaveLoad("load");
      });

      this.el.btnGallery.addEventListener("click", () => {
        window.AudioMgr.playSFX("click");
        this.openGallery();
      });

      this.el.btnMusic.addEventListener("click", () => {
        window.AudioMgr.playSFX("click");
        this.openMusicRoom();
      });

      this.el.btnTitleConfig.addEventListener("click", () => {
        window.AudioMgr.playSFX("click");
        this.el.modalConfig.classList.remove("hidden");
      });

      this.el.btnEndingReturn.addEventListener("click", () => {
        window.AudioMgr.playSFX("click");
        this.returnToTitle();
      });

      // Advance dialogue on stage click
      this.el.dialogueBox.addEventListener("click", e => {
        if (e.target.closest("#quick-bar")) return;
        this.handleAdvance();
      });

      this.el.stageFrame.addEventListener("click", e => {
        if (!this.inGame) return;
        if (e.target.closest(".modal-backdrop") || e.target.closest("#choice-overlay") || e.target.closest("#quick-bar") || e.target.closest("#dialogue-box")) return;
        if (this.uiHidden) {
          this.toggleHideUI(false);
          return;
        }
        this.handleAdvance();
      });

      // Right click hides/restores UI
      this.el.stageFrame.addEventListener("contextmenu", e => {
        if (!this.inGame || this.isModalOpen() || this.waitingChoice) return;
        e.preventDefault();
        this.toggleHideUI();
      });

      // Mouse wheel up opens backlog
      this.el.stageFrame.addEventListener("wheel", e => {
        if (!this.inGame || this.isModalOpen()) return;
        if (e.deltaY < -20) {
          this.openBacklog();
        } else if (e.deltaY > 20 && !this.waitingChoice) {
          this.handleAdvance();
        }
      });

      // Quick bar buttons
      document.querySelectorAll("#quick-bar .qbtn").forEach(btn => {
        btn.addEventListener("click", e => {
          e.stopPropagation();
          window.AudioMgr.playSFX("hover");
          const act = btn.dataset.action;
          if (act === "qsave") this.quickSave();
          else if (act === "qload") this.quickLoad();
          else if (act === "save") this.openSaveLoad("save");
          else if (act === "load") this.openSaveLoad("load");
          else if (act === "log") this.openBacklog();
          else if (act === "auto") this.toggleAuto();
          else if (act === "skip") this.toggleSkip();
          else if (act === "hide") this.toggleHideUI(true);
          else if (act === "config") this.el.modalConfig.classList.remove("hidden");
          else if (act === "title") this.returnToTitle();
        });
      });

      // Modal closers
      document.querySelectorAll("[data-close]").forEach(btn => {
        btn.addEventListener("click", () => {
          window.AudioMgr.playSFX("hover");
          document.getElementById(btn.dataset.close).classList.add("hidden");
        });
      });

      this.el.cgLightbox.addEventListener("click", () => {
        this.el.cgLightbox.classList.add("hidden");
      });

      // Config sliders
      const bindSlider = (id, key, suffix = "") => {
        const el = document.getElementById(id);
        el.addEventListener("input", () => {
          this.global.config[key] = Number(el.value);
          document.getElementById(id.replace("cfg-", "val-")).textContent = el.value + suffix;
          this.applyConfig();
          this.saveGlobal();
        });
      };
      bindSlider("cfg-text-speed", "textSpeed");
      bindSlider("cfg-auto-speed", "autoSpeed");
      bindSlider("cfg-bgm-vol", "bgmVol", "%");
      bindSlider("cfg-sfx-vol", "sfxVol", "%");

      document.getElementById("cfg-particles").addEventListener("change", e => {
        this.global.config.particles = e.target.checked;
        this.applyConfig();
        this.saveGlobal();
      });

      const cdnEl = document.getElementById("cfg-cdn");
      if (cdnEl) {
        cdnEl.addEventListener("change", e => {
          this.global.config.cdnAccel = e.target.checked;
          this.assetCache.clear();
          this.saveGlobal();
          this.showToast(e.target.checked ? "已开启 GitHub CDN 加速" : "已切换回直连资源");
        });
      }

      document.querySelectorAll('input[name="skip-mode"]').forEach(r => {
        r.addEventListener("change", e => {
          if (e.target.checked) {
            this.global.config.skipMode = e.target.value;
            this.saveGlobal();
          }
        });
      });

      document.getElementById("btn-cfg-reset").addEventListener("click", () => {
        this.global.config = Object.assign({}, DEFAULT_CONFIG);
        this.applyConfig();
        this.saveGlobal();
        this.showToast("已恢复默认设置");
      });

      // Keyboard controls
      document.addEventListener("keydown", e => {
        if (!this.inGame) return;
        if (e.key === "Escape") {
          if (this.isModalOpen()) {
            document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.add("hidden"));
          } else if (this.uiHidden) {
            this.toggleHideUI(false);
          } else {
            this.el.modalConfig.classList.remove("hidden");
          }
          return;
        }
        if (this.isModalOpen()) return;
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          if (this.uiHidden) this.toggleHideUI(false);
          else if (!this.waitingChoice) this.handleAdvance();
        } else if (e.key === "h" || e.key === "H") {
          this.toggleHideUI();
        } else if (e.key === "a" || e.key === "A") {
          this.toggleAuto();
        } else if (e.key === "s" || e.key === "S") {
          this.toggleSkip();
        } else if (e.key === "l" || e.key === "L") {
          this.openBacklog();
        } else if (e.key === "F5") {
          e.preventDefault();
          this.quickSave();
        } else if (e.key === "F9") {
          e.preventDefault();
          this.quickLoad();
        } else if (e.key === "Control" && !this.skipMode && !this.waitingChoice) {
          this.toggleSkip(true);
        }
      });

      document.addEventListener("keyup", e => {
        if (e.key === "Control" && this.skipMode) {
          this.toggleSkip(false);
        }
      });
    }

    isModalOpen() {
      return Array.from(document.querySelectorAll(".modal-backdrop")).some(m => !m.classList.contains("hidden"));
    }

    refreshTitleButtons() {
      const hasAuto = !!this.readSlot(AUTO_KEY);
      this.el.btnContinue.disabled = !hasAuto;
      const ends = this.global.unlockedEndings.length;
      const cgs = this.global.unlockedCGs.length;
      this.el.titleProgressHint.textContent = (ends > 0 || cgs > 0)
        ? `结局达成 ${ends}/9 · CG收集 ${cgs}/${CG_META.length}`
        : "";
    }

    /* ==================== GAME FLOW ==================== */
    startNewGame() {
      this.state = this.createEmptyState();
      this.inGame = true;
      this.waitingChoice = false;
      this.stopAutoAndSkip();
      this.el.titleScreen.classList.add("hidden");
      this.el.endingScreen.classList.add("hidden");
      this.el.hudTop.classList.remove("hidden");
      this.el.dialogueContainer.classList.remove("hidden");
      this.renderVisualState(true);
      this.runStep();
    }

    returnToTitle() {
      this.inGame = false;
      this.waitingChoice = false;
      this.stopAutoAndSkip();
      this.clearTimers();
      this.el.hudTop.classList.add("hidden");
      this.el.dialogueContainer.classList.add("hidden");
      this.el.choiceOverlay.classList.add("hidden");
      this.el.endingScreen.classList.add("hidden");
      this.el.cgLayer.classList.add("hidden");
      this.el.cgLayer.classList.remove("active");
      this.particles.setMode("none");
      this.el.titleScreen.classList.remove("hidden");
      window.AudioMgr.playBGM("bgm_title");
      this.refreshTitleButtons();
    }

    clearTimers() {
      if (this.typingTimer) { clearInterval(this.typingTimer); this.typingTimer = null; }
      if (this.autoTimer) { clearTimeout(this.autoTimer); this.autoTimer = null; }
      if (this.skipTimer) { clearTimeout(this.skipTimer); this.skipTimer = null; }
    }

    stopAutoAndSkip() {
      this.autoMode = false;
      this.skipMode = false;
      this.el.btnAuto.classList.remove("active");
      this.el.btnSkip.classList.remove("active");
      this.el.tagAuto.classList.add("hidden");
      this.el.tagSkip.classList.add("hidden");
    }

    runStep() {
      this.clearTimers();
      const scene = this.scenes[this.state.sceneId];
      if (!scene || this.state.stepIdx >= scene.length) {
        return;
      }

      const step = scene[this.state.stepIdx];

      // Handle pure control jumps/branches first
      if (step.branch) {
        const target = step.branch(this.state);
        if (target) {
          this.state.sceneId = target;
          this.state.stepIdx = 0;
          this.autoSave();
          this.runStep();
          return;
        }
        this.state.stepIdx++;
        this.runStep();
        return;
      }

      if (step.goto && !step.t && !step.choice) {
        this.state.sceneId = step.goto;
        this.state.stepIdx = 0;
        this.autoSave();
        this.runStep();
        return;
      }

      if (step.ending) {
        this.showEnding(step.ending);
        return;
      }

      // Apply state updates
      if (step.bg) {
        this.setBackground(step.bg);
        this.state.bg = step.bg;
      }
      if (step.cg !== undefined) {
        this.setCG(step.cg);
        this.state.cg = step.cg;
      }
      if (step.bgm !== undefined) {
        this.state.bgm = step.bgm;
        window.AudioMgr.playBGM(step.bgm);
      }
      if (step.sfx) {
        window.AudioMgr.playSFX(step.sfx);
      }
      if (step.weather) {
        this.state.weather = step.weather;
        this.particles.setMode(step.weather);
      }
      if (step.date) {
        this.state.date = step.date;
        this.el.hudDate.textContent = step.date;
      }
      if (step.location) {
        this.state.location = step.location;
        this.el.hudLocation.textContent = step.location;
      }
      if (step.clearSprites) {
        this.state.sprites = { left: null, center: null, right: null };
      }
      if (step.sprites) {
        for (const slot of ["left", "center", "right"]) {
          if (slot in step.sprites) {
            this.state.sprites[slot] = step.sprites[slot];
          } else if (!step.keepSprites) {
            this.state.sprites[slot] = null;
          }
        }
      }
      this.renderSprites(step.active || null);

      if (step.fx) {
        this.playFX(step.fx);
      }

      if (step.flagSet) {
        Object.assign(this.state.flags, step.flagSet);
      }

      // Choice step
      if (step.choice) {
        this.stopAutoAndSkip();
        this.showChoices(step.choice);
        return;
      }

      // Dialogue / Narration step
      const stepKey = `${this.state.sceneId}:${this.state.stepIdx}`;
      const isRead = !!this.global.readSteps[stepKey];
      this.global.readSteps[stepKey] = 1;
      this.saveGlobal();

      const speaker = step.s || "";
      const cls = step.cls || "";
      const text = step.t || "";

      if (speaker) {
        this.el.namePlate.classList.remove("hidden");
        this.el.speakerName.textContent = speaker;
        this.el.speakerName.className = cls ? `char-${cls}` : "";
      } else {
        this.el.namePlate.classList.add("hidden");
      }

      this.state.lastLine = (speaker ? `${speaker}：` : "") + text;
      this.state.backlog.push({ speaker, text });
      if (this.state.backlog.length > 150) this.state.backlog.shift();

      this.autoSave();
      this.preloadUpcoming(this.state.sceneId, this.state.stepIdx + 1);
      this.revealText(text, isRead);
    }

    revealText(text, isRead) {
      this.fullLine = text;
      this.el.nextIndicator.classList.add("hidden");

      const canSkipNow = this.skipMode && (this.global.config.skipMode === "all" || isRead);
      if (canSkipNow) {
        this.isTyping = false;
        this.el.dialogueText.textContent = text;
        this.el.nextIndicator.classList.remove("hidden");
        this.skipTimer = setTimeout(() => this.advanceStep(), 75);
        return;
      }

      if (this.skipMode && !canSkipNow) {
        // Reached unread text in "skip read only" mode
        this.toggleSkip(false);
        this.showToast("已到达未读文本");
      }

      const speed = this.global.config.textSpeed;
      if (speed >= 98) {
        this.isTyping = false;
        this.el.dialogueText.textContent = text;
        this.onLineComplete();
        return;
      }

      const intervalMs = Math.max(10, Math.round(58 - speed * 0.48));
      let idx = 0;
      this.isTyping = true;
      this.el.dialogueText.textContent = "";

      this.typingTimer = setInterval(() => {
        idx++;
        this.el.dialogueText.textContent = text.slice(0, idx);
        if (idx >= text.length) {
          clearInterval(this.typingTimer);
          this.typingTimer = null;
          this.isTyping = false;
          this.onLineComplete();
        }
      }, intervalMs);
    }

    onLineComplete() {
      this.el.nextIndicator.classList.remove("hidden");
      if (this.autoMode && !this.waitingChoice) {
        const baseDelay = Math.max(700, 3200 - this.global.config.autoSpeed * 22);
        const charDelay = Math.min(2200, this.fullLine.length * 32);
        this.autoTimer = setTimeout(() => this.advanceStep(), baseDelay + charDelay * 0.45);
      }
    }

    handleAdvance() {
      if (this.waitingChoice || this.isModalOpen()) return;
      if (this.isTyping) {
        if (this.typingTimer) { clearInterval(this.typingTimer); this.typingTimer = null; }
        this.isTyping = false;
        this.el.dialogueText.textContent = this.fullLine;
        this.onLineComplete();
        return;
      }
      this.advanceStep();
    }

    advanceStep() {
      if (this.waitingChoice) return;
      const scene = this.scenes[this.state.sceneId];
      const cur = scene && scene[this.state.stepIdx];
      if (cur && cur.goto) {
        this.state.sceneId = cur.goto;
        this.state.stepIdx = 0;
      } else {
        this.state.stepIdx++;
      }
      this.runStep();
    }

    /* ==================== CHOICES ==================== */
    showChoices(options) {
      this.waitingChoice = true;
      this.el.choiceList.innerHTML = "";
      options.forEach(opt => {
        if (opt.condition && !opt.condition(this.state)) return;
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.textContent = opt.text;
        btn.addEventListener("click", () => {
          window.AudioMgr.playSFX("click");
          if (opt.effects) {
            for (const [k, delta] of Object.entries(opt.effects)) {
              this.state.affection[k] = (this.state.affection[k] || 0) + delta;
            }
          }
          if (opt.flag) {
            this.state.flags[opt.flag] = true;
          }
          if (opt.flagSet) {
            Object.assign(this.state.flags, opt.flagSet);
          }
          this.state.backlog.push({ speaker: "【选择】", text: opt.text });
          this.el.choiceOverlay.classList.add("hidden");
          this.waitingChoice = false;
          if (opt.goto) {
            this.state.sceneId = opt.goto;
            this.state.stepIdx = 0;
          } else {
            this.state.stepIdx++;
          }
          this.autoSave();
          this.runStep();
        });
        this.el.choiceList.appendChild(btn);
      });
      this.el.choiceOverlay.classList.remove("hidden");
    }

    /* ==================== VISUALS ==================== */
    renderVisualState(instant = false) {
      this.setBackground(this.state.bg, instant);
      this.setCG(this.state.cg);
      this.renderSprites(null);
      this.particles.setMode(this.state.weather);
      this.el.hudDate.textContent = this.state.date;
      this.el.hudLocation.textContent = this.state.location;
      if (this.state.bgm) window.AudioMgr.playBGM(this.state.bgm);
    }

    setBackground(bgKey, instant = false) {
      const rel = BG_FILES[bgKey];
      if (!rel) return;
      const applyBg = (resolvedUrl) => {
        if (this.state.bg !== bgKey && !instant) return;
        if (instant) {
          this.el.bgBack.style.backgroundImage = `url('${resolvedUrl}')`;
          this.el.bgFront.style.opacity = "0";
          return;
        }
        this.el.bgFront.style.backgroundImage = `url('${resolvedUrl}')`;
        this.el.bgFront.style.opacity = "1";
        setTimeout(() => {
          this.el.bgBack.style.backgroundImage = `url('${resolvedUrl}')`;
          this.el.bgFront.style.transition = "none";
          this.el.bgFront.style.opacity = "0";
          void this.el.bgFront.offsetWidth;
          this.el.bgFront.style.transition = "";
        }, 760);
      };
      if (this.assetCache.has(rel)) {
        applyBg(this.assetCache.get(rel));
      } else {
        this.loadImageResilient(rel, applyBg);
      }
    }

    setCG(cgKey) {
      if (!cgKey) {
        this.el.cgLayer.classList.remove("active");
        setTimeout(() => {
          if (!this.state.cg) this.el.cgLayer.classList.add("hidden");
        }, 700);
        return;
      }
      const meta = CG_META.find(c => c.id === cgKey);
      if (!meta) return;
      if (!this.global.unlockedCGs.includes(cgKey)) {
        this.global.unlockedCGs.push(cgKey);
        this.saveGlobal();
      }
      const applyCG = (resolvedUrl) => {
        if (this.state.cg !== cgKey) return;
        this.el.cgLayer.style.backgroundImage = `url('${resolvedUrl}')`;
        this.el.cgLayer.classList.remove("hidden");
        requestAnimationFrame(() => this.el.cgLayer.classList.add("active"));
      };
      if (this.assetCache.has(meta.file)) {
        applyCG(this.assetCache.get(meta.file));
      } else {
        this.loadImageResilient(meta.file, applyCG);
      }
    }

    renderSprites(activeSlot) {
      const map = {
        left: this.el.spriteLeft,
        center: this.el.spriteCenter,
        right: this.el.spriteRight
      };
      const visibleCount = ["left", "center", "right"].filter(s => !!this.state.sprites[s]).length;

      for (const slot of ["left", "center", "right"]) {
        const container = map[slot];
        const key = this.state.sprites[slot];
        if (!key || !CHAR_FILES[key]) {
          container.classList.remove("visible", "speaking", "dimmed");
          container.innerHTML = "";
          container.dataset.key = "";
          continue;
        }
        if (container.dataset.key !== key) {
          container.dataset.key = key;
          const rel = CHAR_FILES[key];
          const src = this.resolveAssetUrl(rel);
          const img = document.createElement("img");
          img.alt = key;
          img.decoding = "async";
          img.onerror = () => {
            if (img.dataset.retried) return;
            img.dataset.retried = "1";
            this.loadImageResilient(rel, (fallbackUrl) => {
              if (container.dataset.key === key) img.src = fallbackUrl;
            });
          };
          img.src = src;
          container.innerHTML = "";
          container.appendChild(img);
        }
        container.classList.add("visible");
        container.classList.remove("speaking", "dimmed");
        if (activeSlot && visibleCount > 1) {
          if (activeSlot === slot) container.classList.add("speaking");
          else container.classList.add("dimmed");
        }
      }
    }

    playFX(fx) {
      if (fx === "shake") {
        this.el.stageFrame.classList.remove("shake");
        void this.el.stageFrame.offsetWidth;
        this.el.stageFrame.classList.add("shake");
      } else if (fx === "flash") {
        this.el.fxOverlay.className = "white-flash";
        setTimeout(() => { this.el.fxOverlay.className = ""; }, 180);
      } else if (fx === "fade_black") {
        this.el.fxOverlay.className = "black";
      } else if (fx === "clear_black") {
        this.el.fxOverlay.className = "";
      }
    }

    /* ==================== MODES ==================== */
    toggleAuto(force) {
      this.autoMode = force !== undefined ? force : !this.autoMode;
      if (this.autoMode && this.skipMode) this.toggleSkip(false);
      this.el.btnAuto.classList.toggle("active", this.autoMode);
      this.el.tagAuto.classList.toggle("hidden", !this.autoMode);
      if (this.autoMode && !this.isTyping && !this.waitingChoice) {
        this.onLineComplete();
      } else if (!this.autoMode && this.autoTimer) {
        clearTimeout(this.autoTimer);
        this.autoTimer = null;
      }
    }

    toggleSkip(force) {
      this.skipMode = force !== undefined ? force : !this.skipMode;
      if (this.skipMode && this.autoMode) this.toggleAuto(false);
      this.el.btnSkip.classList.toggle("active", this.skipMode);
      this.el.tagSkip.classList.toggle("hidden", !this.skipMode);
      if (this.skipMode && !this.waitingChoice) {
        this.runStep();
      } else if (!this.skipMode && this.skipTimer) {
        clearTimeout(this.skipTimer);
        this.skipTimer = null;
      }
    }

    toggleHideUI(force) {
      this.uiHidden = force !== undefined ? force : !this.uiHidden;
      this.el.dialogueContainer.classList.toggle("ui-hidden", this.uiHidden);
      this.el.hudTop.classList.toggle("hidden", this.uiHidden);
    }

    /* ==================== SAVE / LOAD ==================== */
    buildSnapshot() {
      return {
        savedAt: new Date().toLocaleString("zh-CN", { hour12: false }),
        sceneId: this.state.sceneId,
        stepIdx: this.state.stepIdx,
        bg: this.state.bg,
        cg: this.state.cg,
        bgm: this.state.bgm,
        weather: this.state.weather,
        date: this.state.date,
        location: this.state.location,
        sprites: Object.assign({}, this.state.sprites),
        affection: Object.assign({}, this.state.affection),
        flags: Object.assign({}, this.state.flags),
        backlog: this.state.backlog.slice(-40),
        lastLine: this.state.lastLine
      };
    }

    readAllSlots() {
      try {
        return JSON.parse(localStorage.getItem(SAVES_KEY) || "{}");
      } catch (e) {
        return {};
      }
    }

    readSlot(key) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    }

    autoSave() {
      try {
        localStorage.setItem(AUTO_KEY, JSON.stringify(this.buildSnapshot()));
      } catch (e) {}
    }

    quickSave() {
      if (!this.inGame) return;
      try {
        localStorage.setItem(QUICK_KEY, JSON.stringify(this.buildSnapshot()));
        window.AudioMgr.playSFX("save");
        this.showToast("快速存档成功");
      } catch (e) {}
    }

    quickLoad() {
      const data = this.readSlot(QUICK_KEY);
      if (!data) {
        this.showToast("暂无快速存档");
        return;
      }
      window.AudioMgr.playSFX("click");
      this.loadState(data);
      this.showToast("已读取快速存档");
    }

    openSaveLoad(mode) {
      this.saveLoadAction = mode;
      this.el.saveLoadTitle.textContent = mode === "save" ? "保存进度 · SAVE" : "读取进度 · LOAD";
      const slots = this.readAllSlots();
      this.el.saveSlotsGrid.innerHTML = "";

      for (let i = 1; i <= 12; i++) {
        const data = slots[i];
        const card = document.createElement("div");
        card.className = "save-slot" + (data ? "" : " empty");

        if (data) {
          card.innerHTML = `
            <div class="slot-top"><span>SLOT ${String(i).padStart(2, "0")}</span><span>${data.savedAt}</span></div>
            <div class="slot-meta">${data.date} · ${data.location}</div>
            <div class="slot-snippet">${this.escapeHtml(data.lastLine || "")}</div>
          `;
        } else {
          card.innerHTML = `<div class="slot-top"><span>SLOT ${String(i).padStart(2, "0")}</span></div><div class="slot-snippet">—— 空存档位 ——</div>`;
        }

        card.addEventListener("click", () => {
          if (mode === "save") {
            slots[i] = this.buildSnapshot();
            localStorage.setItem(SAVES_KEY, JSON.stringify(slots));
            window.AudioMgr.playSFX("save");
            this.showToast(`已保存至 SLOT ${String(i).padStart(2, "0")}`);
            this.openSaveLoad("save");
          } else if (data) {
            window.AudioMgr.playSFX("click");
            this.el.modalSaveLoad.classList.add("hidden");
            this.loadState(data);
          }
        });
        this.el.saveSlotsGrid.appendChild(card);
      }

      this.el.modalSaveLoad.classList.remove("hidden");
    }

    loadState(data) {
      this.stopAutoAndSkip();
      this.clearTimers();
      this.state = {
        sceneId: data.sceneId,
        stepIdx: data.stepIdx,
        bg: data.bg,
        cg: data.cg,
        bgm: data.bgm,
        weather: data.weather,
        date: data.date,
        location: data.location,
        sprites: Object.assign({ left: null, center: null, right: null }, data.sprites),
        affection: Object.assign({ kanade: 0, kaoru: 0, rinne: 0, hesitation: 0 }, data.affection),
        flags: Object.assign({}, data.flags),
        backlog: data.backlog ? data.backlog.slice() : [],
        lastLine: data.lastLine || ""
      };
      this.inGame = true;
      this.waitingChoice = false;
      this.el.titleScreen.classList.add("hidden");
      this.el.endingScreen.classList.add("hidden");
      this.el.choiceOverlay.classList.add("hidden");
      this.el.hudTop.classList.remove("hidden");
      this.el.dialogueContainer.classList.remove("hidden");
      this.renderVisualState(true);
      this.runStep();
    }

    /* ==================== BACKLOG, GALLERY, MUSIC, ENDING ==================== */
    openBacklog() {
      this.el.backlogList.innerHTML = "";
      this.state.backlog.forEach(item => {
        const div = document.createElement("div");
        div.className = "backlog-item";
        div.innerHTML = `
          ${item.speaker ? `<div class="backlog-speaker">${this.escapeHtml(item.speaker)}</div>` : ""}
          <div class="backlog-line">${this.escapeHtml(item.text)}</div>
        `;
        this.el.backlogList.appendChild(div);
      });
      this.el.modalBacklog.classList.remove("hidden");
      this.el.backlogList.scrollTop = this.el.backlogList.scrollHeight;
    }

    openGallery() {
      this.el.galleryGrid.innerHTML = "";
      CG_META.forEach(cg => {
        const unlocked = this.global.unlockedCGs.includes(cg.id);
        const card = document.createElement("div");
        card.className = "gallery-card" + (unlocked ? "" : " locked");
        if (unlocked) {
          const url = this.resolveAssetUrl(cg.file);
          card.innerHTML = `<img src="${url}" alt="${cg.title}" /><div class="gallery-label">${cg.title}</div>`;
          card.addEventListener("click", () => {
            this.el.cgLightboxImg.src = this.resolveAssetUrl(cg.file);
            this.el.cgLightboxCaption.textContent = cg.title;
            this.el.cgLightbox.classList.remove("hidden");
          });
        } else {
          card.innerHTML = `<span>未解锁 · ???</span>`;
        }
        this.el.galleryGrid.appendChild(card);
      });
      this.el.modalGallery.classList.remove("hidden");
    }

    openMusicRoom() {
      const tracks = window.AudioMgr.getTracks();
      const renderList = () => {
        this.el.musicList.innerHTML = "";
        tracks.forEach(tr => {
          const row = document.createElement("div");
          const playing = window.AudioMgr.currentId === tr.id;
          row.className = "music-row" + (playing ? " playing" : "");
          row.innerHTML = `
            <div>
              <div class="music-title">${tr.title}</div>
              <div class="music-sub">${tr.subtitle}</div>
            </div>
            <div>${playing ? "♪ 播放中" : "▶ 试听"}</div>
          `;
          row.addEventListener("click", () => {
            window.AudioMgr.playBGM(tr.id);
            renderList();
          });
          this.el.musicList.appendChild(row);
        });
      };
      renderList();
      this.el.modalMusic.classList.remove("hidden");
    }

    showEnding(ending) {
      this.stopAutoAndSkip();
      this.inGame = false;
      if (!this.global.unlockedEndings.includes(ending.id)) {
        this.global.unlockedEndings.push(ending.id);
        this.saveGlobal();
      }
      this.el.endingBadge.textContent = ending.badge || "ENDING";
      this.el.endingTitle.textContent = ending.title;
      this.el.endingDesc.textContent = ending.desc;
      this.el.endingStats.textContent = `已解锁结局：${this.global.unlockedEndings.length} / 9 ｜ 已收集CG：${this.global.unlockedCGs.length} / ${CG_META.length}`;
      this.el.endingScreen.classList.remove("hidden");
    }

    showToast(msg) {
      this.el.toast.textContent = msg;
      this.el.toast.classList.remove("hidden");
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => this.el.toast.classList.add("hidden"), 1900);
    }

    escapeHtml(str) {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }
  }

  window.VN = new VNEngine();
  window.addEventListener("DOMContentLoaded", () => {
    const merged = Object.assign({}, window.STORY_COMMON || {}, window.STORY_ROUTES || {});
    window.VN.init(merged);
  });
})();
