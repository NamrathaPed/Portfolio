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
          description={"Hi, I’m passionate about using AI, data, and software to solve problems that make life easier. From building AI tools that help people debug code or improve their resumes, to analyzing complex datasets and designing user-friendly solutions, I enjoy creating technology that’s both smart and accessible. I love exploring new ideas, learning cutting-edge technologies, and applying them to projects that have a meaningful impact. Every project I work on is an opportunity to make technology more practical, efficient, and helpful for people."}
          className="flex flex-col p-6 sm:p-8 md:p-12 lg:p-16 max-w-4xl w-full bg-slate-900/40 rounded-2xl backdrop-blur-md shadow-[0_0_15px_#14b8a6]"
        />
      </div>
    </section>
  );
};
