"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "../styles/ScrollTextImageEffect.module.css";

export default function ScrollTextImageEffect() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Text animations
  const leftTextX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8],
    ["0%", "-20%", "-60%", "-100%"]
  );

  const rightTextX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8],
    ["0%", "20%", "60%", "100%"]
  );

  // Image animations
  const imageScale = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.5, 0.8, 1],
    [0, 0.5, 1, 1.5, 10]
  );

  const imageOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.3, 0.8, 0.9],
    [0, 0.3, 1, 1, 0]
  );

  // Text opacity
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8],
    [1, 0.8, 0.3, 0]
  );

  // Lenis smooth scroll
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/studio-freight/lenis@1/bundled/lenis.min.js";
    document.head.appendChild(script);

    script.onload = () => {
      if (window.Lenis) {
        const lenis = new window.Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          mouseMultiplier: 0.5,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <section ref={sectionRef} className={styles.section}>
        <div className={styles.stickyContainer}>
          <div className={styles.contentWrapper}>
            {/* Text container */}
            <div className={styles.textContainer}>
              {/* First line: "Real recommendations" */}
              <motion.div
                style={{
                  x: leftTextX,
                  opacity: textOpacity,
                }}
                className={styles.firstLine}
              >
                <h1 className={styles.heading}>Real recomme</h1>
              </motion.div>

              {/* Second line with image in between */}
              <div className={styles.secondLine}>
                {/* "by real" text */}
                <motion.div
                  style={{
                    x: leftTextX,
                    opacity: textOpacity,
                  }}
                  className={styles.textBlock}
                >
                  <h1 className={styles.heading}>by real</h1>
                </motion.div>

                {/* Image in the middle */}
                <motion.div
                  style={{
                    scale: imageScale,
                    opacity: imageOpacity,
                  }}
                  className={styles.imageContainer}
                >
                  <img
                    src="https://cdn.telescope.fyi/landing/curators/desktop/zarah-back.webp"
                    alt="Person"
                    className={styles.image}
                  />
                </motion.div>

                {/* "people" text */}
                <motion.div
                  style={{
                    x: rightTextX,
                    opacity: textOpacity,
                  }}
                  className={styles.textBlock}
                >
                  <h1 className={styles.heading}>people</h1>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
