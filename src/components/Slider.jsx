import React, { useEffect, useRef } from "react";
import styles from "./Slider.module.css";
import { useTranslation } from "react-i18next"; 
import CustomCursor from "./CustomCursor.jsx";

export default function Slider() {
  const trackRef = useRef(null);
  const {t}=useTranslation();

const sliderData = [
  { title: "Voice of the People", img: "/slider_img_01.jpg", url: "#" },
  { title: "Path to Progress", img: "/slider_img_02.jpg", url: "#" },
  { title: "Unity in Diversity", img: "/slider_img_03.jpg", url: "#" },
  { title: "Strength of Democracy", img: "/slider_img_04.jpg", url: "#" },
  { title: "Nation First", img: "/slider_img_05.jpg", url: "#" },
  { title: "Empowering Youth", img: "/slider_img_06.jpg", url: "#" },
  { title: "Together We Rise", img: "/slider_img_07.jpg", url: "#" },
  { title: "Vision for Tomorrow", img: "/slider_img_08.png", url: "#" },
];


  useEffect(() => {
    const config = {
      SCROLL_SPEED: 1.75,
      LERP_FACTOR: 0.05,
      MAX_VELOCITY: 150,
    };

    const totalSlideCount = sliderData.length;

    const state = {
      currentX: 0,
      targetX: 0,
      slideWidth: 390,
      slides: [],
      isDragging: false,
      startX: 0,
      lastX: 0,
      lastMouseX: 0,
      lastScrollTime: Date.now(),
      isMoving: false,
      velocity: 0,
      lastCurrentX: 0,
      dragDistance: 0,
      hasActuallyDragged: false,
      isMobile: false,
    };

    const track = trackRef.current;

    function checkMobile() {
      state.isMobile = window.innerWidth < 1000;
    }

    function createSlideElement(index) {
      const slide = document.createElement("div");
      slide.className = styles.slide;

      if (state.isMobile) {
        slide.style.width = "175px";
        slide.style.height = "250px";
      }

      const imageContainer = document.createElement("div");
      imageContainer.className = styles.slideImage;

      const img = document.createElement("img");
      const dataIndex = index % totalSlideCount;
      img.src = sliderData[dataIndex].img;
      img.alt = sliderData[dataIndex].title;

      const overlay = document.createElement("div");
      overlay.className = styles.slideOverlay;

      const title = document.createElement("p");
      title.className = styles.projectTitle;
      title.textContent = sliderData[dataIndex].title;

      const arrow = document.createElement("div");
      arrow.className = styles.projectArrow;
      arrow.innerHTML = `
        <svg viewBox="0 0 24 24">
          <path d="M7 17L17 7M17 7H7M17 7V17"/>
        </svg>
      `;

      slide.addEventListener("click", (e) => {
        e.preventDefault();
        if (state.dragDistance < 10 && !state.hasActuallyDragged) {
          window.location.href = sliderData[dataIndex].url;
        }
      });

      overlay.appendChild(title);
      overlay.appendChild(arrow);
      imageContainer.appendChild(img);
      slide.appendChild(imageContainer);
      slide.appendChild(overlay);

      return slide;
    }

    function initializeSlides() {
      track.innerHTML = "";
      state.slides = [];

      checkMobile();
      state.slideWidth = state.isMobile ? 215 : 390;

      const copies = 6;
      const totalSlides = totalSlideCount * copies;

      for (let i = 0; i < totalSlides; i++) {
        const slide = createSlideElement(i);
        track.appendChild(slide);
        state.slides.push(slide);
      }

      const startOffset = -(totalSlideCount * state.slideWidth * 2);
      state.currentX = startOffset;
      state.targetX = startOffset;
    }

    function updateSlidePositions() {
      const sequenceWidth = state.slideWidth * totalSlideCount;

      if (state.currentX > -sequenceWidth * 1) {
        state.currentX -= sequenceWidth;
        state.targetX -= sequenceWidth;
      } else if (state.currentX < -sequenceWidth * 4) {
        state.currentX += sequenceWidth;
        state.targetX += sequenceWidth;
      }

      track.style.transform = `translate3d(${state.currentX}px, 0, 0)`;
    }

    function updateParallax() {
      const viewportCenter = window.innerWidth / 2;

      state.slides.forEach((slide) => {
        const img = slide.querySelector("img");
        if (!img) return;

        const rect = slide.getBoundingClientRect();

        if (rect.right < -500 || rect.left > window.innerWidth + 500) return;

        const slideCenter = rect.left + rect.width / 2;
        const distanceFromCenter = slideCenter - viewportCenter;
        const parallaxOffset = distanceFromCenter * -0.25;

        img.style.transform = `translateX(${parallaxOffset}px) scale(2.25)`;
      });
    }

    function updateMovingState() {
      state.velocity = Math.abs(state.currentX - state.lastCurrentX);
      state.lastCurrentX = state.currentX;

      const isSlowEnough = state.velocity < 0.1;
      const hasBeenStillLongEnough = Date.now() - state.lastScrollTime > 200;
      state.isMoving =
        state.hasActuallyDragged || !isSlowEnough || !hasBeenStillLongEnough;

      track.style.setProperty("--slider-moving", state.isMoving ? "1" : "0");
    }

    function animate() {
      state.currentX += (state.targetX - state.currentX) * config.LERP_FACTOR;
      updateMovingState();
      updateSlidePositions();
      updateParallax();
      requestAnimationFrame(animate);
    }

    function handleWheel(e) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      state.lastScrollTime = Date.now();

      const scrollDelta = e.deltaY * config.SCROLL_SPEED;
      state.targetX -= Math.max(
        Math.min(scrollDelta, config.MAX_VELOCITY),
        -config.MAX_VELOCITY
      );
    }

    function handleTouchStart(e) {
      state.isDragging = true;
      state.startX = e.touches[0].clientX;
      state.lastX = state.targetX;
      state.dragDistance = 0;
      state.hasActuallyDragged = false;
      state.lastScrollTime = Date.now();
    }

    function handleTouchMove(e) {
      if (!state.isDragging) return;

      const deltaX = (e.touches[0].clientX - state.startX) * 1.5;
      state.targetX = state.lastX + deltaX;
      state.dragDistance = Math.abs(deltaX);
      if (state.dragDistance > 5) state.hasActuallyDragged = true;
      state.lastScrollTime = Date.now();
    }

    function handleTouchEnd() {
      state.isDragging = false;
      setTimeout(() => (state.hasActuallyDragged = false), 100);
    }

    function handleMouseDown(e) {
      e.preventDefault();
      state.isDragging = true;
      state.startX = e.clientX;
      state.lastMouseX = e.clientX;
      state.lastX = state.targetX;
      state.dragDistance = 0;
      state.hasActuallyDragged = false;
      state.lastScrollTime = Date.now();
    }

    function handleMouseMove(e) {
      if (!state.isDragging) return;
      e.preventDefault();
      const deltaX = (e.clientX - state.lastMouseX) * 2;
      state.targetX += deltaX;
      state.lastMouseX = e.clientX;
      state.dragDistance += Math.abs(deltaX);
      if (state.dragDistance > 5) state.hasActuallyDragged = true;
      state.lastScrollTime = Date.now();
    }

    function handleMouseUp() {
      state.isDragging = false;
      setTimeout(() => (state.hasActuallyDragged = false), 100);
    }

    function handleResize() {
      initializeSlides();
    }

    const slider = track.parentElement;
    slider.addEventListener("wheel", handleWheel, { passive: false });
    slider.addEventListener("touchstart", handleTouchStart);
    slider.addEventListener("touchmove", handleTouchMove);
    slider.addEventListener("touchend", handleTouchEnd);
    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    initializeSlides();
    animate();

    return () => {
      slider.removeEventListener("wheel", handleWheel);
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
      slider.removeEventListener("touchend", handleTouchEnd);
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.slider}>
      <CustomCursor></CustomCursor>
      <h1 className="mt-20 mb-32 sm:mb-0">{t("slider")}</h1>
      <div className={styles.slideTrack} ref={trackRef}></div>
    </div>
  );
}
