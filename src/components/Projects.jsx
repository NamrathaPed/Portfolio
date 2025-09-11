import { motion } from "framer-motion";

export default function Projects() {
  // Click handler
  const handleClick = () => {
    alert("Projects button clicked!");
    // You can replace this with navigation or any other action
  };

  return (
    <motion.button
      onClick={handleClick}
      className="absolute top-24 left-20 bg-teal-300 hover:bg-teal-600 text-black font-bold py-2 px-6 rounded shadow-lg cursor-pointer"
      initial={{ x: -300, opacity: 0 }} // Start off-screen to the left
      animate={{ x: 0, opacity: 1 }}   // Animate to original position
      transition={{ type: "spring", stiffness: 100, duration: 1.5 }}
      whileHover={{ scale: 1.1 }}       // Slightly enlarge on hover
      whileTap={{ scale: 0.95 }}        // Press effect
    >
      Projects
    </motion.button>
  );
}
