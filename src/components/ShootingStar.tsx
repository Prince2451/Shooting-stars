import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, usePresence } from "framer-motion";
import random from "lodash/random";

interface IShootingStarProps {
  delay: number;
  duration: number;
}

const ShootingStar: React.FC<IShootingStarProps> = ({ delay, duration }) => {
  const controls = useAnimation();
  const [isPresent, safeToRemove] = usePresence();
  const [isCompleted, setIsCompleted] = useState(false);

  // useRef for not changing position between renders
  const cords = useRef({
    top: random(2, window.innerHeight),
    left: random(2, window.innerWidth),
    opacity: random(0, 0.6, true),
    height: random(100, 200),
  });

  useEffect(() => {
    (async function () {
      const initialAnimationDur = (duration * 3) / 4;
      const lastAnimationDur = duration / 4;
      await controls.start({
        scaleY: [0, 1],
        transition: {
          delay,
          duration: initialAnimationDur,
        },
      });
      await controls.start({
        scaleY: 0,
        originY: "bottom",
        transition: {
          duration: lastAnimationDur,
        },
      });
      setIsCompleted(true);
    })();
  }, [controls, delay, duration]);

  useEffect(() => {
    if (isCompleted && !isPresent && safeToRemove) {
      safeToRemove();
    }
  }, [isCompleted, safeToRemove, isPresent]);

  return (
    <motion.div
      className="absolute transform rotate-45"
      style={{
        top: cords.current.top,
        left: cords.current.left,
      }}
    >
      <motion.span
        style={{
          opacity: cords.current.opacity,
          height: cords.current.height,
          scaleY: 0,
          originY: "top",
        }}
        animate={controls}
        className="text-xs relative w-0.5 bg-white after:w-1 after:h-1 after:block after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:bg-inherit after:rounded-full block"
      ></motion.span>
    </motion.div>
  );
};

export default ShootingStar;
