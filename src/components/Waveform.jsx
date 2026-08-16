// Animated audio waveform — 20 bars with staggered animation
export function Waveform({ isPlaying }) {
  const BAR_COUNT = 20;

  return (
    <div className={`waveform ${isPlaying ? 'waveform--playing' : ''}`} aria-hidden="true">
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <span
          key={i}
          className="waveform-bar"
          style={{ '--i': i }}
        />
      ))}
    </div>
  );
}
