"use client"
import { motion } from "framer-motion"

const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
}

export default function Template({ children }) {
    return (
        <motion.main
            variants={variants}
            initial="hidden"
            animate="enter"
            transition={{ type: "linear", duration: 0.3 }}
        >
            {children}
        </motion.main>
    )
}