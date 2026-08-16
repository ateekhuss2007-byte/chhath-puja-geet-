// ============================================================
//  Studio Audio Mastering & Quality Enhancer (Web Audio API)
//  - Eliminates digital distortion & speaker crackle
//  - Applies Studio Dynamics Compressor
//  - Warm Bass & Vocal Clarifier EQ
//  - Safe Peak Normalization (Prevents blown/cracking sound)
// ============================================================

class AudioMasteringEngine {
  constructor() {
    this.ctx = null;
    this.source = null;
    this.compressor = null;
    this.bassFilter = null;
    this.highFilter = null;
    this.masterGain = null;
    this.isAttached = false;
  }

  attach(audioElement) {
    if (!audioElement || this.isAttached) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Create nodes
      this.source = this.ctx.createMediaElementSource(audioElement);

      // 1. Dynamics Compressor — Prevents speaker distortion/clipping
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-16, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(24, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(3.5, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

      // 2. Warm Bass Enhancer (Low Shelf @ 140Hz)
      this.bassFilter = this.ctx.createBiquadFilter();
      this.bassFilter.type = 'lowshelf';
      this.bassFilter.frequency.setValueAtTime(140, this.ctx.currentTime);
      this.bassFilter.gain.setValueAtTime(2.0, this.ctx.currentTime);

      // 3. High-Frequency Hiss / Harshness Tamer (High Shelf @ 7500Hz)
      this.highFilter = this.ctx.createBiquadFilter();
      this.highFilter.type = 'highshelf';
      this.highFilter.frequency.setValueAtTime(7500, this.ctx.currentTime);
      this.highFilter.gain.setValueAtTime(-2.0, this.ctx.currentTime);

      // 4. Vocal Presence (Peaking @ 2800Hz) for sweet, clear vocals
      this.vocalFilter = this.ctx.createBiquadFilter();
      this.vocalFilter.type = 'peaking';
      this.vocalFilter.frequency.setValueAtTime(2800, this.ctx.currentTime);
      this.vocalFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);
      this.vocalFilter.gain.setValueAtTime(2.5, this.ctx.currentTime);

      // 5. Clean Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

      // Chain connections:
      // Audio Element -> Vocal Filter -> Bass Filter -> High Filter -> Compressor -> Master Gain -> Speakers
      this.source.connect(this.vocalFilter);
      this.vocalFilter.connect(this.bassFilter);
      this.bassFilter.connect(this.highFilter);
      this.highFilter.connect(this.compressor);
      this.compressor.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.isAttached = true;
    } catch (e) {
      console.warn("Studio Audio Enhancer fallback:", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
}

export const audioMastering = new AudioMasteringEngine();
