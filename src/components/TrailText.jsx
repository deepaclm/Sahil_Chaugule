import { useEffect, useRef, useState } from "react";
import { useTrail, animated } from "@react-spring/web";
import GraphemeSplitter from "grapheme-splitter";

const splitter = new GraphemeSplitter();

const TrailText = ({
  text = "",
  className = "",
  delay = 50,
  animationFrom = { opacity: 0, transform: "translate3d(0, 30px, 0)" },
  animationTo = { opacity: 1, transform: "translate3d(0, 0, 0)" },
  config = { tension: 170, friction: 26 },
  threshold = 0.1,
  rootMargin = "0px",
  textAlign = "left",
  renderLetter,
  onTrailComplete,
}) => {
  const characters = splitter.splitGraphemes(text); // ✅ use grapheme splitting
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setInView(true);
          hasAnimated.current = true;
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const trail = useTrail(characters.length, {
    from: animationFrom,
    to: inView ? animationTo : animationFrom,
    config,
  });

  useEffect(() => {
    if (inView && typeof onTrailComplete === "function") {
      const timeout = setTimeout(onTrailComplete, delay * characters.length + 300);
      return () => clearTimeout(timeout);
    }
  }, [inView, delay, characters.length, onTrailComplete]);

  return (
    <p
      ref={ref}
      className={`trail-text ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {trail.map((style, index) =>
        typeof renderLetter === "function" ? (
          renderLetter(characters[index], index, style)
        ) : (
          <animated.span
            key={index}
            style={{
              ...style,
              display: "inline-block",
              willChange: "transform, opacity",
              marginRight: characters[index] === " " ? "0.25em" : undefined,
            }}
          >
            {characters[index] === " " ? "\u00A0" : characters[index]}
          </animated.span>
        )
      )}
    </p>
  );
};

export default TrailText;
