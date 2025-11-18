import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HorizontalScroll.module.css";
import { Flip } from "gsap/Flip";
import Lenis from "lenis";
import { t } from "i18next";
import TextReveal from "./TextReveal";

const HorizontalScroll = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);

    const lenis = new Lenis({
      // 🆕 allow both vertical & horizontal natural scrolling
      smoothWheel: true,
      gestureDirection: "both",
      smoothTouch: true,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const lightColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--light")
      .trim();
    const darkColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--dark")
      .trim();

    const interpolateColor = (color1, color2, factor) =>
      gsap.utils.interpolate(color1, color2, factor);

    gsap.to(`.${styles.marqueeImages}`, {
      scrollTrigger: {
        trigger: `.${styles.marquee}`,
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const xPosition = -75 + progress * 25;
          gsap.set(`.${styles.marqueeImages}`, { x: `${xPosition}%` });
        },
      },
    });

    let pinnedMarqueeImgClone = null;
    let isImgCloneActive = false;

    const createPinnedMarqueeImgClone = () => {
      if (isImgCloneActive) return;
      const originalMarqueeImg = document.querySelector(
        `.${styles.marqueeImg}.pin img`
      );
      if (!originalMarqueeImg) return;

      const rect = originalMarqueeImg.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      pinnedMarqueeImgClone = originalMarqueeImg.cloneNode(true);
      gsap.set(pinnedMarqueeImgClone, {
        position: "fixed",
        left: centerX - rect.width / 2,
        top: centerY - rect.height / 2,
        width: rect.width,
        height: rect.height,
        transform: "rotate(-5deg)",
        transformOrigin: "center center",
        pointerEvents: "none",
        zIndex: 100,
      });

      document.body.appendChild(pinnedMarqueeImgClone);
      gsap.set(originalMarqueeImg, { opacity: 0 });
      isImgCloneActive = true;
    };

    const removePinnedMarqueeImgClone = () => {
      if (!isImgCloneActive) return;
      if (pinnedMarqueeImgClone) pinnedMarqueeImgClone.remove();
      const originalMarqueeImg = document.querySelector(
        `.${styles.marqueeImg}.pin img`
      );
      if (originalMarqueeImg) gsap.set(originalMarqueeImg, { opacity: 1 });
      pinnedMarqueeImgClone = null;
      isImgCloneActive = false;
    };

    // keep pinning behavior
    ScrollTrigger.create({
      trigger: `.${styles.horizontalScroll}`,
      start: "top top",
      end: () => `+=${window.innerHeight * 1.2}`,
      pin: true,
      pinSpacing: true, // 🆕 ensures spacing for natural scroll feel
    });

    ScrollTrigger.create({
      trigger: `.${styles.marquee}`,
      start: "top top",
      onEnter: createPinnedMarqueeImgClone,
      onEnterBack: createPinnedMarqueeImgClone,
      onLeaveBack: removePinnedMarqueeImgClone,
    });

    let flipAnimation = null;

    ScrollTrigger.create({
      trigger: `.${styles.horizontalScroll}`,
      start: "top 50%",
      end: () => `+=${window.innerHeight * 1.8}`,
      onEnter: () => {
        if (pinnedMarqueeImgClone && isImgCloneActive && !flipAnimation) {
          const state = Flip.getState(pinnedMarqueeImgClone);
          gsap.set(pinnedMarqueeImgClone, {
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100svh",
            transform: "rotate(0deg)",
          });
          flipAnimation = Flip.from(state, {
            duration: 1,
            ease: "none",
            paused: true,
          });
        }
      },
      onLeaveBack: () => {
        if (flipAnimation) {
          flipAnimation.kill();
          flipAnimation = null;
        }
        gsap.set(`.${styles.container}`, { backgroundColor: lightColor });
        gsap.set(`.${styles.horizontalScrollWrapper}`, { x: "0%" });
      },
    });

    ScrollTrigger.create({
      trigger: `.${styles.horizontalScroll}`,
      start: "top 50%",
      end: () => `+=${window.innerHeight * 1.8}`,
      onUpdate: (self) => {
        const progress = self.progress;
        if (progress <= 0.05) {
          const bgColorProgress = Math.min(progress / 0.05, 1);
          const newBgColor = interpolateColor(
            lightColor,
            darkColor,
            bgColorProgress
          );
          gsap.set(`.${styles.container}`, { backgroundColor: newBgColor });
        } else if (progress > 0.05) {
          gsap.set(`.${styles.container}`, { backgroundColor: darkColor });
        }

        if (progress <= 0.2) {
          const scaleProgress = progress / 0.2;
          if (flipAnimation) flipAnimation.progress(scaleProgress);
        }

        if (progress > 0.2 && progress <= 0.95) {
          if (flipAnimation) flipAnimation.progress(1);
          const horizontalProgress = (progress - 0.2) / 0.75;
          const wrapperTranslateX = -66.67 * horizontalProgress;
          gsap.set(`.${styles.horizontalScrollWrapper}`, {
            x: `${wrapperTranslateX}%`,
          });
          gsap.set(pinnedMarqueeImgClone, {
            x: `${-200 * horizontalProgress}%`,
          });
        } else if (progress > 0.95) {
          if (flipAnimation) flipAnimation.progress(1);
          gsap.set(pinnedMarqueeImgClone, { x: "-200%" });
          gsap.set(`.${styles.horizontalScrollWrapper}`, { x: "-66.67%" });
        }
      },
    });

    // 🆕 allow cleanup & native horizontal scroll restoration
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.outro} data-theme="light">
        <img src="/Logo_of_Shiv_Sena.svg" alt="Shiv Sena Logo" loading="lazy" />
        <div className={styles.textContent}>
          <TextReveal>
            <h1>{t("marquee.heading")}</h1>
          </TextReveal>
          <TextReveal>
            <h2>{t("marquee.description")}</h2>
          </TextReveal>
          <TextReveal>
            <h2 className="text-white">{t("marquee.name")}</h2>
          </TextReveal>
        </div>
      </section>

      <section
        className="relative flex items-center justify-center min-h-screen overflow-hidden"
        data-theme="light"
      >
        <img src="/mh_mob.png" alt="Background" className="absolute z-0" />
        <div className="relative z-10 text-center px-4">
          <TextReveal>
            <h1 className="text-6xl md:text-5xl font-extrabold">{t("hero2")}</h1>
          </TextReveal>
        </div>
      </section>

      <section
        className={`${styles.horizontalScroll} overflow-x-auto`} // 🆕 allow manual horizontal scroll
        data-theme="dark"
      >
        <div className={`${styles.horizontalScrollWrapper} flex`}>
          <div
            className={`${styles.horizontalSlide} ${styles.horizontalSpacer}`}
          >
            <h1 className="text-white text-2xl">{t("campaign_line")}</h1>
            <div className="w-full flex justify-center overflow-hidden">
              <img
                src="mobile_marquee.png"
                alt="Marquee"
                className="h-full object-cover"
              />
            </div>
          </div>

          <div className={styles.horizontalSlide}>
            <div className={styles.col}>
              <h3>{t("farmers")}</h3>
            </div>
            <div className={styles.col}>
              <img src="/farmer.png" alt="slide-1" />
            </div>
          </div>

          <div className={styles.horizontalSlide}>
            <div className={styles.col}>
              <h3>{t("youth")}</h3>
            </div>
            <div className={styles.col}>
              <img src="/youth.png" alt="slide-2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HorizontalScroll;
