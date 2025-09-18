import { NavigationButtons } from "./NavigationButtons";
import { Tile } from "./tile";
import "./starry.css";

export const About = () => {
  return (
    <section className="flex min-h-screen starry-bg bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800">
      <NavigationButtons />

      <div className="flex flex-1 justify-center items-center shadow: px-4 sm:px-8 md:px-16 lg:px-24 py-10">
        <Tile
          title="About Me"
          subtitle="A little more about me"
          description={`Hi, I’m Namratha, a recent Masters graduate in Information Systems from DePaul University with a GPA of 3.8/4.0. I’m passionate about data, AI, and problem-solving, and I enjoy building intelligent systems that make technology more practical and human-centered.

I’ve worked on projects ranging from an AI-powered resume analyzer and AI code debugger to an e-commerce fraud detection system and an image search and recognition tool. Recently, I’ve been diving deeper into Generative AI, LLMs, and agentic AI systems while also strengthening my foundations in data analysis, C++, SQL, and software engineering.

My skillset spans Python, Java, R, SQL, Tableau, Power BI, TensorFlow, PyTorch, and cloud computing, along with hands-on experience in Agile/Scrum environments. Beyond technical skills, I bring strong problem-solving, adaptability, and communication—qualities I continue to refine while applying to both data analyst and software engineer roles.`}
          className="flex flex-col p-6 sm:p-8 md:p-12 lg:p-16 max-w-4xl w-full bg-slate-900/40 rounded-2xl shadow-lg backdrop-blur-md"
        />
      </div>
    </section>
  );
};
