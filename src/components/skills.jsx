import { Tile } from "./tile";
import { NavigationButtons } from "./NavigationButtons";
import "./projects.css";
import { FaPython, FaJava, FaJs, FaReact, FaNodeJs, FaRProject, FaGitAlt } from "react-icons/fa";
import { 
  SiC, SiCplusplus, SiTypescript, SiHtml5, SiCss3, 
  SiTensorflow, SiPytorch, SiKeras, SiScikitlearn, SiPandas, SiNumpy, 
  SiGooglecloud, SiMysql, SiMongodb, SiTableau
} from "react-icons/si";

export const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Python", icon: <FaPython /> },
        { name: "Java", icon: <FaJava /> },
        { name: "C", icon: <SiC /> },
        { name: "C++", icon: <SiCplusplus /> },
        { name: "R", icon: <FaRProject /> },
        { name: "JavaScript", icon: <FaJs /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "HTML", icon: <SiHtml5 /> },
        { name: "CSS", icon: <SiCss3 /> }
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "React.js", icon: <FaReact /> },
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "TensorFlow", icon: <SiTensorflow /> },
        { name: "PyTorch", icon: <SiPytorch /> },
        { name: "Keras", icon: <SiKeras /> },
        { name: "scikit-learn", icon: <SiScikitlearn /> },
        { name: "pandas", icon: <SiPandas /> },
        { name: "NumPy", icon: <SiNumpy /> },
        { name: "Matplotlib", icon: "📊" }
      ]
    },
    {
      title: "Software Development",
      skills: [
        { name: "OOP", icon: "🧩" },
        { name: "REST API", icon: "🔗" },
        { name: "Unit Testing (Pytest)", icon: "🧪" },
        { name: "System Design", icon: "📐" },
        { name: "Agile", icon: "⚡" },
        { name: "Scrum", icon: "👥" },
        { name: "CI/CD", icon: "🚀" }
      ]
    },
    {
      title: "Cloud & Platforms",
      skills: [
        { name: "Google Cloud Platform", icon: <SiGooglecloud /> },
        { name: "Windows", icon: "🖥️" }
      ]
    },
    {
      title: "Databases & Tools",
      skills: [
        { name: "SQL", icon: "🗄️" },
        { name: "MySQL", icon: <SiMysql /> },
        { name: "NoSQL", icon: <SiMongodb /> },
        { name: "Git", icon: <FaGitAlt /> },
        { name: "Excel", icon: "📊" },
      ]
    },
    {
      title: "Data Science & Analytics",
      skills: [
        { name: "ETL", icon: "⚙️" },
        { name: "Statistical Analysis", icon: "📈" },
        { name: "Tableau", icon: <SiTableau /> },
        { name: "Power BI", icon: "📊" }
      ]
    },
    {
      title: "AI/ML",
      skills: [
        { name: "LLMs", icon: "🤖" },
        { name: "RAG", icon: "🤖" }
      ]
    }
  ];

  return (
    <section className="flex flex-col items-center justify-center p-10 starry-bg">
      <NavigationButtons />
      <h1 className="stage-header-text" style={{ color: "#00e5b0", fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(18px, 4vw, 34px)", letterSpacing: "2px", marginBottom: "16px", textAlign: "center" }}>My Skills</h1>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "40px" }}>
        <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #00e5b030)" }} />
        <span style={{ color: "#00e5b040", fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>◆</span>
        <div style={{ height: "1px", width: "120px", background: "linear-gradient(to right, #00e5b030, #a855f730, #00e5b030)" }} />
        <span style={{ color: "#00e5b040", fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>◆</span>
        <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #00e5b030)" }} />
      </div>

      <div className="flex flex-col gap-8 w-full max-w-4xl">
        {skillCategories.map((category, index) => (
           <Tile
           key={index}
           title="" // Hide Tile's built-in title
           description={
             <div className="w-full">
               {/* Fake title aligned left */}
               <h2 className="text-2xl font-['Press_Start_2P'] text-[#a855f7] mb-10 text-left">{category.title}</h2>

               {/* Skills centered */}
               <div className="flex flex-wrap gap-4 justify-center mt-4 ">
                 {category.skills.map((skill, idx) => (
                   <div key={idx} className="flex flex-col items-center w-24">
                     <div className="text-3xl text-[#00e5b0] mb-1 hover:scale-125 transition-transform">{skill.icon}</div>
                     <p className="text-[#a855f7] text-center text-sm">{skill.name}</p>
                   </div>
                 ))}
               </div>
             </div>
           }
           className="w-full"
         />
       ))}
     </div>
   </section>
 );
};