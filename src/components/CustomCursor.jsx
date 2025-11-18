"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useMousePosition from "../utils/useMousePosition";
import useIsMobile from "../hooks/useIsMobile"; // ✅ import the hook
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile(); // ✅ check if mobile

  const size = isHovered ? 120 : 40;

  useEffect(() => {
    if (isMobile) return; // ✅ disable events on mobile

    const targets = document.querySelectorAll(".hover-target");
    const handleEnter = () => setIsHovered(true);
    const handleLeave = () => setIsHovered(false);

    targets.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [isMobile]);

  // ✅ Do not render cursor at all on mobile
  if (isMobile) return null;

  return (
    <motion.div
      className={`${styles.cursor} fixed pointer-events-none z-[9999]`}
      animate={{
        x: x - size / 2,
        y: y - size / 2,
        width: size,
        height: size,
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    />
  );
}
