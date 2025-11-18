import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown, Menu, X } from "lucide-react";
import "./Header.css"

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [theme, setTheme] = useState("light");
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Observe preloader
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      const observer = new MutationObserver(() => {
        const isVisible = window.getComputedStyle(preloader).display !== "none";
        setIsHidden(isVisible);
      });
      observer.observe(preloader, {
        attributes: true,
        attributeFilter: ["style"],
      });
      return () => observer.disconnect();
    }
  }, []);

  // Scroll hide + theme detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHidden(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);

    const sections = document.querySelectorAll("[data-theme]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setTheme(visible.target.dataset.theme);
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [lastScrollY]);

  const isDark = theme === "dark";
  const textColor = isDark ? "text-white" : "text-black";
  const hoverLine = isDark ? "after:bg-white" : "after:bg-black";

  const navLinks = [
    { to: "/about", label: t("nav.about") },
    { to: "/vision", label: t("nav.vision") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-start px-4 py-4 md:px-8 transition-all duration-500 ease-in-out
        ${isHidden ? "-translate-y-full" : "translate-y-0"} ${textColor}`}
      style={{ background: "blur", pointerEvents: "auto" }}
    >
      {/* Logo */}
      <div className="nav-logo font-bold text-xl tracking-wide uppercase">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          {t("nav.name")}
        </Link>
      </div>

      {/* Hamburger Icon (mobile) */}
      <button
        className="md:hidden z-50"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? (
          <X className={`w-6 h-6 ${isDark ? "text-white" : "text-black"}`} />
        ) : (
          <Menu className={`w-6 h-6 ${isDark ? "text-white" : "text-black"}`} />
        )}
      </button>

      {/* Nav links container */}
      <nav
  className={`
    flex flex-col md:flex-row md:items-center md:gap-8 gap-2  md:mt-0 font-medium uppercase text-sm md:text-base
    transition-all duration-400 ease-in-out
    md:static absolute right-4 top-16
    ${menuOpen
      ? "opacity-100 translate-y-0 pointer-events-auto backdrop-blur-sm bg-white/40 rounded-2xl p-2 font-bold"
      : "opacity-0 -translate-y-6 pointer-events-none"}
    md:opacity-100 md:translate-y-0 md:pointer-events-auto
    ${textColor}
  `}
  aria-expanded={menuOpen}
>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setMenuOpen(false)}
            className={`relative px-1 py-1 transition-all duration-300 hover:opacity-90
              after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] ${hoverLine}
              after:transition-all after:duration-300 hover:after:w-full`}
          >
            {label}
          </Link>
        ))}

        {/* Language Dropdown */}
        <div className="relative flex items-center z-[200]">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className={`flex items-center justify-center gap-1 font-semibold uppercase tracking-wide 
      transition-all duration-300 px-1 py-1
      ${
        isDark
          ? "text-white hover:text-white/80"
          : "text-black hover:text-black/70"
      }`}
          >
            {i18n.language.toUpperCase()}
            <ChevronDown
              className={`w-4 h-4 ml-0.5 transition-transform duration-300 ${
                langOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 top-full mt-2 w-36 rounded-xl border backdrop-blur-md shadow-xl overflow-hidden
      transform transition-all duration-200 ease-out origin-top
      ${
        langOpen
          ? "scale-100 opacity-100"
          : "scale-95 opacity-0 pointer-events-none"
      }
      ${
        isDark
          ? "bg-[#0f0f0f]/80 border-white/10 text-white"
          : "bg-white/80 border-black/10 text-black"
      }`}
          >
            <ul className="py-2 text-sm font-medium">
              {[
                { code: "en", label: "English" },
                { code: "hi", label: "हिन्दी" },
                { code: "mr", label: "मराठी" },
              ].map(({ code, label }) => (
                <li key={code}>
                  <button
                    onClick={() => {
                      i18n.changeLanguage(code);
                      setLangOpen(false);
                      setMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2.5 transition-all duration-200
              ${
                isDark
                  ? "hover:bg-white/10 active:bg-white/20"
                  : "hover:bg-black/10 active:bg-black/20"
              }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
