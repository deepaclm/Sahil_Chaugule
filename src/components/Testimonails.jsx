import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useTranslation } from "react-i18next";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = t("testimonials", { returnObjects: true });

  const slideTitles = testimonials.map((item) => item.name);
  const slideDescriptions = testimonials.map((item) => item.text);

  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = slideTitles.length;
  const isAnimating = useRef(false);

  const sliderRef = useRef(null);
  const mainImgRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
  }, []);

  const animateSlide = (direction) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const slider = sliderRef.current;
    const mainImageContainer = mainImgRef.current;
    const titleContainer = titleRef.current;
    const descriptionContainer = descRef.current;
    const counterContainer = countRef.current;

    const currentBg = slider.querySelector(`.${styles.slideBgImg}`);
    const currentMainWrapper = mainImageContainer.querySelector(
      `.${styles.slideMainImgWrapper}`
    );
    const currentTitle = titleContainer.querySelector("h1");
    const currentDescription = descriptionContainer.querySelector("p");
    const currentCounter = counterContainer.querySelector("p");

    const newSlideIndex =
      direction === "right"
        ? currentSlide === totalSlides
          ? 1
          : currentSlide + 1
        : currentSlide === 1
        ? totalSlides
        : currentSlide - 1;

    setCurrentSlide(newSlideIndex);

    // ✅ New background image
    const newBg = document.createElement("div");
    newBg.className = styles.slideBgImg;
    const bgImg = document.createElement("img");
    bgImg.src = `/img${newSlideIndex}.jpg`;
    newBg.appendChild(bgImg);
    gsap.set(newBg, { x: direction === "right" ? "100%" : "-100%" });
    slider.appendChild(newBg);

    // ✅ New main circular image
    const newMainWrapper = document.createElement("div");
    newMainWrapper.className = styles.slideMainImgWrapper;
    const img = document.createElement("img");
    img.src = `/img${newSlideIndex}.jpg`;
    newMainWrapper.appendChild(img);
    gsap.set(newMainWrapper, {
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    });
    mainImageContainer.appendChild(newMainWrapper);

    // ✅ New title, description, and counter
    const newTitle = document.createElement("h1");
    newTitle.textContent = slideTitles[newSlideIndex - 1];
    const newDescription = document.createElement("p");
    newDescription.textContent = slideDescriptions[newSlideIndex - 1];
    const newCounter = document.createElement("p");
    newCounter.textContent = newSlideIndex;

    gsap.set([newTitle, newDescription, newCounter], {
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    });

    titleContainer.appendChild(newTitle);
    descriptionContainer.appendChild(newDescription);
    counterContainer.appendChild(newCounter);

    const ease = CustomEase.create("", ".87,0,.13,1");

    const tl = gsap.timeline({
      onComplete: () => {
        [
          currentBg,
          currentMainWrapper,
          currentTitle,
          currentDescription,
          currentCounter,
        ].forEach((el) => el?.remove());
        isAnimating.current = false;
      },
    });

    tl.to(
      currentBg,
      { x: direction === "right" ? "-100%" : "100%", duration: 1.25, ease },
      0
    )
      .to(newBg, { x: "0%", duration: 1.25, ease }, 0)
      .to(
        currentMainWrapper,
        {
          x: direction === "right" ? "-100%" : "100%",
          opacity: 0,
          duration: 1,
          ease,
        },
        0
      )
      .to(newMainWrapper, { x: "0%", opacity: 1, duration: 1, ease }, 0)
      .to(
        currentTitle,
        {
          opacity: 0,
          x: direction === "right" ? -40 : 40,
          duration: 0.6,
          ease,
        },
        0
      )
      .fromTo(
        newTitle,
        { opacity: 0, x: direction === "right" ? 40 : -40 },
        { opacity: 1, x: 0, duration: 0.8, ease },
        0.3
      )
      .to(
        currentDescription,
        {
          opacity: 0,
          x: direction === "right" ? -30 : 30,
          duration: 0.6,
          ease,
        },
        0
      )
      .fromTo(
        newDescription,
        { opacity: 0, x: direction === "right" ? 30 : -30 },
        { opacity: 1, x: 0, duration: 0.8, ease },
        0.3
      )
      .to(
        currentCounter,
        {
          opacity: 0,
          x: direction === "right" ? -20 : 20,
          duration: 0.5,
          ease,
        },
        0
      )
      .fromTo(
        newCounter,
        { opacity: 0 },
        { opacity: 1, x: 0, duration: 0.6, ease },
        0.3
      );
  };

  return (
    <div className={`${styles.testimonialsWrapper} font-[Manrope]`}>
      <footer className="absolute bottom-0 left-0 w-full flex justify-between items-center px-12 py-8 z-20">
        <div className="flex items-center text-white">
          <div ref={countRef} className={styles.count}>
            <p>1</p>
          </div>
          <p className="opacity-35">/</p>
          <p className="opacity-35">{totalSlides}</p>
        </div>
      </footer>

      <div ref={sliderRef} className={styles.slider}>
        <div className={styles.slideBgImg}>
          <img src="/img1.jpg" alt="background" />
        </div>

        <div ref={mainImgRef} className={`${styles.slideMainImg} z-10`}>
          <div className={styles.slideMainImgWrapper}>
            <img src="/img1.jpg" alt="avatar" />
          </div>
        </div>

        <div className={`${styles.slideCopy} z-20`}>
          <div ref={titleRef} className={styles.slideTitle}>
            <h1>{slideTitles[0]}</h1>
          </div>
          <div ref={descRef} className={styles.slideDescription}>
            <p>{slideDescriptions[0]}</p>
          </div>
        </div>

        <button
          onClick={() => animateSlide("left")}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 text-white text-5xl opacity-80 hover:opacity-100 transition"
        >
          ‹
        </button>
        <button
          onClick={() => animateSlide("right")}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 text-white text-5xl opacity-80 hover:opacity-100 transition"
        >
          ›
        </button>
      </div>
    </div>
  );
}
