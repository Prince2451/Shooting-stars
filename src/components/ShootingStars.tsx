import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import ShootingStar from "./ShootingStar";

const ShootingStars: React.FC = () => {
  const [starCount, setStarCount] = useState(0);

  const duration = 1; //seconds
  const delay = 0.3;
  const maxStarsAtScreen = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setStarCount((starCount) => ++starCount);
    }, (duration * 1000) / maxStarsAtScreen);
    return () => {
      interval && clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      <ShootingStar key={starCount} delay={delay} duration={duration} />
    </AnimatePresence>
  );
};

export default ShootingStars;
