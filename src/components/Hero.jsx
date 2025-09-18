import { motion } from "framer-motion";
import { span } from "framer-motion/client";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./starry.css";
import { NavigationButtons } from "./NavigationButtons";
export default function Hero() {
  const navigate = useNavigate();

  
  const handleProjectsClick = () => navigate("/projects");
  const handleAboutClick = () => navigate("/about");
  const handleSkillsClick = () => navigate("/skills");
  const handleContactClick = () => navigate("/contact");
  const handleResumeClick = () =>  window.open("/NamrathaResume.pdf", "_blank");
  const handleGithubClick = () => window.open("https://github.com/NamrathaPed", "_blank");
  const handleLinkedinClick = () => window.open("https://www.linkedin.com/in/namratha-peddamalla", "_blank");


  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between h-screen starry-bg bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 px-4 md:px-12 overflow-hidden">
      <div className="absolute top-16 left-4 md:top-4 md:left-4 z-50">
  <NavigationButtons type="home" />
</div>
<div className="absolute top-4 left-4 z-50">
        <button
          onClick={handleAboutClick}
          className="px-4 py-2 cursor-pointer bg-teal-300 hover:bg-teal-500 text-black font-mono font-bold rounded transition"
        >
          About
        </button>
      </div>
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleContactClick}
          className="cursor-pointer bg-teal-300 hover:bg-teal-500 text-black font-mono font-bold py-2 px-4 rounded"
        >
          Contact Me
        </button>
      </div>
    

      {/* Name + Intro + Links */}
      <motion.div
        className="flex-1 text-center md:text-left mt-16 md:mt-0 "
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h1 className="text-3xl md:text-5xl font-['Press_Start_2P'] mb-4">I'm Namratha</h1>
        <p className="text-base md:text-xl mb-6 text-teal-300 font-mono">
          I'm a fullstack developer with a keen interest <br /> in AI, Machine Learning
          and Data Science.
        </p>

        {/* Links Row */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 text-lg text-teal-300 font-['Press_Start_2P']">
          <motion.p
            onClick={handleProjectsClick}
            className="cursor-pointer hover:underline decoration-teal-500 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-teal-500">➤</span> Projects
          </motion.p>
          <motion.p
            onClick={handleSkillsClick}
            className="cursor-pointer hover:underline decoration-teal-500 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-teal-500">➤</span> Skills
          </motion.p>

          <motion.p
            onClick={handleResumeClick}
            className="cursor-pointer hover:underline decoration-teal-500 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-teal-500">➤</span> Resume
          </motion.p>
        </div>
      </motion.div>

      
        {/* Right side: Profile picture + Hi bubble */}
      <div className="flex-1 flex justify-center md:justify-center relative mt-12 md:mt-0 md:pr-12">
        <motion.img
          src="/profile.jpg"
          alt="Namratha"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-48 md:w-88 h-48 md:h-88 rounded-full border-4 border-purple-900 shadow-lg"
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute -top-6 md:-top-10 bg-teal-300 text-black px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg text-sm md:text-base font-['Press_Start_2P']"
        >
          Hi! {/* Bubble Tail */}
  <span className="absolute left-6 md:left-10 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-teal-300"></span>
        </motion.div>
      </div>
      {/* Bottom-right social icons */}
      <div className="flex justify-center md:flex-col gap-4 space-x-6 mt-6 text-2xl text-teal-300">
        <motion.div
          onClick={handleGithubClick}
          className="cursor-pointer hover:text-teal-500"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGithub />
        </motion.div>

        <motion.div
          onClick={handleLinkedinClick}
          className="cursor-pointer hover:text-teal-500"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaLinkedin />
        </motion.div>
        </div>
    </section>
  );
}
