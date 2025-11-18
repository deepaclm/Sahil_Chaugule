import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import styles from "./AboutScroll.module.css";
import about_img from "/about_hero.png";
import TextReveal from "./TextReveal";
import SplitText from "./SplitText";
import TrailText from "./TrailText";
import CustomCursor from "./CustomCursor";

import { useTranslation } from "react-i18next";

const AboutScroll = () => {
  const { t } = useTranslation();
 useEffect(() => {
  // Ensure page always starts at top
  window.scrollTo(0, 0);

  gsap.registerPlugin(ScrollTrigger);

  // Smooth scrolling
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Animate text clipping
  document
    .querySelectorAll(`.${styles.animateText}`)
    .forEach((textElement) => {
      textElement.setAttribute("data-text", textElement.textContent.trim());

      ScrollTrigger.create({
        trigger: textElement,
        start: "top 50%",
        end: "bottom 50%",
        scrub: 1,
        onUpdate: (self) => {
          const clipValue = Math.max(0, 100 - self.progress * 100);
          textElement.style.setProperty("--clip-value", `${clipValue}%`);
        },
      });
    });

  // Services horizontal motion
  ScrollTrigger.create({
    trigger: `.${styles.services}`,
    start: "top bottom",
    end: "top top",
    scrub: 1,
    onUpdate: (self) => {
      const headers = document.querySelectorAll(`.${styles.servicesHeader}`);
      gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
      gsap.set(headers[1], { x: `${-100 + self.progress * 100}%` });
      gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
    },
  });

  // Services scaling effect
  ScrollTrigger.create({
    trigger: `.${styles.services}`,
    start: "top top",
    end: `+=${window.innerHeight * 2}`,
    pin: true,
    scrub: 1,
    pinSpacing: false,
    onUpdate: (self) => {
      const headers = document.querySelectorAll(`.${styles.servicesHeader}`);

      if (self.progress <= 0.5) {
        const yProgress = self.progress / 0.5;
        gsap.set(headers[0], { y: `${yProgress * 100}%` });
        gsap.set(headers[2], { y: `${yProgress * -100}%` });
      } else {
        gsap.set(headers[0], { y: "100%" });
        gsap.set(headers[2], { y: "-100%" });

        const scaleProgress = (self.progress - 0.5) / 0.5;
        const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
        const scale = 1 - scaleProgress * (1 - minScale);

        headers.forEach((header) => gsap.set(header, { scale }));
      }
    },
  });

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    lenis.destroy();
  };
}, []);


  return (
    <div className="bg-[#1a1a1a] relative overflow-hidden">
      <CustomCursor />

      {/* ---------- HERO SECTION ---------- */}
      <section className={styles.hero} data-theme="dark">
        <img
          src="/graphic_right.png"
          alt=""
          className="absolute right-0 top-[50vh] object-contain pointer-events-none"
          style={{
            width: "10vw",
            height: "50vh",
          }}
        />

        <style>
          {`
        @media (max-width: 768px) {
          img[src="/graphic_right.png"] {
            width: 22vw !important;
            height: 35vh !important;
            top: 55vh !important;
          }
        }
        
        @media (max-width: 480px) {
          img[src="/graphic_right.png"] {
            width: 10vw !important;
            height: 50vh !important;
            top: 60vh !important;
          }
        }
        `}
        </style>

        <img
          src="/graphic_top_left.png"
          alt=""
          className="absolute top-0 left-0 object-contain pointer-events-none"
          style={{
            width: "25vw",
            height: "50vh",
          }}
        />

        <style>
          {`
        @media (max-width: 768px) {
          img[alt=""] {
            width: 40vw !important;
            height: 35vh !important;
          }
        }
        @media (max-width: 480px) {
          img[alt=""] {
            width: 55vw !important;
            height: 30vh !important;
          }
        }
        `}
        </style>

        <img
          src="/graphic_left.png"
          alt=""
          className="absolute left-0 top-[150vh] object-contain pointer-events-none"
          style={{
            width: "10vw",
            height: "50vh",
          }}
        />

        <style>
          {`
        @media (max-width: 768px) {
          img[src="/graphic_left.png"] {
            width: 22vw !important;
            height: 35vh !important;
            top: 55vh !important;
          }
        }
        
        @media (max-width: 480px) {
          img[src="/graphic_left.png"] {
            width: 10vw !important;
            height: 28vh !important;
            top: 60vh !important;
          }
        }
        `}
        </style>

        {/* Main Hero Content */}
        <div className={`${styles.heroContent}`}>
          <img
            className={styles.heroImg}
            src={about_img}
            alt="About Chaugule"
          />

          {/* ✅ Added hover-target class here */}
          <div className={`${styles.textBlock} hover-target`}>
            {/* Hero Title */}
            <TrailText
              text={t("about.hero_title")}
              className={`${styles.heroTitle} font-zentry font-extrabold special-font text-white transition-all duration-500 ease-in-out hover:scale-y-105 hover:text-gray-100 hover:drop-shadow-sm`}
              delay={150}
              animationFrom={{
                opacity: 0,
                transform: "translate3d(0,100px,0)",
              }}
              animationTo={{
                opacity: 1,
                transform: "translate3d(0,0,0)",
              }}
              threshold={0.1}
              rootMargin="-100px"
            />

            {/* Hero Subtitle */}
            <SplitText
              text={t("about.hero_subtitle")}
              className="tracking-wider text-3xl sm:text-6xl font-zentry leading-normal font-extrabold special-font text-orange-500 transition-all duration-500 ease-in-out hover:tracking-widest hover:scale-y-105 hover:text-orange-700 hover:drop-shadow-sm"
              delay={40}
              animationFrom={{
                opacity: 0,
                transform: "translate3d(0,100px,0)",
              }}
              animationTo={{
                opacity: 1,
                transform: "translate3d(0,0,0)",
              }}
              easing="easeOutCubic"
              threshold={0.1}
              rootMargin="-100px"
              boldLetters={["a"]}
            />
          </div>
        </div>
      </section>

   {/* ---------- ABOUT SECTION ---------- */}
<section className={styles.about} data-theme="dark">
  <h1 className={`${styles.animateText} scroll-target`}>
    {t("about.section1")}
  </h1>
</section>

{/* ---------- WHAT I DO SECTION ---------- */}
<section className={styles.services} data-theme="dark">
  <div className={`${styles.servicesHeader} scroll-target`}>
    <img src={t("about.image")} alt={t("about.whatido")} />
  </div>
  <div className={`${styles.servicesHeader} scroll-target`}>
    <img src={t("about.image")} alt={t("about.whatido")} />
  </div>
  <div className={`${styles.servicesHeader} scroll-target`}>
    <img src={t("about.image")} alt={t("about.whatido")} />
  </div>
</section>

{/* ---------- SECONDARY TEXT SECTION ---------- */}
<section className={styles.servicesCopy} data-theme="dark">
  <h1 className={`${styles.animateText} scroll-target`}>
    {t("about.section2")}
  </h1>
</section>


      {/* ---------- VIDEO SECTION ---------- */}
      <section
        className="w-full flex justify-center items-center py-16 px-6"
        data-theme="dark"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl">
          <video
            src="/videos/video1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full aspect-[9/16] object-cover object-center rounded-2xl bg-transparent cursor-auto transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
          />
          <video
            src="/videos/video2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full aspect-[9/16] object-cover object-center rounded-2xl bg-transparent cursor-auto transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
          />
          <video
            src="/videos/video3.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full aspect-[9/16] object-cover object-center rounded-2xl bg-transparent cursor-auto transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
          />
        </div>
      </section>
    </div>
  );
};

export default AboutScroll;
