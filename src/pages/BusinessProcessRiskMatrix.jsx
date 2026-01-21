// BusinessProcessRiskMatrix.jsx
import React from "react";
import "./css/BusinessProcessRiskMatrix.css";

function MatrixIcon({ variant }) {
  return (
    <div className={`bprm-icon bprm-icon--${variant}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="bprm-icon__svg">
        <path
          d="M4 6.5C4 5.12 5.12 4 6.5 4h11C18.88 4 20 5.12 20 6.5v11c0 1.38-1.12 2.5-2.5 2.5h-11C5.12 20 4 18.88 4 17.5v-11Zm3 1.25h3.5V11H7V7.75Zm0 5h3.5v3.5H7v-3.5Zm6.5-5H17V11h-3.5V7.75Zm0 5H17v3.5h-3.5v-3.5Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function MatrixCard({ title, subtitle, variant, onClick }) {
  return (
    <button
      type="button"
      className={`bprm-card bprm-card--${variant}`}
      onClick={onClick}
      aria-label={title}
    >
      <div className="bprm-card__sheen" aria-hidden="true" />

      <div className="bprm-card__header">
        <MatrixIcon variant={variant} />
        <div className="bprm-card__heading">
          <h2 className="bprm-card__title">{title}</h2>
          <p className="bprm-card__subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="bprm-card__footer">
        <span className="bprm-card__cta">Buka halaman</span>
        <span className="bprm-card__arrow" aria-hidden="true">
          →
        </span>
      </div>
    </button>
  );
}

export default function BusinessProcessRiskMatrix() {
  return (
    <main className="bprm-page">
      <div className="bprm-container">
        <header className="bprm-hero">
          <h1 className="bprm-title">Business Process Risk Matrix</h1>
          <p className="bprm-subtitle">
            Pemetaan risiko ke proses bisnis, kontrol, owner, dan aplikasi pendukung.
          </p>
        </header>
      </div>
    </main>
  );
}
