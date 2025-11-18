import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SplitText from "../components/SplitText";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
     window.scrollTo(0, 0);
  })

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbw1S6fuuDT_6dRuNDTA8X3dSyY0tUKNb_OSUfz085CjF_E_Uk7MvHwu9mlqJqsWdhtCVw/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const formData = new FormData(e.target);

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      setSubmitted(true);
      e.target.reset();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#fff] text-black py-16 px-4 sm:px-6 lg:px-10" data-theme="light">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch mt-10 sm:mt-16">
        
        {/* Left Section */}
        <div className="flex flex-col justify-between rounded-2xl overflow-hidden">

          <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-start flex-1">
            <SplitText
              text={t("contact.title")}
              className="
                mb-10 sm:mb-16
                mt-0
                justify-center
                ml-6 sm:ml-0
                text-5xl sm:text-7xl md:text-8xl
                font-zentry leading-normal font-extrabold special-font text-black
                transition-all duration-500 ease-in-out
                hover:tracking-wider hover:scale-y-105 hover:drop-shadow-sm
              "
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

            <div className="space-y-8 mb-10 sm:mb-24">
              
              {/* Address */}
              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border border-gray-500 rounded-xl text-xl sm:text-2xl bg-white-800/50 group-hover:border-orange-400 transition-all duration-300">
                  <FaLocationDot />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm uppercase text-gray-900 font-semibold">
                    {t("contact.address_label")}
                  </span>
                  <a
                    href="https://goo.gl/maps/mumbai"
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg sm:text-xl font-bold text-gray-900 hover:text-orange-400 transition-colors duration-300 break-words"
                  >
                    {t("contact.address")}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border border-gray-500 rounded-xl text-xl sm:text-2xl bg-white-800/50 group-hover:border-orange-400 transition-all duration-300">
                  <FaPhone />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm uppercase text-gray-900 font-semibold">
                    {t("contact.phone_label")}
                  </span>
                  <a
                    href="tel:+91234567823"
                    className="text-lg sm:text-xl font-bold text-gray-900 hover:text-orange-400 transition-colors duration-300 break-words"
                  >
                    +91 2345678765
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 sm:gap-5 group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center border border-gray-500 rounded-xl text-xl sm:text-2xl bg-white-800/50 group-hover:border-orange-400 transition-all duration-300">
                  <MdEmail />
                </div>
                <div>
                  <span className="block text-xs sm:text-sm uppercase text-gray-900 font-semibold">
                    {t("contact.email_label")}
                  </span>
                  <a
                    href="mailto:info@example.com"
                    className="text-lg sm:text-xl font-bold text-gray-900 hover:text-orange-400 transition-colors duration-300 break-words"
                  >
                    info@example.com
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="bg-[#fff] p-5 sm:p-8 border border-2 rounded-2xl shadow-lg flex flex-col justify-center">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-2">
            {t("contact.form_title")}
          </h3>
          <p className="text-gray-900 mb-6 text-sm sm:text-base md:text-lg">
            {t("contact.form_description")}
          </p>

          {submitted ? (
            <p className="text-green-500 text-sm sm:text-base">{t("contact.form_success")}</p>
          ) : (
            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className="mb-4">
                <label className="block mb-2 text-sm text-black">{t("contact.form_name")}</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full p-3 border border-black border-2 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="block mb-2 text-sm text-black">{t("contact.form_phone")}</label>
                <input
                  type="text"
                  name="phone"
                  required
                  className="w-full p-3 border border-black border-2 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-2 text-sm text-black">{t("contact.form_email")}</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-3 border border-black border-2 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block mb-2 text-sm text-black">{t("contact.form_address")}</label>
                <textarea
                  name="address"
                  rows="3"
                  required
                  className="w-full p-3 border border-black border-2 rounded-lg focus:outline-none focus:border-orange-500"
                ></textarea>
              </div>

              {/* Complaint Type */}
              <div className="relative mb-6">
                <label className="block mb-2 text-sm text-black">{t("contact.form_type")}</label>

                <div className="relative">
                  <select
                    name="type"
                    required
                    className="
                      w-full p-3 pr-10 rounded-lg border
                      bg-white text-black
                      border-black border-2
                      focus:outline-none focus:border-orange-400
                      hover:border-gray-900
                    "
                  >
                    <option value="">{`-- ${t("contact.form_type")} --`}</option>
                    <option value={t("contact.form_type_options.roads")}>
                      {t("contact.form_type_options.roads")}
                    </option>
                    <option value={t("contact.form_type_options.electricity")}>
                      {t("contact.form_type_options.electricity")}
                    </option>
                    <option value={t("contact.form_type_options.water")}>
                      {t("contact.form_type_options.water")}
                    </option>
                    <option value={t("contact.form_type_options.health")}>
                      {t("contact.form_type_options.health")}
                    </option>
                    <option value={t("contact.form_type_options.other")}>
                      {t("contact.form_type_options.other")}
                    </option>
                  </select>

                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-900 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Complaint */}
              <div className="mb-6">
                <label className="block mb-2 text-sm text-black">{t("contact.form_complaint")}</label>
                <textarea
                  name="complaint"
                  rows="4"
                  required
                  className="w-full p-3 border border-black border-2 rounded-lg focus:outline-none focus:border-orange-500"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full py-3 rounded-lg font-semibold transition-all duration-200
                  flex items-center justify-center text-sm sm:text-base
                  ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}
                `}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    {t("contact.form_submitting") || "Submitting..."}
                  </>
                ) : (
                  t("contact.form_submit")
                )}
              </button>
            </form>
          )}

          {error && <p className="text-red-500 mt-4 text-sm sm:text-base">{t("contact.form_error")}</p>}
        </div>
      </div>
    </section>

  );
}
