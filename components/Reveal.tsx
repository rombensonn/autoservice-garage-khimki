"use client";

import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type RevealDirection = "up" | "down" | "left" | "right" | "none";
type RevealAs = "div" | "article" | "footer" | "li" | "section" | "ul";
type MotionDivProps = Omit<
  ComponentProps<typeof motion.div>,
  "animate" | "initial" | "transition" | "variants" | "viewport" | "whileInView"
>;

type RevealProps = MotionDivProps & {
  amount?: number;
  as?: RevealAs;
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  distance?: number;
};

type RevealGroupProps = MotionDivProps & {
  amount?: number;
  as?: RevealAs;
  children: ReactNode;
  delay?: number;
  stagger?: number;
};

function offsetFor(direction: RevealDirection, distance: number) {
  if (direction === "left") return { x: distance, y: 0 };
  if (direction === "right") return { x: -distance, y: 0 };
  if (direction === "down") return { x: 0, y: -distance };
  if (direction === "none") return { x: 0, y: 0 };
  return { x: 0, y: distance };
}

function MotionElement({ as = "div", ...props }: { as?: RevealAs } & ComponentProps<typeof motion.div>) {
  const motionProps = props as Record<string, unknown>;

  if (as === "article") return <motion.article {...motionProps} />;
  if (as === "footer") return <motion.footer {...motionProps} />;
  if (as === "li") return <motion.li {...motionProps} />;
  if (as === "section") return <motion.section {...motionProps} />;
  if (as === "ul") return <motion.ul {...motionProps} />;
  return <motion.div {...props} />;
}

export function Reveal({ amount = 0.28, as = "div", children, className, delay = 0, direction = "up", distance = 26, ...props }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = offsetFor(direction, distance);

  return (
    <MotionElement
      as={as}
      className={className}
      {...props}
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985, ...offset }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.48, delay: shouldReduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionElement>
  );
}

export function RevealGroup({ amount = 0.24, as = "div", children, className, delay = 0.06, stagger = 0.12, ...props }: RevealGroupProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : delay,
        staggerChildren: shouldReduceMotion ? 0 : stagger,
      },
    },
  };

  return (
    <MotionElement as={as} className={className} {...props} initial="hidden" whileInView="visible" viewport={{ once: true, amount }} variants={variants}>
      {children}
    </MotionElement>
  );
}

export function RevealItem({ as = "div", children, className, direction = "up", distance = 24, ...props }: Omit<RevealProps, "amount" | "delay">) {
  const shouldReduceMotion = useReducedMotion();
  const offset = offsetFor(direction, distance);
  const variants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985, ...offset },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.44,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionElement as={as} className={className} {...props} variants={variants}>
      {children}
    </MotionElement>
  );
}
