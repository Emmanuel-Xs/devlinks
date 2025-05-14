"use client";

import type { Variants } from "motion/react";
import { motion } from "motion/react";

interface LogoutIconProps extends React.ComponentProps<typeof motion.svg> {
  size?: number;
}

const pathVariants: Variants = {
  animate: {
    x: 2,
    translateX: [0, -3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

const LogoutIcon = ({ size = 28 }: LogoutIconProps) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="group-hover:translate-x-0.5"
    >
      <motion.path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <motion.polyline
        points="16 17 21 12 16 7"
        variants={pathVariants}
        initial="normal"
        whileHover="animate"
      />
      <motion.line
        x1="21"
        x2="9"
        y1="12"
        y2="12"
        variants={pathVariants}
        initial="normal"
        whileHover="animate"
      />
    </motion.svg>
  );
};

export { LogoutIcon };
