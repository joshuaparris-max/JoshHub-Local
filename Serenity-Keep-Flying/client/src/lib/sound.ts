let ctx: AudioContext | null = null;

function ensureCtx() {
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch {
      ctx = null;
    }
  }
  return ctx;
}

export function playBeep() {
  const audio = ensureCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = "square";
  osc.frequency.value = 680;
  gain.gain.value = 0.02;
  osc.connect(gain);
  gain.connect(audio.destination);
  const now = audio.currentTime;
  osc.start(now);
  osc.stop(now + 0.05);
}
