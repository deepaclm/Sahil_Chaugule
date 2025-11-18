// src/components/StickyCards.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; 
import { getGalleryData } from "../data/galleryData.js"; 
import styles from "./StickyCards.module.css";

import CustomCursor from "./CustomCursor.jsx";

const StickyCards = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation(); 
  const stickyCardsData = getGalleryData(t); 

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const cards = gsap.utils.toArray(`.${styles.stickyCard}`);

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: index === cards.length - 1 ? "bottom top" : "bottom top",
        pin: true,
        pinSpacing: false,
      });

      if (index < cards.length - 1) {
        ScrollTrigger.create({
          trigger: cards[index + 1],
          start: "top bottom",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 1 - progress * 0.25;
            const rotation = (index % 2 === 0 ? 5 : -5) * progress;
            const afterOpacity = progress;
            gsap.set(card, { scale, rotation, "--after-opacity": afterOpacity });
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  const handleCardClick = (card) => {
    navigate(`/work/${card.id}`);
  };

  return (
    <div className={styles.wrapper}>
      
      <section className={styles.intro} data-theme="light">

  <h3 className={styles.heading}>
    आमच्या ध्येयाला तुमच्या जवळ  
    <br />
    आणणाऱ्या कथा आणि क्षण.
  </h3>

  {/* STACKED IMAGES */}
  <div className="relative mt-12 w-[200px] h-[200px] mx-auto
                  sm:w-[280px] sm:h-[250px]
                  md:w-[320px] md:h-[280px]">

    <img
      src="/preloader-img4.jpg"
      alt=""
      className="absolute top-0 left-0 
                 w-[180px] sm:w-[200px] md:w-[230px]
                 shadow-xl rotate-6"
    />

    <img
      src="/preloader-img2.jpg"
      alt=""
      className="absolute top-0 left-0
                 w-[180px] sm:w-[200px] md:w-[230px]
                 shadow-xl rotate-7 
                 translate-x-[16px] translate-y-[10px]
                 sm:translate-x-[20px] sm:translate-y-[14px]
                 md:translate-x-[26px] md:translate-y-[18px]"
    />

    <img
      src="/preloader-img3.jpg"
      alt=""
      className="absolute top-0 left-0
                 w-[180px] sm:w-[200px] md:w-[230px]
                 shadow-xl -rotate-3 
                 translate-x-[28px] translate-y-[18px]
                 sm:translate-x-[34px] sm:translate-y-[22px]
                 md:translate-x-[40px] md:translate-y-[26px]"
    />
  </div>

  {/* TITLE IMAGE */}
  <div className="mt-6 flex justify-center">
    <img
      src="/gallery_title_mr.png"
      alt=""
      className="
        w-[240px] sm:w-[280px] md:w-[320px] 
        opacity-95
      "
    />
  </div>

</section>


        



      <div className={styles.stickyCards} ref={containerRef}>
        <CustomCursor></CustomCursor>
        
        {stickyCardsData.map((card, i) => (
          <div
            key={i}
            className={styles.stickyCard}
            onClick={() => handleCardClick(card)}
            style={{ cursor: "pointer" }}
          >




            <div className={styles.stickyCardIndex}>
              <h1 className={styles.cardIndexNumber}>{card.index}</h1>
            </div>
          

            <div className={styles.stickyCardContent}>
              <div className={styles.stickyCardContentWrapper}>
                <div className={styles.stickyCardImg}>
                  <img src={card.image} alt={card.title} />
                </div>
                

                

                <div className={styles.stickyCardCopy}>
                  <div className={styles.stickyCardCopyTitle}>
                    
                  </div>
                  <div className={styles.stickyCardCopyDescription}>
                    <h1 className={styles.stickyCardHeader}>{card.title}</h1>
                    <p>{card.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className={styles.outro} data-theme="dark">
        <h1 className={styles.heading}>{t("gallery.end_title")}</h1>
      </section>
    </div>
  );
};

export default StickyCards;
