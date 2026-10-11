import Link from "next/link";
export function Brand({ light = false, compact = false }) {
    return (<Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Mansoori Mobility home">
      <svg viewBox="0 0 48 38" className="h-9 w-10 shrink-0" fill="none" aria-hidden="true">
        <path d="M3 30.5 17.5 7.5 30 27.5 44 5" stroke="#11C8A5" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 18.5 30 27.5 44 5" stroke="#2D8EF0" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {!compact && <span className="leading-[1.02]"><span className={`block text-[16px] font-extrabold tracking-[.045em] ${light ? "text-white" : "text-slate-900"}`}>MANSOORI</span><span className="block text-[12px] font-bold tracking-[.18em] text-teal-500">MOBILITY</span></span>}
    </Link>);
}
