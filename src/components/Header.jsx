export function Header({ totalSongs }) {
  return (
    <header className="site-header">
      {/* Brand — top left */}
      <div className="brand">
        <div className="brand-icon-row">
          <span className="brand-sun" aria-hidden="true">☀️</span>
          <span className="brand-hi">छठ पूजा</span>
        </div>
        <span className="brand-sub">आस्था • श्रद्धा • सूर्य उपासना</span>
      </div>

      {/* Center tagline */}
      <div className="header-center">
        <span className="header-tagline">जय छठी मईया 🙏</span>
      </div>

      {/* Top right — location, live count & social links */}
      <div className="header-right">
        <div className="header-top-row">
          <div className="location-badge">
            <span className="location-dot">📍</span>
            <span className="location-text">BIHAR • CHHATH PUJA</span>
          </div>
          <div className="track-count-badge">
            <span className="live-dot" aria-hidden="true" />
            <span>{totalSongs} TRACKS</span>
          </div>
        </div>

        {/* User Social Links */}
        <div className="header-social-links">
          <a
            href="https://github.com/aryanshaw421-alt"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn social-btn--github"
            aria-label="Aryan Shaw GitHub Profile"
            title="GitHub: aryanshaw421-alt"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span>GitHub</span>
          </a>

          <a
            href="https://www.instagram.com/aryan_m340i?igsh=OWZocGlzMTVyMTI2"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn social-btn--instagram"
            aria-label="Aryan Shaw Instagram Profile"
            title="Instagram: @aryan_m340i"
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </header>
  );
}
