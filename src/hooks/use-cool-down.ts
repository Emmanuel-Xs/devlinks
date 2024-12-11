import { useEffect, useState } from "react";

export function useCoolDown(
  initialCoolDown: boolean = false,
  coolDownTime: number = 30,
) {
  const [coolDown, setCoolDown] = useState(initialCoolDown ? coolDownTime : 0);

  useEffect(() => {
    if (coolDown > 0 && initialCoolDown) {
      const timer = setInterval(() => {
        setCoolDown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [coolDown, initialCoolDown]);

  const startCoolDown = () => {
    setCoolDown(coolDownTime);
  };

  return { coolDown, startCoolDown };
}
