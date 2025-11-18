import React, { useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import Logo from "./Logo";
import styles from "./PageTransition.module.css";

const PageTransition = ({ children }) => {
  const overlayRef = useRef(null);
  const logoOverlayRef = useRef(null);
  const logoRef = useRef(null);
  const blocksRef = useRef([]);
  const isTransitioning = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Animate page reveal
  const revealPage = useCallback(() => {
    gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "right" });
    gsap.to(blocksRef.current, {
      scaleX: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
      transformOrigin: "right",
      onComplete: () => {
        isTransitioning.current = false;
        overlayRef.current.style.pointerEvents = "none";
      },
    });
  }, []);

  // Animate cover before routing
  const coverPage = (url) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    // ✅ Detect current section theme
    const currentSection = document.querySelector("[data-theme]");
    const theme = currentSection?.getAttribute("data-theme") || "light";
    const blockColor = theme === "dark" ? "#fff" : "#000";

    // Apply color before animation
    gsap.set(blocksRef.current, { backgroundColor: blockColor });

    gsap.to(blocksRef.current, {
      scaleX: 1,
      duration: 0.4,
      stagger: 0.02,
      ease: "power2.out",
      transformOrigin: "left",
      onComplete: () => {
        navigate(url);
        revealPage();
      },
    });
  };

  // Create blocks
  useEffect(() => {
    if (!overlayRef.current) return;
    overlayRef.current.innerHTML = "";
    blocksRef.current = [];

    for (let i = 0; i < 20; i++) {
      const block = document.createElement("div");
      block.className = styles.block;
      overlayRef.current.appendChild(block);
      blocksRef.current.push(block);
    }

    gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });
    revealPage();
  }, [location, revealPage]);

  // Handle navigation
  useEffect(() => {
    const links = document.querySelectorAll("a[data-nav]");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute("href");
        coverPage(href);
      });
    });

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", coverPage)
      );
    };
  });

  return (
    <>
      <div ref={overlayRef} className={styles.transitionOverlay}></div>
      <div ref={logoOverlayRef} className={styles.logoOverlay}>
        <div className={styles.logoContainer}>
          <Logo ref={logoRef} />
        </div>
      </div>
      {children}
    </>
  );
};

export default PageTransition;
