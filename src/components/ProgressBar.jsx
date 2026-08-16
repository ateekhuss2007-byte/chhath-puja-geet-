import { useRef, useCallback } from 'react';

export function ProgressBar({ progressPct, currentTime, duration, formatTime, seekTo, setIsSeeking }) {
  const trackRef = useRef(null);

  const getRatio = useCallback((clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  }, []);

  const onPointerDown = useCallback((e) => {
    setIsSeeking(true);
    trackRef.current.setPointerCapture(e.pointerId);
    seekTo(getRatio(e.clientX));
  }, [seekTo, getRatio, setIsSeeking]);

  const onPointerMove = useCallback((e) => {
    if (e.buttons !== 1) return;
    seekTo(getRatio(e.clientX));
  }, [seekTo, getRatio]);

  const onPointerUp = useCallback(() => {
    setIsSeeking(false);
  }, [setIsSeeking]);

  const onKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') seekTo(Math.min(1, (progressPct + 5) / 100));
    if (e.key === 'ArrowLeft')  seekTo(Math.max(0, (progressPct - 5) / 100));
  }, [seekTo, progressPct]);

  return (
    <div className="progress-wrap">
      <span className="time-label">{formatTime(currentTime)}</span>

      <div
        ref={trackRef}
        className="progress-track"
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progressPct)}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        {/* Track rail */}
        <div className="progress-rail" />
        {/* Filled portion */}
        <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        {/* Thumb */}
        <div className="progress-thumb" style={{ left: `${progressPct}%` }}>
          <svg viewBox="0 0 24 24" width="10" height="10" aria-hidden="true">
            <path d="M12 2c1 3-2 4-2 7a3 3 0 1 0 6 0c0-1-.5-2-1-2.5 1.5.5 3 2.5 3 5.5a6 6 0 1 1-12 0c0-4 3-6 4-8 .5-1 .5-1.5 2-2z"/>
          </svg>
        </div>
      </div>

      <span className="time-label time-label--right">{formatTime(duration)}</span>
    </div>
  );
}
