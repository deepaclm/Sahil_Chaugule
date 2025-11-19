import React from "react";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-col overflow-hidden">

 

      {/* HERO SECTION */}
    <section className="relative w-full flex flex-col items-center pt-20 pb-20 bg-white overflow-hidden">

  {/* GRID LINES (100% visible now) */}
  <div className="absolute inset-0 flex justify-between pointer-events-none z-1">
  {/* Visible everywhere */}
  <div className="w-[1px] bg-gray-300/60"></div>
  <div className="w-[1px] bg-gray-300/60 hidden sm:block"></div>

  <div className="w-[1px] bg-gray-300/60"></div>
  <div className="w-[1px] bg-gray-300/60 hidden sm:block"></div>

  <div className="w-[1px] bg-gray-300/60"></div>
  <div className="w-[1px] bg-gray-300/60 hidden sm:block"></div>

  <div className="w-[1px] bg-gray-300/60"></div>
  <div className="w-[1px] bg-gray-300/60 hidden sm:block"></div>

  <div className="w-[1px] bg-gray-300/60"></div>
  <div className="w-[1px] bg-gray-300/60 hidden sm:block"></div>
</div>


  {/* IMAGE ABOVE LINES */}
  <img
    src={t("about.hero")}
    alt=""
    className="w-[80vw] sm:w-[30vw] max-w-[90vw] sm:max-w-[30vw] relative z-5"
  />

</section>



 {/* WRAPPER — holds both sections + vertical line */}
<div className="relative w-full">

  {/* FULL HEIGHT VERTICAL LINE */}
  <div
    className="
      absolute right-2 sm:right-48 top-0
      w-[2px] h-full
      bg-gray-300
      -z-50
      opacity-50
      hidden sm:block
    "
  ></div>

  {/* SECTION 2 */}
  <section className="relative w-full flex flex-col items-center py-20 px-6">

    {/* top-right halo */}
    <div
      className="absolute top-0 right-0 w-[100px] sm:w-[300px] h-[100px] sm:h-[300px]
      bg-orange-400 rounded-full blur-[20px] opacity-40 -z-10"
    ></div>

    {/* top-right image */}
    <div className="absolute right-4 top-4 w-[30vw] max-w-[250px] overflow-hidden z-10">
      <img
        src="/top-right-about.png"
        alt="Section 2 top"
        className="w-full h-full object-contain z-10"
      />
    </div>

    {/* text */}
    <div className="w-full max-w-6xl flex flex-col items-center text-center my-4 pr-0  sm:pr-32">
      <h2 className="text-3xl sm:text-6xl font-serif text-orange-600 leading-none">
        A  
        <span className="text-gray-800 text-2xl sm:text-5xl leading-none ">
          {t("about.section1")}
        </span>
      </h2>

      {/* left small image */}
      <div className="relative w-full flex justify-start">
        <div className="w-[35vw] max-w-[180px] overflow-hidden">
          <div
            className="absolute top-0 w-[100px] sm:w-[200px] h-[100px] sm:h-[200px]
            bg-orange-400 rounded-full blur-[20px] opacity-40 -z-10"
          ></div>

          <img
            src="/slider_img_08.png"
            alt="small"
            className="w-full h-full object-contain z-10"
          />
        </div>
      </div>
    </div>
  </section>

  {/* SECTION 3: WHAT I DO */}
  <section className="w-full grid grid-cols-1 lg:grid-cols-5 px-6 md:px-12 py-20 gap-10 items-start ">
    <div
  className="
    absolute left-0 right-0 top-2/5 sm:bottom-[1050px]
    h-[2px] w-full
    bg-gray-300
    -z-50
    opacity-50
    hidden sm:block
  "
></div>



    {/* left text */}
    <div className="lg:col-span-3 flex flex-col gap-8 justify-between max-w-full">
      <h1
        className="
          text-left
          text-[8vw] sm:text-4xl md:text-5xl lg:text-6xl
          leading-tight font-serif
        "
      >
        {t("about.whatido")}
      </h1>

      <div
        className="
          text-right text-gray-700 ml-auto font-serif
          leading-snug
          text-[5vw] sm:text-2xl md:text-3xl lg:text-[2.5vw]
          max-w-[650px]
          
        "
      >
        {t("about.section2")}
      </div>
    </div>

    {/* right image */}
    <div className="lg:col-span-2 w-full flex flex-col items-center">
      <img
        src="/about_shinde.jpg"
        alt="What I Do"
        className="w-full rounded-3xl object-cover"
      />
      <div className="text-center mt-4 text-sm sm:text-base md:text-lg lg:text-2xl font-serif">
       {t("about.hero_subtitle")}
      </div>
    </div>
  </section>






      {/* SECTION 4: INSTAGRAM VIDEOS */}
      <section className="w-full flex flex-col items-center py-20 px-6 lg:pl-4 lg:pr-64">

  <div className="
    w-full max-w-6xl
    grid 
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-6
    lg:w-[80%]
  ">

    <video
      src="/videos/video1.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="
        w-full h-full
        aspect-[9/16]
        object-cover object-center
        rounded-2xl bg-transparent
        cursor-auto
        transition-transform duration-300 ease-in-out
        hover:scale-[1.02] hover:shadow-xl
      "
    />

    <video
      src="/videos/video2.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="
        w-full h-full
        aspect-[9/16]
        object-cover object-center
        rounded-2xl bg-transparent
        cursor-auto
        transition-transform duration-300 ease-in-out
        hover:scale-[1.02] hover:shadow-xl
      "
    />

    <video
      src="/videos/video3.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="
        w-full h-full
        aspect-[9/16]
        object-cover object-center
        rounded-2xl bg-transparent
        cursor-auto
        transition-transform duration-300 ease-in-out
        hover:scale-[1.02] hover:shadow-xl
      "
    />

  </div>

</section>
</div>

    </div>
  );
}