export function KeyboardHints({ onOpenPlaylist }) {
  const hints = [
    { key: 'SPACE', label: 'PLAY / PAUSE' },
    { key: '← →',   label: 'SEEK' },
    { key: 'N',      label: 'NEXT' },
    { key: 'P',      label: 'PREV' },
    { key: 'S',      label: 'SHUFFLE' },
    { key: 'R',      label: 'REPEAT' },
    { key: 'Q',      label: 'ALL 57 SONGS' },
  ];

  return (
    <div className="kb-hints" aria-label="Keyboard shortcuts">
      {hints.map(({ key, label }) => (
        <span
          key={key}
          className="kb-hint"
          onClick={key === 'Q' ? onOpenPlaylist : undefined}
          style={key === 'Q' ? { cursor: 'pointer' } : undefined}
        >
          <kbd>{key}</kbd>
          <span>{label}</span>
        </span>
      ))}
    </div>
  );
}
