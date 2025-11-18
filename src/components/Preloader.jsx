import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import CustomEase from "gsap/CustomEase";
import styles from "./Preloader.module.css";

import { useTranslation } from "react-i18next";

gsap.registerPlugin(CustomEase, SplitText);

const Preloader = () => {
  const preloaderRef = useRef(null);
  const { t } = useTranslation();

 useEffect(() => {
  CustomEase.create("hop", "0.9, 0, 0.1, 1");

  const createSplit = (selector, type, className) => {
    return SplitText.create(selector, {
      type,
      [`${type}Class`]: className,
      mask: type,
    });
  };

  const splitPreloaderHeader = createSplit(
    `.${styles.preloaderHeader} a`,
    "chars",
    "char"
  );
  const splitPreloaderCopy = createSplit(
    `.${styles.preloaderCopy} p`,
    "lines",
    "line"
  );
  const splitHeader = createSplit(`.${styles.headerRow} h1`, "lines", "line");

  const chars = splitPreloaderHeader.chars;
  const lines = splitPreloaderCopy.lines;
  const headerLines = splitHeader.lines;
  const initialChar = chars[0];
  const lastChar = chars[chars.length - 1];

  chars.forEach((char, index) => {
    gsap.set(char, { yPercent: index % 2 === 0 ? -100 : 100 });
  });

  gsap.set(lines, { yPercent: 100 });
  gsap.set(headerLines, { yPercent: 100 });

  const preloaderImages = gsap.utils.toArray(
    `.${styles.preloaderImages} .${styles.img}`
  );
  const preloaderImagesInner = gsap.utils.toArray(
    `.${styles.preloaderImages} .${styles.img} img`
  );

  const tl = gsap.timeline({ delay: 0.25 });

  tl.to(`.${styles.progressBar}`, {
    scaleX: 1,
    duration: 4,
    ease: "power3.inOut",
  })
    .set(`.${styles.progressBar}`, { transformOrigin: "right" })
    .to(`.${styles.progressBar}`, {
      scaleX: 0,
      duration: 1,
      ease: "power3.in",
    });

  preloaderImages.forEach((preloaderImg, index) => {
    tl.to(
      preloaderImg,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "hop",
        delay: index * 0.75,
      },
      "-=5"
    );
  });

  preloaderImagesInner.forEach((img, index) => {
    tl.to(
      img,
      {
        scale: 1,
        duration: 1.5,
        ease: "hop",
        delay: index * 0.75,
      },
      "-=5.25"
    );
  });

  tl.to(
    lines,
    { yPercent: 0, duration: 2, ease: "hop", stagger: 0.1 },
    "-=5.5"
  )
    .to(
      chars,
      { yPercent: 0, duration: 1, ease: "hop", stagger: 0.025 },
      "-=5"
    )
    .to(
      `.${styles.preloaderImages}`,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "hop",
      },
      "-=1.5"
    )
    .to(
      lines,
      {
        y: "-125%",
        duration: 2,
        ease: "hop",
        stagger: 0.1,
      },
      "-=2"
    )
    .to(
      chars,
      {
        yPercent: (i) =>
          i === 0 || i === chars.length - 1 ? 0 : i % 2 === 0 ? 100 : -100,
        duration: 1,
        ease: "hop",
        stagger: 0.025,
        delay: 0.5,
        onStart: () => {
          const initialCharMask = initialChar.parentElement;
          const lastCharMask = lastChar.parentElement;

          if (initialCharMask?.classList.contains("char-mask"))
            initialCharMask.style.overflow = "visible";
          if (lastCharMask?.classList.contains("char-mask"))
            lastCharMask.style.overflow = "visible";

          const viewportWidth = window.innerWidth;
          const centerX = viewportWidth / 2;
          const initialCharRect = initialChar.getBoundingClientRect();
          const lastCharRect = lastChar.getBoundingClientRect();

          gsap.to([initialChar, lastChar], {
            duration: 1,
            ease: "hop",
            delay: 0.5,
            x: (i) =>
              i === 0
                ? centerX - initialCharRect.left - initialCharRect.width
                : centerX - lastCharRect.left,
            onComplete: () => {
              gsap.set(`.${styles.preloaderHeader}`, {
                mixBlendMode: "difference",
              });
              gsap.to(`.${styles.preloaderHeader}`, {
                y: "2rem",
                scale: 0.35,
                duration: 1.75,
                ease: "hop",
              });
            },
          });
        },
      },
      "-=2.5"
    )

    // ✅ Fixed smooth reveal animation (only this part changed)
    .set(
      `.${styles.preloader}`,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      0
    )
    .to(
      `.${styles.preloader}`,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.75,
        ease: "power4.inOut",
      },
      "-=0.75"
    )

    .to(
      `.${styles.headerRow} .line`,
      { yPercent: 0, duration: 1, ease: "power4.out", stagger: 0.1 },
      "-=0.75"
    )
    .to(
      `.${styles.divider}`,
      { scaleX: 1, duration: 1, ease: "power4.out", stagger: 0.1 },
      "<"
    );
}, []);


  return (
    <>
      <div ref={preloaderRef} className={styles.preloader} data-theme="dark">
        <div className={styles.progressBar}></div>

        <div className={styles.preloaderImages}>
          <div className={styles.img}>
            <img src="/preloader-img1.jpg" alt="" />
          </div>
          <div className={styles.img}>
            <img src="/preloader-img2.jpg" alt="" />
          </div>
          <div className={styles.img}>
            <img src="/preloader-img3.jpg" alt="" />
          </div>
          <div className={styles.img}>
            <img src="/preloader-img4.jpg" alt="" />
          </div>
        </div>

        <div className={styles.preloaderCopy}>
          <p>{t("preloader_text")}</p>
        </div>

        <div className={styles.preloaderHeader}>
          <a href="#">
            <span className="text-gray-200">Sahil</span>
            <span className="text-orange-500">Chaugule</span>
          </a>
        </div>
      </div>
      
    </>
  );
};

export default Preloader;
