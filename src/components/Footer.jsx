import { Instagram, Facebook, Youtube, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative w-full overflow-hidden">

      {/* ORANGE BLUR (BG DECORATION) */}
      <div className="absolute top-0 left-0 w-[180px] h-[180px] bg-orange-400 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-[180px] h-[180px] bg-orange-400 rounded-full blur-[120px] opacity-40"></div>

      {/* MAIN WRAPPER */}
      <div
        className="
          relative z-10 
          w-full max-w-7xl mx-auto my-0 sm:my-12
          px-6 sm:px-10 lg:px-16 py-8
          border border-gray-300 shadow-2xl bg-white
        "
      >

        {/* --- TOP SECTION --- */}
        <div
          className="
            flex flex-col sm:flex-row
            items-start sm:items-center justify-between
            gap-6 sm:gap-4
            pb-6 mb-10 border-b border-gray-200
          "
        >
{/* NAV ITEMS */}
<nav className="flex flex-wrap gap-6 text-sm font-medium font-serif">
  <Link to="/about" className="hover:opacity-70 transition-opacity">
    {t("footer.about")}
  </Link>

  <Link to="/vision" className="hover:opacity-70 transition-opacity">
    {t("footer.vision")}
  </Link>

  <Link to="/contact" className="hover:opacity-70 transition-opacity">
    {t("footer.contact")}
  </Link>
</nav>



          {/* SOCIAL ICONS */}
          <div className="flex gap-6">
            <a className="hover:opacity-70 transition-opacity"><Instagram size={22} /></a>
            <a className="hover:opacity-70 transition-opacity"><Facebook size={22} /></a>
            <a className="hover:opacity-70 transition-opacity"><Youtube size={22} /></a>
          </div>
        </div>

        {/* --- MAIN TAGLINES --- */}
        <div
          className="
            flex flex-col lg:flex-row
            items-start justify-between
            gap-10 mb-10
          "
        >
          {/* LEFT TEXT */}
          <div className="flex flex-col flex-1 gap-2 font-serif">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-serif">
                {t("footer.people_first")}
              </h2>
              <Sun size={36} className="text-amber-600" strokeWidth={1} />
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif">
              {t("footer.maharashtra_always")}
            </h3>
          </div>

          {/* RIGHT SMALL TEXT */}
          <div className="flex flex-col gap-4 text-right text-sm font-serif">
            <div>
              <div className="text-xs text-muted-foreground">
                {t("footer.lang_available")}
              </div>
              <div className="font-medium">
                {t("footer.people_first")}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">
                {t("footer.your_trust")}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">
                {t("footer.committed_dev")}
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-sm text-muted-foreground font-serif">
          {t("footer.copyright")}
        </div>

      </div>
    </footer>
  );
}
