// src/components/Work.jsx
"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ import translation
import { getGalleryData } from "../data/galleryData.js"; // ✅ import dynamic data
import styles from "./Work.module.css";
import CustomCursor from "./CustomCursor.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const workContainerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const galleryData = getGalleryData(t); // ✅ get translated data
  const sectionData = galleryData.find((item) => item.id === id);
  const projects = sectionData?.projects || [];

  useEffect(() => {
    // Temporarily disable Lenis or GSAP scroll smoothing if any
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 100);

    return () => clearTimeout(timeout);
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    if (!projects.length) return;
    const ctx = gsap.context(() => {
      gsap.set(`.${styles.workItem}`, { y: 1000 });

      const rows = gsap.utils.toArray(`.${styles.row}`);
      rows.forEach((row) => {
        const items = row.querySelectorAll(`.${styles.workItem}`);
        items.forEach((item, idx) => {
          gsap.set(item, {
            rotation: idx === 0 ? -60 : 60,
            transformOrigin: "center center",
          });
        });

        ScrollTrigger.create({
          trigger: row,
          start: "top 70%",
          onEnter: () => {
            gsap.to(items, {
              y: 0,
              rotation: 0,
              duration: 1,
              ease: "power4.out",
              stagger: 0.2,
            });
          },
        });
      });
    }, workContainerRef);

    return () => ctx.revert();
  }, [projects]);

  if (!projects.length) {
    return (
      <div className={styles.error}>
        <p>{t("gallery.no_project_data")}</p>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          ← {t("gallery.back_button")}
        </button>
      </div>
    );
  }

  const groupedProjects = [];
  for (let i = 0; i < projects.length; i += 2) {
    groupedProjects.push(projects.slice(i, i + 2));
  }

  return (
    <section className={styles.work} ref={workContainerRef} data-theme="light">
      <CustomCursor/>
      
      <div className={styles.workHeader}>
       
        {/* ✅ Added scroll-target to main text */}
        <h1 className="scroll-target">{sectionData.title}</h1>
        <p className="scroll-target">{sectionData.description}</p>
      </div>

    <div className={styles.carouselWrapper}>
  <div className={styles.carouselTrack}>
    {projects.concat(projects).map((project, i) => (
      <div key={i} className={styles.carouselItem + " scroll-target"}>
        <img src={project.img} alt={project.name} />
      </div>
    ))}
  </div>
</div>



      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        ← {t("gallery.back_to_gallery")}
      </button>
    </section>
  );
}
