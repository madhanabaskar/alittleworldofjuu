// Ambient Audio & Voice Note Web Audio engine

class AudioEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isAmbientPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft celestial ambient chords: pentatonic soothing harmony (F# minor / A major celestial)
  toggleAmbient(enable?: boolean): boolean {
    this.initContext();
    if (!this.ctx) return false;

    const shouldPlay = enable !== undefined ? enable : !this.isAmbientPlaying;

    if (shouldPlay && !this.isAmbientPlaying) {
      this.startAmbientChords();
      this.isAmbientPlaying = true;
    } else if (!shouldPlay && this.isAmbientPlaying) {
      this.stopAmbientChords();
      this.isAmbientPlaying = false;
    }

    return this.isAmbientPlaying;
  }

  isAmbientActive(): boolean {
    return this.isAmbientPlaying;
  }

  private startAmbientChords() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Master ambient gain
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.001, now);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.06, now + 3); // Soft, non-intrusive volume

    // Low-pass filter for warm, dreamy celestial sound
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);

    this.ambientGain.connect(filter);
    filter.connect(this.ctx.destination);

    // Warm chord notes in Hz: A2 (110), E3 (164.81), C#4 (277.18), E4 (329.63), A4 (440)
    const frequencies = [110, 164.81, 277.18, 329.63];

    this.oscillators = frequencies.map((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Gentle detuning for shimmer
      osc.detune.setValueAtTime((i - 1.5) * 4, now);

      oscGain.gain.setValueAtTime(0.2, now);
      osc.connect(oscGain);
      oscGain.connect(this.ambientGain!);

      osc.start();
      return osc;
    });
  }

  private stopAmbientChords() {
    if (!this.ctx || !this.ambientGain) return;
    const now = this.ctx.currentTime;
    try {
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch {}
        });
        this.oscillators = [];
      }, 1500);
    } catch {
      this.oscillators = [];
    }
  }

  // Play a gentle notification chime (e.g. letter open, promise unlocked)
  playChime(type: 'warm' | 'celestial' | 'celebrate' = 'warm') {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    gain.connect(this.ctx.destination);

    const notes = type === 'celestial' ? [523.25, 659.25, 783.99, 1046.50] : [440, 554.37, 659.25];
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      osc.connect(gain);
      osc.start(now + idx * 0.08);
      osc.stop(now + 1.2);
    });
  }
}

export const audioEngine = new AudioEngine();
