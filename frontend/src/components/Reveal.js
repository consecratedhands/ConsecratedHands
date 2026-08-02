import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

// Fade + rise on scroll into view
export const Reveal = ({ children, delay = 0, y = 40, className = "", ...rest }) => (
  <motion.div
    className={className}
    initial={{ y, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

// Masked line-by-line reveal for hero headings.
// Pass an array of strings (each becomes a masked line).
export const MaskedLines = ({ lines, className = "", delay = 0 }) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden">
        <motion.span
          className="block"
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1.05, ease: EASE, delay: delay + i * 0.12 }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </span>
);

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export const staggerItem = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
};
