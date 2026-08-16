// ============================================================
//  Devotional Ambient Audio Synthesizer (Web Audio API)
//  Plays soothing Tanpura drone + Temple Bell + Flute melody
//  when local MP3 files are not yet added.
// ============================================================

class DevotionalSynthesizer {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.activeNodes = [];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Raag Bhupali / Bilawal scale frequencies (Sa Re Ga Pa Dha) - Sacred Morning Sunrise Mood
  getNotes() {
    const root = 220; // A3 base (warm)
    return [
      root * 1,        // Sa  (220 Hz)
      root * 1.125,    // Re  (247.5 Hz)
      root * 1.25,     // Ga  (275 Hz)
      root * 1.5,      // Pa  (330 Hz)
      root * 1.6875,   // Dha (371.25 Hz)
      root * 2,        // Sa' (440 Hz)
      root * 2.25,     // Re' (495 Hz)
      root * 2.5,      // Ga' (550 Hz)
    ];
  }

  startDrone() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const baseFreq = 110; // Low Sa drone

    // 3 harmonic drone layers for rich Tanpura effect
    const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 2];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Gentle pulsating drone volume
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), now + 2);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);

      this.activeNodes.push({ osc, gain });
    });
  }

  playBell(freq = 880) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Temple bell chime envelope (fast attack, long gentle decay)
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 3);
  }

  playFluteNote(freq, duration = 2.2) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    // Flute breath vibrato
    vibrato.frequency.setValueAtTime(4.8, now); // 4.8 Hz vibrato
    vibratoGain.gain.setValueAtTime(2.5, now);
    vibrato.connect(osc.frequency);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Smooth breath envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.25);
    gain.gain.setValueAtTime(0.14, now + duration - 0.4);
    gain.gain.linearRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    vibrato.start(now);
    osc.start(now);

    vibrato.stop(now + duration + 0.1);
    osc.stop(now + duration + 0.1);
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    this.startDrone();

    const notes = this.getNotes();
    let step = 0;

    // Play traditional devotional melodic phrases
    const melodyPattern = [0, 2, 3, 4, 3, 2, 0, 3, 4, 5, 4, 3, 2, 0, 3, 0];

    const playNextNote = () => {
      if (!this.isPlaying) return;
      const noteIdx = melodyPattern[step % melodyPattern.length];
      const freq = notes[noteIdx];

      this.playFluteNote(freq, 2.0);

      // Periodic temple bell chime every 4 notes
      if (step % 4 === 0) {
        this.playBell(notes[5] * 2);
      }

      step++;
    };

    playNextNote();
    this.intervalId = setInterval(playNextNote, 1600);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.ctx) {
      const now = this.ctx.currentTime;
      this.activeNodes.forEach(({ osc, gain }) => {
        try {
          gain.gain.linearRampToValueAtTime(0.0001, now + 0.4);
          setTimeout(() => {
            try { osc.stop(); osc.disconnect(); } catch (_) {}
          }, 450);
        } catch (_) {}
      });
      this.activeNodes = [];
    }
  }
}

export const devotionalSynth = new DevotionalSynthesizer();
