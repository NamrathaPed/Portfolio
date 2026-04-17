import { useEffect, useRef } from "react";
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

export const Projects = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = Array.from({ length: 130 }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x, y, baseX: x, baseY: y,
          vx: 0, vy: 0,
          size: Math.random() < 0.15 ? 2 : 1,
          opacity: 0.3 + Math.random() * 0.65,
          twinkle: 0.7 + Math.random() * 2.8,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    setup();
    window.addEventListener("resize", setup);

    const onMouseMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouseMove);

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach((s) => {
        const dx = s.x - mouseRef.current.x;
        const dy = s.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const R = 120;
        if (dist < R && dist > 0) {
          const f = ((R - dist) / R) * 0.85;
          s.vx += (dx / dist) * f;
          s.vy += (dy / dist) * f;
        }
        s.vx += (s.baseX - s.x) * 0.007;
        s.vy += (s.baseY - s.y) * 0.007;
        s.vx *= 0.88;
        s.vy *= 0.88;
        s.x += s.vx;
        s.y += s.vy;
        const op = s.opacity * (0.5 + 0.5 * Math.sin(t * 0.001 * s.twinkle + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, op))})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", setup);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
  <div className="starry-bg" style={{ minHeight: "100vh", position: "relative", overflowX: "auto" }}>
    <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />
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
  );
};
