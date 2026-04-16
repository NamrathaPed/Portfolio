import { memo } from "react";
import { NavigationButtons } from "./NavigationButtons";
import { ProjectTile } from "./ProjectTile";
import "./projects.css";
import "./starry.css";

const projectsData = [
  {
    stage: "01",
    title: "Gen AI Pitch Pal",
    stack: ["Python", "Gemini API", "RAG", "Langchain", "Faiss", "NLP"],
    description:
      "A generative AI tool that crafts clear, professional pitch decks from simple inputs — helping founders present ideas with confidence.",
    imagePath: "",
    githubURL: "",
    liveURL: "https://www.kaggle.com/code/adityagupta961/gen-ai-pitchpal-2",
    stars: 5,
    isBoss: false,
  },
  {
    stage: "02",
    title: "Dataweaver- AI Data Analyst ",
    stack: ["Python", "nvidia API", "React"],
    description:
      "an AI-powered system that takes in raw CSV or Excel data and automatically performs data cleaning, exploratory data analysis, generates insights and reports using an LLM, and builds a complete interactive dashboard with minimal human intervention. ",
    imagePath: "AiMeet.png",
    githubURL: "https://github.com/NamrathaPed/ai_code_debugger",
    liveURL: "",
    demoURL: "",
    stars: 4,
    isBoss: false,
  },
  {
    stage: "03",
    title: "MyFutureSelf.Inc",
    stack: ["Swift", "OpenAI API", "RAG", "Langchain", "Faiss", "NLP"],
    description:
      "A self-motivation app that helps users stay motivated to achieve their goals and stay focussed",
    imagePath: "",
    githubURL: "",
    liveURL: "https://www.kaggle.com/code/adityagupta961/gen-ai-pitchpal-2",
    demoURL: "",
    stars: 5,
    isBoss: true,
  },
  {
    stage: "04",
    title: "Gen AI Pitch Pal",
    stack: ["Python", "Gemini API", "RAG", "Langchain", "Faiss", "NLP"],
    description:
      "A generative AI tool that crafts clear, professional pitch decks from simple inputs — helping founders present ideas with confidence.",
    imagePath: "",
    githubURL: "",
    liveURL: "https://www.kaggle.com/code/adityagupta961/gen-ai-pitchpal-2",
    stars: 5,
    isBoss: false,
  },
  
];

export const Projects = memo(() => (
  <div className="starry-bg" style={{ minHeight: "100vh", position: "relative", overflowX: "auto" }}>
    <NavigationButtons />

    <div style={{ position: "relative", zIndex: 1, paddingTop: "88px", paddingBottom: "72px", paddingLeft: "24px", paddingRight: "24px" }}>
      {/* Page header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1 className="stage-header-text" style={{
          color: "#00e5b0",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "clamp(18px, 4vw, 34px)",
          letterSpacing: "2px",
          marginBottom: "16px",
        }}>
          WORK EXPERIENCE
        </h1>
        {/* Decorative divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "24px" }}>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #00e5b030)" }} />
          <span style={{ color: "#00e5b040", fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>◆</span>
          <div style={{ height: "1px", width: "120px", background: "linear-gradient(to right, #00e5b030, #a855f730, #00e5b030)" }} />
          <span style={{ color: "#00e5b040", fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>◆</span>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #00e5b030)" }} />
        </div>
      </div>

      {/* Cards */}
      <div style={{
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        gap: "48px",
        overflowX: "auto",
        overflowY: "visible",
        paddingBottom: "16px",
        paddingTop: "16px",
      }}>
        {projectsData.map((project) => (
          <ProjectTile key={project.stage} {...project} />
        ))}
      </div>

      {/* Footer hint */}
      <p style={{
        textAlign: "center",
        color: "#374151",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "8px",
        marginTop: "64px",
        letterSpacing: "2px",
      }}>
        ▲ ▼ SELECT  ·  ► CONFIRM
      </p>
    </div>
  </div>
));
