import Link from "next/link";

export default function Brand({ light = false, compact = false }) {
  return (
    <Link href="/" className={`brand [&.brand]:[display:inline-flex] [&.brand]:[align-items:center] [&.brand]:[gap:10px] [&.brand]:[min-width:max-content] [.auth-content_&.brand]:[margin-bottom:44px] [.dashboard-sidebar_&.brand]:[padding:0_7px_27px] [.dashboard-sidebar_&.brand]:[border-bottom:1px_solid_rgba(148,163,184,.17)] max-[740px]:[.auth-content_&.brand]:[margin-bottom:45px]${light ? " brand-light" : ""}`} aria-label="Mansoori Mobility home">
      <span className="brand-mark [&.brand-mark]:[display:grid] [&.brand-mark]:[place-items:center] [&.brand-mark]:[width:42px] [&.brand-mark]:[height:42px] [&.brand-mark]:[border-radius:14px] [&.brand-mark]:[background:var(--navy)] [&.brand-mark]:[color:var(--teal-bright)] [&.brand-mark]:[box-shadow:0_8px_20px_rgba(15,23,42,.12)] max-[740px]:[&.brand-mark]:[width:38px] max-[740px]:[&.brand-mark]:[height:38px] [&.brand-mark]:[transition:transform_.24s_ease,_box-shadow_.24s_ease,_border-color_.24s_ease,_background-color_.24s_ease,_color_.24s_ease] [.brand:hover_&.brand-mark]:[transform:rotate(-4deg)_translateY(-1px)]" aria-hidden="true">
        <svg viewBox="0 0 40 30" width="27" height="22" fill="none">
          <path d="M3 23L12.3 7.4L20 18.6L27.8 7.4L37 23" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 23L20 12.3L27 23" stroke="#fff" strokeOpacity=".85" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span>
        <span className="brand-name [&.brand-name]:[font-family:'Manrope',_sans-serif] [&.brand-name]:[color:var(--navy)] [&.brand-name]:[font-weight:800] [&.brand-name]:[font-size:16px] [&.brand-name]:[letter-spacing:-.04em] [&.brand-name]:[line-height:1.05] [.brand-light_&.brand-name]:[color:#fff] [.auth-visual_&.brand-name]:[color:#fff] [.site-footer_&.brand-name]:[color:white] [.dashboard-sidebar_&.brand-name]:[color:white] max-[740px]:[&.brand-name]:[font-size:14px]">MANSOORI</span>
        {!compact && <span className="brand-subtitle [&.brand-subtitle]:[display:block] [&.brand-subtitle]:[color:var(--muted)] [&.brand-subtitle]:[letter-spacing:.11em] [&.brand-subtitle]:[font-size:9px] [&.brand-subtitle]:[margin-top:4px] [&.brand-subtitle]:[text-transform:uppercase] [&.brand-subtitle]:[font-weight:700] [.brand-light_&.brand-subtitle]:[color:#94a3b8] [.site-footer_&.brand-subtitle]:[color:#94a3b8] [.dashboard-sidebar_&.brand-subtitle]:[color:#94a3b8]">MOBILITY</span>}
      </span>
    </Link>
  );
}
