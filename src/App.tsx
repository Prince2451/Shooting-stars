import random from "lodash/random";
import { useMemo } from "react";
import ShootingStars from "./components/ShootingStars";

function App() {
  const starsCords = useMemo(() => {
    const stars = 200;
    const cords: Array<{ top: number; left: number; opacity: number }> = [];
    for (let i = 0; i < stars; i++) {
      cords.push({
        top: random(2, window.innerHeight),
        left: random(2, window.innerWidth),
        opacity: random(0.1, 1, true),
      });
    }
    return cords;
  }, []);

  return (
    <div className="h-screen w-screen bg-[#0F0F10] relative overflow-hidden">
      <ShootingStars />
      {starsCords.map((starCord, i) => {
        return (
          <div
            key={i}
            style={{ ...starCord }}
            className="text-xs w-0.5 h-0.5 rounded-full filter bg-white absolute"
          ></div>
        );
      })}
    </div>
  );
}

export default App;
