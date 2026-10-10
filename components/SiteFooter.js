import Link from "next/link";
import Brand from "@/components/Brand";

export default function SiteFooter() {
  return (
    <footer className="site-footer [&.site-footer]:[background:#0b1220] [&.site-footer]:[color:#cbd5e1] [&.site-footer]:[padding:55px_0_23px]">
      <div className="container [&.container]:[width:min(1160px,_calc(100%_-_40px))] [&.container]:[margin-inline:auto] max-[740px]:[&.container]:[width:min(100%_-_30px,1160px)]">
        <div className="footer-grid [&.footer-grid]:[display:grid] [&.footer-grid]:[grid-template-columns:1.5fr_1fr_1fr_1fr] [&.footer-grid]:[gap:35px] [&.footer-grid]:[padding-bottom:40px] max-[980px]:[&.footer-grid]:[grid-template-columns:1.4fr_1fr_1fr] max-[740px]:[&.footer-grid]:[grid-template-columns:repeat(2,1fr)] max-[740px]:[&.footer-grid]:[gap:28px_18px] max-[740px]:[&.footer-grid>div:first-child]:[grid-column:1/-1] max-[400px]:[&.footer-grid]:[grid-template-columns:1fr_1fr]">
          <div>
            <Brand light />
            <p className="footer-copy [&.footer-copy]:[color:#94a3b8] [&.footer-copy]:[max-width:320px] [&.footer-copy]:[margin-top:17px] [&.footer-copy]:[font-size:13px]">A simpler way to move your goods and find your next ride. Built around clear pricing, verified partners and dependable service.</p>
          </div>
          <div className="footer-col [&.footer-col_h4]:[color:white] [&.footer-col_h4]:[font-size:13px] [&.footer-col_h4]:[margin:3px_0_15px] [&.footer-col_h4]:[letter-spacing:0] [&.footer-col_a]:[display:block] [&.footer-col_a]:[color:#94a3b8] [&.footer-col_a]:[font-size:13px] [&.footer-col_a]:[margin:10px_0] [&.footer-col_a:hover]:[color:white] max-[980px]:[&.footer-col:last-child]:[display:none] max-[740px]:[&.footer-col:last-child]:[display:block]"><h4>Explore</h4><Link href="/freight">Freight transport</Link><Link href="/rentals">Rent a car</Link><Link href="/#how-it-works">How it works</Link><Link href="/dashboard">Partner dashboards</Link></div>
          <div className="footer-col [&.footer-col_h4]:[color:white] [&.footer-col_h4]:[font-size:13px] [&.footer-col_h4]:[margin:3px_0_15px] [&.footer-col_h4]:[letter-spacing:0] [&.footer-col_a]:[display:block] [&.footer-col_a]:[color:#94a3b8] [&.footer-col_a]:[font-size:13px] [&.footer-col_a]:[margin:10px_0] [&.footer-col_a:hover]:[color:white] max-[980px]:[&.footer-col:last-child]:[display:none] max-[740px]:[&.footer-col:last-child]:[display:block]"><h4>For partners</h4><Link href="/signup">List your vehicle</Link><Link href="/signup">Become a carrier</Link><Link href="/host/dashboard">Rental host demo</Link><Link href="/admin/dashboard">Admin demo</Link></div>
          <div className="footer-col [&.footer-col_h4]:[color:white] [&.footer-col_h4]:[font-size:13px] [&.footer-col_h4]:[margin:3px_0_15px] [&.footer-col_h4]:[letter-spacing:0] [&.footer-col_a]:[display:block] [&.footer-col_a]:[color:#94a3b8] [&.footer-col_a]:[font-size:13px] [&.footer-col_a]:[margin:10px_0] [&.footer-col_a:hover]:[color:white] max-[980px]:[&.footer-col:last-child]:[display:none] max-[740px]:[&.footer-col:last-child]:[display:block]"><h4>Support</h4><Link href="/login">Help centre</Link><Link href="/login">Contact support</Link><Link href="/login">Trust & safety</Link><Link href="/login">Terms & policies</Link></div>
        </div>
        <div className="footer-bottom [&.footer-bottom]:[border-top:1px_solid_rgba(148,163,184,.17)] [&.footer-bottom]:[padding-top:20px] [&.footer-bottom]:[display:flex] [&.footer-bottom]:[gap:20px] [&.footer-bottom]:[align-items:center] [&.footer-bottom]:[justify-content:space-between] [&.footer-bottom]:[color:#64748b] [&.footer-bottom]:[font-size:11px] max-[740px]:[&.footer-bottom]:[flex-direction:column] max-[740px]:[&.footer-bottom]:[align-items:start] max-[740px]:[&.footer-bottom]:[gap:8px]"><span>© 2026 Mansoori Mobility. All rights reserved.</span><span>Move Goods. Move People. <span className="![color:#5eead4]" >●</span></span></div>
      </div>
    </footer>
  );
}
