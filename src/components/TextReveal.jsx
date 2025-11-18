import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GraphemeSplitter from "grapheme-splitter";



gsap.registerPlugin(SplitText, ScrollTrigger);

const TextReveal = ({ children, animateOnScroll = true, delay = 0 }) => {
  const containerRef = useRef(null);
  const splitInstance = useRef(null);
  const splitter = new GraphemeSplitter();

const letters = splitter.splitGraphemes(children.props.children);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Split lines
    const split = new SplitText(element, {
      type: "lines",
      linesClass: "line",
    });
    splitInstance.current = split;

    gsap.set(split.lines, { yPercent: 100, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: animateOnScroll
        ? {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        : undefined,
    });

    tl.to(split.lines, {
      yPercent: 0,
      opacity: 1,
      duration: 2,
      ease: "power4.out",
      stagger: 0.08,
      delay: delay,
    });

    // Cleanup
    return () => {
      tl.kill();
      if (splitInstance.current) splitInstance.current.revert();
    };
  }, [animateOnScroll, delay]);

  return React.cloneElement(children, { ref: containerRef });
};

export default TextReveal;
