import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import styles from "./PhiveTextScroll.module.css";
import image1 from "../assets/phive-bg.jpg";
import Slider from "./Slider";
import { useTranslation } from "react-i18next";

import CustomCursor from "./CustomCursor.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function PhiveTextScroll() {
  
  
  const { t, i18n } = useTranslation();
  const rootRef = useRef(null);
  const lenisRef = useRef(null);
  const headerWordsRef = useRef([]);
  const targetScalesRef = useRef([1, 1, 1]);

  useEffect(() => {
    if (!rootRef.current) return;

    // Lenis
    const lenis = new Lenis();
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const root = rootRef.current;
    const header = root.querySelector(`.${styles.header} h1`);
    const textElement1 = root.querySelector(
      `.${styles.stickyText1} .${styles.textContainer} h1`
    );
    const textElement2 = root.querySelector(
      `.${styles.stickyText2} .${styles.textContainer} h1`
    );
    const textElement3 = root.querySelector(
      `.${styles.stickyText3} .${styles.textContainer} h1`
    );
    const textContainer3 = root.querySelector(
      `.${styles.stickyText3} .${styles.textContainer}`
    );

    // MANUAL word split for header (robust, no SplitText)
    if (header) {
      const raw = header.textContent.trim();
      const words = raw.length ? raw.split(/\s+/) : [];
      header.innerHTML = words
        .map(
          (w, i) =>
            `<span class="${
              styles.spotlightWord
            }" data-index="${i}">${w}</span>${i < words.length - 1 ? " " : ""}`
        )
        .join("");
      headerWordsRef.current = Array.from(
        header.querySelectorAll(`.${styles.spotlightWord}`)
      );
      // hide initially
      gsap.set(headerWordsRef.current, { opacity: 0, y: 10 });
    }

    // dynamic scale calculation
    function calculateDynamicScale() {
      for (let i = 1; i <= 3; i++) {
        const section = root.querySelector(`.${styles["stickyText" + i]}`);
        const text = root.querySelector(
          `.${styles["stickyText" + i]} .${styles.textContainer} h1`
        );
        if (!section || !text) {
          targetScalesRef.current[i - 1] = 1;
          continue;
        }
        const sectionHeight = section.offsetHeight || window.innerHeight;
        const textHeight = Math.max(1, text.offsetHeight);
        targetScalesRef.current[i - 1] = sectionHeight / textHeight;
      }
    }
    calculateDynamicScale();
    const onResize = () => {
      calculateDynamicScale();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    // helper to set scaleY
    function setScaleY(element, scale) {
      if (!element) return;
      element.style.transform = `scaleY(${scale})`;
      element.style.transformOrigin = "50% 0%";
    }

    // sticky 1
    ScrollTrigger.create({
      trigger: `.${styles.stickyText1}`,
      start: "top bottom",
      end: "top top",
      scrub: 1,
      onUpdate: (self) => {
        setScaleY(textElement1, targetScalesRef.current[0] * self.progress);
      },
    });
    ScrollTrigger.create({
      trigger: `.${styles.stickyText1}`,
      start: "top top",
      end: `+=${window.innerHeight * 1}px`,
      pin: true,
      pinSpacing: false,
      scrub: 1,
      onUpdate: (self) => {
        setScaleY(
          textElement1,
          targetScalesRef.current[0] * (1 - self.progress)
        );
      },
    });

    // sticky 2
    ScrollTrigger.create({
      trigger: `.${styles.stickyText2}`,
      start: "top bottom",
      end: "top top",
      scrub: 1,
      onUpdate: (self) => {
        setScaleY(textElement2, targetScalesRef.current[1] * self.progress);
      },
    });
    ScrollTrigger.create({
      trigger: `.${styles.stickyText2}`,
      start: "top top",
      end: `+=${window.innerHeight * 1}px`,
      pin: true,
      pinSpacing: false,
      scrub: 1,
      onUpdate: (self) => {
        setScaleY(
          textElement2,
          targetScalesRef.current[1] * (1 - self.progress)
        );
      },
    });

    // sticky 3 simple scale & bg fades + header reveal
    ScrollTrigger.create({
      trigger: `.${styles.stickyText3}`,
      start: "top bottom",
      end: "top top",
      scrub: 1,
      onUpdate: (self) => {
        setScaleY(textElement3, targetScalesRef.current[2] * self.progress);
      },
    });

    ScrollTrigger.create({
      trigger: `.${styles.stickyText3}`,
      start: "top top",
      end: `+=${window.innerHeight * 4}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const outroTextBgColor = getComputedStyle(document.documentElement)
          .getPropertyValue("--dark")
          .trim();

        if (!textContainer3) return;

        // scale behaviour
        if (progress <= 0.75) {
          const scaleProgress = progress / 0.75;
          const currentScale = 1 + 9 * scaleProgress;
          textContainer3.style.transform = `scale3d(${currentScale}, ${currentScale}, 1)`;
        } else {
          textContainer3.style.transform = `scale3d(10, 10, 1)`;
        }

        // background fade (expects rgba(...,1))
        if (progress < 0.25) {
          textContainer3.style.backgroundColor = outroTextBgColor;
          textContainer3.style.opacity = 1;
        } else if (progress >= 0.25 && progress <= 0.5) {
          const fadeProgress = (progress - 0.25) / 0.25;
          const bgOpacity = Math.max(0, Math.min(1, 1 - fadeProgress));
          textContainer3.style.backgroundColor = outroTextBgColor.replace(
            "1)",
            `${bgOpacity})`
          );
        } else if (progress > 0.5) {
          textContainer3.style.backgroundColor = outroTextBgColor.replace(
            "1)",
            "0)"
          );
        }

        // text fade
        if (progress >= 0.5 && progress <= 0.75) {
          const textProgress = (progress - 0.5) / 0.25;
          textContainer3.style.opacity = 1 - textProgress;
        } else if (progress > 0.75) {
          textContainer3.style.opacity = 0;
        }

        // HEADER word-by-word reveal on scroll progress (0.75 -> 0.95)
        const headerWords = headerWordsRef.current;
        if (headerWords && headerWords.length) {
          if (progress >= 0.75 && progress <= 0.95) {
            const textProgress = (progress - 0.75) / 0.2; // 0..1
            const totalWords = headerWords.length;
            headerWords.forEach((wordEl, index) => {
              const revealThreshold = index / totalWords;
              const shouldShow = textProgress >= revealThreshold;
              gsap.to(wordEl, {
                opacity: shouldShow ? 1 : 0,
                y: shouldShow ? 0 : 10,
                duration: 0.15,
                overwrite: true,
                ease: "power1.out",
              });
            });
          } else if (progress < 0.75) {
            gsap.set(headerWords, { opacity: 0, y: 10 });
          } else if (progress > 0.95) {
            gsap.set(headerWords, { opacity: 1, y: 0 });
          }
        }
      },
    });

    // cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      try {
        lenis.destroy();
      } catch (e) {}
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      <section className={`${styles.section} ${styles.hero}`} data-theme="dark">
        {/* <h1>Farmers are the pride of nation</h1> */}
        <img src={t("hero.image")} alt="Farmers" className="w-[70vw]" />
      </section>
{/* 
      <section className={`${styles.section} ${styles.stickyText1}`}>
        <div className={styles.textContainer}>
          <h1>Mumbai</h1>
        </div>
      </section>

      <section className={`${styles.section} ${styles.stickyText2}`}>
        <div className={styles.textContainer}>
          <h1>Youth</h1>
        </div>
      </section> */}

      <section className={`${styles.section} ${styles.stickyText3}`}>
        <div className={styles.bgImg}>
          {/* keep the original img slot; replace src as needed */}
          <img src={image1} alt="bg" />
        </div>

        <div className={styles.textContainer}>
          {/* <h1>{t("phive.text")}</h1> */}
          <h1 className="text-white transition-all duration-200 ease-in-out hover:text-orange-500 hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]">

Mumbai</h1>
        </div>

        <div className={styles.header}>
          <h1>
            {t("phive.line")}
          </h1>
        </div>
      </section>
    </div>
  );
}
