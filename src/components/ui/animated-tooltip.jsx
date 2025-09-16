"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion"; // 👈 use framer-motion here


/*************  ✨ Windsurf Command ⭐  *************/
/**
 * AnimatedTooltipSingle is a component that renders a single tooltip with an animated entrance and exit.
 *
 * It takes two props: `title` and `children`. The `title` prop is the text that will be displayed in the tooltip, and the `children` prop is the content that will be rendered inside the tooltip.
 *
 * The component uses framer-motion to animate the entrance and exit of the tooltip, and uses the `useTransform` and `useSpring` hooks to create the animation.
 *
 * The animation is a spring animation that starts at `opacity: 0, y: 20, scale: 0.6` and ends at `opacity: 1, y: 0, scale: 1`.
 *
 * The component renders a single tooltip with an absolute position, and uses the `z-50` class to ensure that the tooltip is rendered on top of other elements.
 *
 * The component also renders a gradient background behind the tooltip text, and uses the `text-base` and `font-bold` classes to style the text.
 *
 * The component also renders a border around the tooltip text, and uses the `!m-0` class to remove the margin from the element.
 *
 * The component finally renders the content of the tooltip inside a relative div, and uses the `group-hover:z-30` and `group-hover:scale-105` classes to add a hover effect to the element.
 */
/*******  17fff673-2f17-46b9-8a81-c7a65bb4fcbb  *******/

export const AnimatedTooltipSingle = ({ title, children }) => {
  const [hovered, setHovered] = useState(false);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const animationFrameRef = useRef(null);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      const halfWidth = event.currentTarget.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    });
  };

  return (
    <div
      className="group relative -mr-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: "nowrap",
            }}
            className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
          >
            <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
            <div className="relative z-30 text-base font-bold text-white">
              {title}
            </div>
            {/* <div className="text-xs text-white">{item.designation}</div> */}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onMouseMove={handleMouseMove}
        className="relative !m-0 h-14 w-14 rounded-full border-2 border-white object-cover object-top !p-0 transition duration-500 group-hover:z-30 group-hover:scale-105"
      >
        {children}
      </div>
    </div>
  );
};
