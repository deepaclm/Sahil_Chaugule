import { useSprings, animated, easings } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

  import GraphemeSplitter from "grapheme-splitter";


/**
 * SplitText Component — fully modular animated text splitter
 * 
 * Features:
 * - Inherits font styles from parent element
 * - Works with any tag (wrap inside h1, p, span, etc.)
 * - Uses IntersectionObserver to trigger animation when visible
 * - Supports custom delays, animations, and callbacks
 */
const SplitText = ({
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = easings.easeOutCubic,
  threshold = 0.1,
  rootMargin = "-100px",
  boldLetters = [], // can be letter(s) or index(es)
  onLetterAnimationComplete,
}) => {
  // const words = text.split(" ").map((word) => word.split(""));
  // const letters = words.flat();
const splitter = new GraphemeSplitter();
const words = text.split(" ").map((word) => splitter.splitGraphemes(word));
const letters = words.flat();

  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const animatedCount = useRef(0);

  // ✅ Watch visibility using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // ✅ Animate each letter
  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: async (next) => {
        if (inView) {
          await next(animationTo);
          animatedCount.current += 1;
          if (
            animatedCount.current === letters.length &&
            onLetterAnimationComplete
          ) {
            onLetterAnimationComplete();
          }
        }
      },
      delay: i * delay,
      config: { easing },
    }))
  );

  // ✅ Render animated letters
  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        overflow: "hidden",
        whiteSpace: "normal",
        wordWrap: "break-word",
        verticalAlign: "baseline",
      }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.map((letter, letterIndex) => {
            const index =
              words
                .slice(0, wordIndex)
                .reduce((acc, w) => acc + w.length, 0) + letterIndex;

            const shouldBold =
              boldLetters.includes(letter.toLowerCase()) ||
              boldLetters.includes(index);

            return (
              <animated.span
                key={index}
                style={{
                  ...springs[index],
                  display: "inline-block",
                  willChange: "transform, opacity",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: "inherit",
                  lineHeight: "inherit",
                }}
              >
                {shouldBold ? <b>{letter}</b> : letter}
              </animated.span>
            );
          })}
          <span style={{ display: "inline-block", width: "0.3em" }}>
            &nbsp;
          </span>
        </span>
      ))}
    </span>
  );
};

export default SplitText;
