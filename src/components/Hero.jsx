import { motion } from "framer-motion";
import { span } from "framer-motion/client";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./starry.css";
export default function Hero() {
  const navigate = useNavigate();

  
  const handleProjectsClick = () => navigate("/projects");
  const handleAboutClick = () => navigate("/about");
  const handleSkillsClick = () => navigate("/skills");
  const handleContactClick = () => alert("Contact button clicked!");
  const handleResumeClick = () => alert("Resume clicked!");
  const handleGithubClick = () => window.open("https://github.com/NamrathaPed", "_blank");
  const handleLinkedinClick = () => window.open("https://www.linkedin.com/in/namratha-peddamalla", "_blank");


  return (
    <section className="flex items-center justify-between h-screen starry-bg bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800">
      {/* Profile Picture */}
      <motion.img
        src="/profile.jpg"
        alt="Namratha"
        className="w-88 h-90 rounded-full border-4 border-purple-900 absolute bottom-50 right-60"
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Hi Bubble */}
      <motion.div
        className="absolute -top-39 left-205 bg-teal-300 text-black px-11 py-6 rounded-xl shadow-lg text-xl font-['Press_Start_2P'] relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.3 }}
      >
        Hi!
        <span className="absolute -bottom-3 right-3 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-teal-300"></span>
      </motion.div>

      {/* Name + Intro + Links */}
      <motion.div
        className="absolute top-65 left-20 max-w-lg flex flex-col"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h1 className="text-4xl font-['Press_Start_2P'] mb-4">I'm Namratha</h1>
        <p className="text-xl">
          I'm a fullstack developer with a keen interest in AI, Machine Learning
          and Data Science.
        </p>

        {/* Links Row */}
        <div className="flex gap-8 text-lg text-teal-300 mt-16 font-['Press_Start_2P']">
          <motion.p
            onClick={handleProjectsClick}
            className="cursor-pointer hover:underline decoration-teal-500 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-teal-500">➤</span> Projects
          </motion.p>
          
          <motion.button
          onClick={handleAboutClick}
          className="fixed top-4 left-10 bg-teal-300 hover:bg-teal-500 text-black font-mono font-bold px-4 py-2 rounded-lg text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
    >
          About
         </motion.button>

          <motion.button
            onClick ={handleContactClick}
            className="fixed top-4 right-10 bg-teal-300 hover:bg-teal-500 text-black font-mono font-bold py-2 px-4 rounded"
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
          >
            Contact Me
          </motion.button>


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

      {/* Bottom-right social icons */}
      <div className="absolute bottom-15 right-10 flex flex-col gap-4 text-teal-300 text-2xl">
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
