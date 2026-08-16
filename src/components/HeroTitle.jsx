export function HeroTitle() {
  return (
    <div className="hero-title-block">
      {/* Track count strip */}
      <p className="hero-strip">
        <span className="hero-strip-dot" aria-hidden="true" />
        227 TRACKS &nbsp;·&nbsp; NON-STOP
      </p>

      {/* Main Hindi title */}
      <h1 className="hero-title" lang="hi">
        <span className="hero-title-saffron">छठ</span>
        {' '}
        <span className="hero-title-white">पूजा</span>
        {' '}
        <span className="hero-title-green">गीत</span>
      </h1>

      {/* English sub */}
      <p className="hero-sub-en">CHHATH PUJA MUSIC</p>

      {/* Atmosphere pill */}
      <div className="hero-pill-row">
        <span className="ghat-pill">
          🪔 SUNRISE AT THE GHAT
        </span>
      </div>

      {/* Devotional sub-line */}
      <p className="hero-devotion-line" lang="hi">
        बिहार की मिट्टी&nbsp;•&nbsp;छठी मईया की भक्ति
      </p>
    </div>
  );
}
