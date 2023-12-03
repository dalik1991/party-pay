"use client"
import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0, x: -500, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
}

export default function Template({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: "ease", duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}