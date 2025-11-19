import { useTranslation } from "react-i18next";
import Preloader from "../components/Preloader.jsx";
import MarqueeScroll from "../components/MarqueeScroll.jsx";
import PhiveTextScroll from "../components/PhiveTextScroll.jsx";
import HorizontalScroll from "../components/HorizontalScroll.jsx";
import useIsMobile from "../hooks/useIsMobile.js";
import Testimonials from "../components/Testimonails.jsx";
import MobilePhiveScroll from "../components/MobilePhiveScroll.jsx";
import Slider from "../components/Slider.jsx"

export default function Home() {
  const { t } = useTranslation();
  const isMobile = useIsMobile(768); // true if screen width ≤ 768px

  return (
    <>
      {/* <section><Preloader /></section> */}


      {/* ---------------------- Politician Section ---------------------- */}

      {isMobile ?
       <section className="w-full pt-16 px-0 bg-gray-50 " data-theme="light"  style={{
    backgroundImage: `
      linear-gradient(#d7dccf 0.2px, transparent 0.8px),
      linear-gradient(90deg, #d7dccf 0.2px, transparent 0.8px)
    `,
    backgroundSize: "60px 60px"
  }}>
  <div className="max-w-9xl mx-auto">

    {/* MAIN CONTENT */}
    <div className="flex flex-col lg:flex-row w-full">

      {/* LEFT SECTION — 100vh */}
      <div className="w-full lg:w-2/3 h-[85vh] flex flex-col relative z-10">

        {/* HEADER */}
        

        {/* GRADIENT SECTIONs */}
        <div className="relative flex-1 overflow-hidden h-[80vh]">

          {/* Background */}
          <img
            src="/crowd.png"
            alt="Crowd gathering"
            className="w-full h-full object-cover opacity-60"
          />

          {/* GRADIENT TEXT */}
          <div className="absolute inset-0 bg-gradient-to-r from-black to-black/80 flex-col items-center justify-center sm:items-end p-0 sm:p-6">
            <h1 className="font-serif text-white text-4xl mt-8 ml-12">{t("hero_line1")}</h1>
            <h1 className="font-serif text-white text-4xl mt-4 ml-12">{t("hero_line2")}</h1>
            <h1 className="font-serif text-white text-4xl mt-4 ml-12">{t("hero_line3")}</h1>
          </div>

          {/* MOBILE ONLY IMAGE — same parent as gradient */}
          <img
            src="/mobile_home.png"
            alt="Main overlay"
            className="
              absolute
              bottom-0
              left-1/2
              -translate-x-1/2
              h-[40vh]            /* 50% of the 100vh gradient container */
              max-h-[250px]       /* safety cap for large phones */
              w-auto
              object-contain
              overflow-visible
              z-20
              block sm:hidden     /* ONLY visible on mobile */
            "
          />
        </div>
      </div>

    </div>

  </div>
</section>

: 
<section className="w-full pt-16 pb-8 pl-8 bg-gray-50" data-theme="light"  style={{
    backgroundImage: `
      linear-gradient(#d7dccf 0.2px, transparent 0.8px),
      linear-gradient(90deg, #d7dccf 0.2px, transparent 0.8px)
    `,
    backgroundSize: "60px 60px"
  }}>
  <div className="max-w-9xl mx-auto">

    {/* MAIN CONTENT */}
    <div className="flex flex-col lg:flex-row w-full">

      {/* LEFT SECTION — full 90vh */}
      <div className="w-full lg:w-2/3 h-[100vh] flex flex-col relative z-10">

        {/* HEADER on left */}
        <div className="p-4 mb-4">
          <img 
            src={t("hero_sahil")}
            alt="" 
            className="max-w-[200px] sm:max-w-[400px] w-full"
          />
        </div>

        {/* GRADIENT SECTION fills remaining height */}
        <div className="relative flex-1 overflow-hidden rounded-xl">

          {/* Background */}
          <img
            src="/crowd.png"
            alt="Crowd gathering"
            className="w-full h-full object-cover opacity-90"
          />

          {/* TEXT IMG — adjustable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black to-black/70 flex items-center sm:items-end p-0 sm:p-6">
            <img
              src={t("hero_text")}
              alt="text"
              className="max-w-[100px] sm:max-w-[700px] h-auto w-full"
            />
          </div>

        </div>
      </div>

      {/* RIGHT SECTION — full 90vh */}
     <div className="w-full lg:w-1/3 h-[100vh] relative overflow-visible">

  {/* MAIN overlay image — adjustable size */}
  <img
    src="/header_img2.png"
    alt="Main overlay"
    className="
      absolute
      top-0 
      right-[40px]
      h-[200px]         /* ← adjust height */
      w-auto           /* ← keeps proportionsi */
      object-contain
      overflow-visible
      z-20
    "
  />

  {/* SECOND overlay image — adjustable size */}
  <img
    src="/header_img1.png"
    alt="Secondary overlay"
    className="
      absolute
      top-0
      px-32 pt-40
      right-[40%]       /* ← adjustable height */
      object-contain
      overflow-visible
      z-30
    "
  />

</div>

    </div>

  </div>
</section>
}
     




      {/* ---------------------- Maharashtra Section ---------------------- */}
{/* ====================== SECTION 1 ====================== */}
<section className="w-full pt-4 md:px-8 lg:px-16 bg-white relative">

  <div className="max-w-screen-xl mx-auto relative z-10">

    {/* BACKGROUND VERTICAL LINES */}
    <div className="absolute inset-0 z-0 pointer-events-none flex justify-between px-0">

  {/* Line 1 — always visible */}
  <div className="w-[1px] bg-gray-300 hidden sm:block"></div>

  {/* Line 2 — always visible */}
  <div className="w-[1px] bg-gray-300 hidden sm:block"></div>

  {/* Line 3 — always visible */}
  <div className="w-[1px] bg-gray-300 hidden sm:block"></div>

  {/* Line 4 — visible only on sm+ */}
  <div className="w-[1px] bg-gray-300 hidden sm:block "></div>

  {/* Line 5 — visible only on sm+ */}
  <div className="w-[1px] bg-gray-300 hidden sm:block"></div>

</div>


    {/* TOP SECTION */}
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

      <div className="flex-1 text-center relative">

        {/* HALF-SIZE RECTANGLE BEHIND IMAGE */}
        <div
          className="
            absolute
            top-1/2 left-1/2
            -translate-x-5/10 -translate-y-1/5
            w-[60%]
            h-[50%]
            border border-black rounded-2xl
            z-0
          "
        ></div>

        {/* JAI MAHARASHTRA IMAGE */}
        <img
          src={t("jai_maharashtra_text")}
          alt=""
          className="max-w-[600px] mx-auto relative z-10 p-2"
        />

      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col mb-4">
          <img
            src={t("hero_sahil")}
            alt=""
            className="max-w-[150px] sm:max-w-[300px] w-full"
          />
        </div>
      </div>

    </div>

    {/* CENTER IMAGE — ORANGE HALO */}
    <div className="mb-8 flex justify-center relative">

      <div
        className="
          absolute
          top-1/2 left-1/2
          -translate-x-5/5 -translate-y-1/5
          w-[30vw] 
          h-[25vw]
          bg-orange-500
          rounded-full
          blur-[30px]
          opacity-60
          z-0
        "
      ></div>

      <div className="w-[90vw] sm:w-[50vw] border-4 border-black rounded-lg overflow-hidden relative z-10">
        <img
          src="/shinde.jpg"
          alt="Maharashtra leadership"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* TEXT ROWS */}
    <div className="flex flex-col md:flex-row gap-16 px-4 md:px-8 w-full max-h-screen mt-12">

      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col gap-4 w-full min-w-0">
        <div
          className="
            break-words whitespace-pre-wrap leading-tight text-gray-700 font-medium
            text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-serif
          "
        >
          {t("marquee.description1")}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col gap-4 w-full min-w-0">
        <div
          className="
            break-words whitespace-pre-wrap leading-tight text-gray-700 font-medium
            text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl font-serif
          "
        >
          {t("marquee.description2")}
        </div>
      </div>

    </div>

  </div>
</section>



{/* ====================== SECTION 2 (GALLERY) — perfectly aligned ====================== */}
<section className="relative w-full px-4 md:px-8 lg:px-16 bg-white overflow-hidden">

  <div className="max-w-screen-xl mx-auto relative">

    {/* GRID LINES */}
    <div className="absolute inset-0 z-0 pointer-events-none flex justify-between px-0">
      <div className="w-[1px] bg-transparent"></div>
      <div className="w-[1px] bg-transparent"></div>
      <div className="w-[1px] bg-transparent hidden sm:block"></div>
      <div className="w-[1px] bg-gray-300 hidden sm:block"></div>
      <div className="w-[1px] bg-gray-300 hidden sm:block"></div>
    </div>

    {/* CONTENT */}
    <div className="relative z-20">

      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-0 lg:gap-12">

        {/* LEFT COLUMN */}
        <div className="w-full lg:w-1/5 flex flex-col gap-4 justify-between pt-10 lg:pt-16">

          <div className="
            w-20 h-32 
            max-sm:w-16 max-sm:h-24 
            overflow-hidden border-2 border-black
          ">
            <img src="/slider_img_06.jpg" alt="" className="w-full h-full object-contain block" />
          </div>

          <div className="
            w-[200px] h-64
            max-sm:w-[140px] max-sm:h-44 
            overflow-hidden border-2 border-black
          ">
            <img src="/home2.jpg" alt="" className="w-full h-full object-contain block" />
          </div>

        </div>

        {/* CENTER COLUMN */}
        {/* CENTER COLUMN */}
<div className="
  w-full lg:w-3/5 
  flex items-start justify-between text-center 
  relative overflow-visible 
  h-[30vh] sm:h-[45vh] lg:h-[50vh] 
 sm:mt-12 lg:mt-16
">

  {/* BACKGROUND LOGO */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 py-4 overflow-visible sm:p-0">
    <img
      src="/jai_maharashtra.png"
      alt=""
      className="
        max-w-full 
        h-auto 
        object-contain 
        opacity-10
      "
    />
  </div>

  {/* TEXT */}
  <div className="relative w-full z-20 flex items-center justify-center 
                  mt-0 sm:mt-24 md:mt-28 lg:mt-32 px-2 sm:px-0">

    {/* BIG २ BEHIND TEXT */}
    <div className="
      hidden md:block 
      text-7xl md:text-9xl 
      font-bold text-gray-200 
      absolute 
      -top-6 md:-top-10 -left-4 
      opacity-30 select-none
    ">
      २
    </div>

    <h2 className="
      mt-4 
      
      pt-18
      sm:pt-0
      text-base sm:text-lg md:text-2xl lg:text-4xl 
      font-medium text-gray-900 leading-relaxed 
      relative z-20 px-2 sm:px-0
      font-serif
    ">
      {t("hero2")}
    </h2>

  </div>
</div>


        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-2/5 flex flex-col gap-4 pt-10 lg:pt-16 pr-4 lg:mr-2">

          {/* ROW 1 */}
          <div className="
            flex gap-4 sm:gap-6 
            w-full overflow-hidden 
            h-[150px] sm:h-[200px] 
            justify-start items-end
          ">
            <div className="
              w-[60%] bg-gray-400 h-full pl-1 sm:pl-2 pt-2 sm:pt-3
            ">
              <img src="/home1.jpg" alt="" className="w-full h-full object-cover block border-2" />
            </div>

            <div className="
              w-16 h-24 sm:w-22 sm:h-32 
              overflow-hidden border-2 border-black
            ">
              <img src="/home6.jpg" alt="" className="w-full h-full object-contain block" />
            </div>
          </div>

          {/* ROW 2 */}
          <div className="flex gap-4">
            <div className="flex-1 overflow-hidden border-[8px] sm:border-[15px] border-orange-400 h-[40px]sm:h-[80px]"></div>

            <div className="flex-1 bg-orange-400 flex items-center justify-center h-[40px] sm:h-[80px]">
              <div className="w-3/5 h-3/5 border-2 border-orange-600 rounded-lg opacity-50"></div>
            </div>
          </div>

          {/* ROW 3 */}
          <div className="flex gap-4 items-end">
            <img
  src="/home5.jpg"
  alt="right-1"
  className="
    object-cover block border-2 border-black bg-gray-300 p-2
    w-[120px] h-[170px]
    sm:w-[150px] sm:h-[220px]
    md:w-[180px] md:h-[260px]
    lg:w-[200px] lg:h-[300px]
  "
/>

          </div>

        </div>

      </div>

    </div>

  </div>
</section>



<section className="relative max-w-7xl mx-auto px-6 py-10 md:py-20">

  {/* Vertical lines (mobile-friendly positions) */}
  <div className="absolute top-0 bottom-0 left-10 md:left-20 w-[1px] bg-gray-300 hidden sm:block -z-10"></div>
  <div className="absolute top-0 bottom-0 left-32 md:left-60 w-[1px] bg-gray-300 hidden sm:block -z-10"></div>

  <div className="flex flex-col md:flex-row">

    {/* LEFT COLUMN */}
    <div
      className="
        flex flex-col justify-between 
        text-sm md:text-base font-normal text-black
        w-full md:w-1/3 
        pr-4 md:pr-4 
      "
    >
      <div className="self-start text-xl md:text-2xl font-normal font-serif">
        {t("nav.name")}
      </div>

      <div className="mt-6 md:mt-0">

        <h2 className="
          text-xl sm:text-2xl md:text-3xl 
          mb-10 md:mb-64 
          ml-6 md:ml-6 font-serif
        ">
          {t("farmers")}
        </h2>

        <h2 className="
          text-xl sm:text-2xl md:text-3xl 
          ml-0 md:ml-6 font-serif
        ">
          {t("youth")}
        </h2>

      </div>
    </div>

    {/* RIGHT COLUMN */}
    <div className="flex flex-col flex-1 mt-10 md:mt-0">

      {/* HEADING ABOVE IMAGE */}
      <div className="space-y-1 leading-tight text-right">

        <h2 className="
          text-4xl sm:text-5xl md:text-7xl lg:text-9xl 
          font-black leading-[1.1]
        ">
          {t("hero_line1")}
        </h2>

        <h2 className="
          text-4xl sm:text-5xl md:text-7xl lg:text-9xl 
          font-black leading-[1.1]
        ">
          {t("hero_line2")}
        </h2>
      </div>

      {/* IMAGE */}
      <div className="mt-6 md:mt-10 flex items-center justify-end">
        <img
          src="/contact.png"
          alt=""
          className="
            w-[80%] sm:w-[70%] 
            max-w-[260px] sm:max-w-[340px] 
            md:max-w-[600px] lg:max-w-[700px]
            object-contain
          "
        />
      </div>

    </div>

  </div>
</section>










    </>
  );
}
