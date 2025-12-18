"use client";

import React from "react";

import type { Variants } from "motion/react";
import { motion } from "motion/react";

interface ArrowRightIconProps extends React.ComponentProps<typeof motion.svg> {
  size?: number;
}

const pathVariants: Variants = {
  normal: { d: "M5 12h14" },
  animate: {
    d: ["M5 12h14", "M5 12h9", "M5 12h14"],
    transition: {
      duration: 0.4,
    },
  },
};

const secondaryPathVariants: Variants = {
  normal: { d: "m12 5 7 7-7 7", translateX: 0 },
  animate: {
    d: "m12 5 7 7-7 7",
    translateX: [0, -3, 0],
    transition: {
      duration: 0.4,
    },
  },
};

export function ArrowRightIcon({ size = 28 }: ArrowRightIconProps) {
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
      className="text-gray-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
    >
      <motion.path
        d="M5 12h14"
        variants={pathVariants}
        initial="normal"
        whileHover="animate"
      />
      <motion.path
        d="m12 5 7 7-7 7"
        variants={secondaryPathVariants}
        initial="normal"
        whileHover="animate"
      />
    </motion.svg>
  );
}
