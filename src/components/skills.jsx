import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiArrowLeftWideLine } from "react-icons/ri";
import "./starry.css";
import "./skills.css";
import "./projects.css";

// ── Skill data ────────────────────────────────────────────────────────────────
const PROGRAMMING = [
  { icon: "🍎", name: "Swift",        xp: 70, tip: "INTERMEDIATE · iOS Development" },
  { icon: "🌐", name: "JavaScript",   xp: 85, tip: "ADVANCED · Portfolio Site" },
  { icon: "🔷", name: "TypeScript",   xp: 72, tip: "INTERMEDIATE · Portfolio Site" },
  { icon: "🐍", name: "Python",       xp: 95, tip: "EXPERT · AI Resume Builder" },
  { icon: "☕", name: "Java",         xp: 68, tip: "INTERMEDIATE · OOP Projects" },
  { icon: "🔧", name: "C",            xp: 60, tip: "INTERMEDIATE · DSA" },
  { icon: "⚙️", name: "C++",          xp: 60, tip: "INTERMEDIATE · DSA" },
  { icon: "📊", name: "R",            xp: 65, tip: "INTERMEDIATE · Data Analysis" },
];

const FRAMEWORKS = [
  { icon: "📱", name: "SwiftUI",      xp: 68, tip: "INTERMEDIATE · iOS UI" },
  { icon: "⚛️", name: "React.js",     xp: 85, tip: "ADVANCED · Portfolio Site" },
  { icon: "🟩", name: "Node.js",      xp: 75, tip: "ADVANCED · Backend APIs" },
  { icon: "⚡", name: "FastAPI",      xp: 72, tip: "INTERMEDIATE · Python APIs" },
  { icon: "🧠", name: "TensorFlow",   xp: 75, tip: "ADVANCED · ML Projects" },
  { icon: "🔥", name: "PyTorch",      xp: 68, tip: "INTERMEDIATE · Deep Learning" },
  { icon: "🤖", name: "scikit-learn", xp: 82, tip: "ADVANCED · Kaggle Projects" },
  { icon: "🔗", name: "LangChain",    xp: 72, tip: "INTERMEDIATE · RAG Systems" },
];

const AI_DATA = [
  { icon: "✨", name: "OpenAI API",   xp: 78, tip: "ADVANCED · AI Tools" },
  { icon: "💬", name: "LLMs",         xp: 82, tip: "ADVANCED · Code Debugger" },
  { icon: "🧩", name: "Agentic AI",   xp: 70, tip: "INTERMEDIATE · AI Agents" },
  { icon: "🔍", name: "RAG",          xp: 78, tip: "ADVANCED · AI Resume Builder" },
  { icon: "🔄", name: "ETL",          xp: 68, tip: "INTERMEDIATE · Data Pipelines" },
  { icon: "📊", name: "Power BI",     xp: 70, tip: "INTERMEDIATE · Dashboards" },
  { icon: "📈", name: "Tableau",      xp: 70, tip: "INTERMEDIATE · Dashboards" },
];

const CLOUD_DB = [
  { icon: "🔥", name: "Firebase",     xp: 75, tip: "ADVANCED · App Backend" },
  { icon: "☁️", name: "GCP",          xp: 58, tip: "INTERMEDIATE · Cloud Projects" },
  { icon: "🌩️", name: "AWS",          xp: 55, tip: "INTERMEDIATE · Cloud Services" },
  { icon: "🐳", name: "Docker",       xp: 62, tip: "INTERMEDIATE · Containerization" },
  { icon: "🗄️", name: "SQL",          xp: 78, tip: "ADVANCED · Data Projects" },
  { icon: "🗃️", name: "MySQL",        xp: 75, tip: "ADVANCED · Database Design" },
  { icon: "🐘", name: "PostgreSQL",   xp: 72, tip: "INTERMEDIATE · Databases" },
  { icon: "⚡", name: "Supabase",     xp: 65, tip: "INTERMEDIATE · Backend" },
];

const TOOLS = [
  { icon: "🐙", name: "Git",          xp: 82, tip: "ADVANCED · All Projects" },
  { icon: "🧪", name: "Unit Testing", xp: 68, tip: "INTERMEDIATE · QA" },
  { icon: "🚀", name: "CI/CD",        xp: 58, tip: "INTERMEDIATE · DevOps" },
  { icon: "🧬", name: "Pytest",       xp: 65, tip: "INTERMEDIATE · Python Testing" },
  { icon: "🧩", name: "OOP",          xp: 85, tip: "ADVANCED · All Projects" },
  { icon: "📐", name: "Sys Design",   xp: 60, tip: "INTERMEDIATE · Architecture" },
  { icon: "⚡", name: "Agile",        xp: 75, tip: "ADVANCED · Team Projects" },
  { icon: "📋", name: "Scrum",        xp: 72, tip: "INTERMEDIATE · Methodology" },
  { icon: "📊", name: "Excel",        xp: 78, tip: "ADVANCED · Data Analysis" },
];

const HUD = [
  { label: "LVL 3 DEVELOPER",  dot: "#00e5b0", delay: "0s" },
  { label: "CLASS: AI ENGINEER", dot: "#a855f7", delay: "0.3s" },
  { label: "XP: 2400",          dot: "#00e5b0", delay: "0.6s" },
];

const UNLOCKING = [
  { label: "⟳ UNLOCKING: Next.js",    delay: "0s" },
  { label: "⟳ UNLOCKING: Kubernetes", delay: "0.4s" },
  { label: "⟳ UNLOCKING: GraphQL",    delay: "0.8s" },
];

// ── Skill card ────────────────────────────────────────────────────────────────
const SkillCard = ({ title, skills, barColor, mounted, animDelay }) => {
  const [hovered, setHovered] = useState(null);
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <div className="skills-card" style={{ width: "100%", animationDelay: animDelay }}>
    <div
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      style={{
        background: "#0d1526",
        border: "2px solid #00e5b0",
        borderRadius: 10,
        boxShadow: cardHovered
          ? "0 0 0 1px #00e5b0, 0 0 24px 4px rgba(0,229,176,0.45), 0 0 60px 12px rgba(0,229,176,0.12), 0 24px 48px rgba(0,0,0,0.6)"
          : "0 0 8px 1px rgba(0,229,176,0.12), 0 0 0 1px rgba(0,229,176,0.3)",
        padding: "28px 32px",
        width: "100%",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: cardHovered ? "translateY(-10px)" : "translateY(0)",
      }}
    >
      <h2
        style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: 8,
          color: "#a855f7",
          marginBottom: 24,
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px 16px",
        }}
      >
        {skills.map((skill, i) => (
          <div
            key={i}
            style={{ position: "relative" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Tooltip */}
            {hovered === i && (
              <div
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#111827",
                  border: "1px solid #00e5b0",
                  borderRadius: 4,
                  padding: "6px 9px",
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 5,
                  color: "#00e5b0",
                  whiteSpace: "nowrap",
                  zIndex: 20,
                  animation: "tooltipIn 0.15s ease-out forwards",
                  pointerEvents: "none",
                }}
              >
                {skill.tip}
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 0,
                    height: 0,
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: "5px solid #00e5b0",
                  }}
                />
              </div>
            )}

            {/* Emoji icon */}
            <div style={{ fontSize: 16, textAlign: "center", marginBottom: 5 }}>
              {skill.icon}
            </div>

            {/* Skill name */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                color: "#8aa0c0",
                textAlign: "center",
                margin: "0 0 7px",
                lineHeight: 1.3,
              }}
            >
              {skill.name}
            </p>

            {/* XP bar track */}
            <div
              style={{
                height: 5,
                background: "#1c2a3a",
                border: "1px solid #1e3050",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: mounted ? `${skill.xp}%` : "0%",
                  background: barColor,
                  borderRadius: 3,
                  transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${i * 45}ms`,
                }}
              />
            </div>

            {/* XP number */}
            <div
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 5,
                color: "rgba(0,229,176,0.35)",
                textAlign: "right",
                marginTop: 3,
              }}
            >
              {skill.xp} XP
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
export const Skills = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [ripples, setRipples] = useState([]);

  // Canvas stars
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

  // Trigger XP bar animations after mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Click ripple
  const handleClick = useCallback((e) => {
    const id = Date.now() + Math.random();
    setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => setRipples((r) => r.filter((rr) => rr.id !== id)), 800);
  }, []);

  return (
    <section
      className="starry-bg"
      onClick={handleClick}
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#0a0f1e",
        overflow: "hidden",
      }}
    >
      {/* Canvas stars */}
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />

      {/* CRT scanline overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,229,176,0.025) 3px, rgba(0,229,176,0.025) 4px)",
        }}
      />

      {/* Click ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          style={{
            position: "fixed",
            left: r.x,
            top: r.y,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: "2px solid #00e5b0",
            pointerEvents: "none",
            zIndex: 9999,
            animation: "rippleRing 0.8s ease-out forwards",
          }}
        />
      ))}

      {/* Nav */}
      <div
        style={{
          position: "fixed",
          top: 20,
          left: 24,
          right: 24,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <RiArrowLeftWideLine
          size={28}
          style={{ color: "#00e5b0", cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); navigate(-1); }}
        />
        <AiFillHome
          size={24}
          style={{ color: "#00e5b0", cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); navigate("/"); }}
        />
      </div>

      {/* Page content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 960,
          margin: "0 auto",
          padding: "100px 24px 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        {/* Heading */}
        <div className="skills-heading" style={{ textAlign: "center" }}>
          <div style={{ filter: "drop-shadow(0 0 8px rgba(0,229,176,0.7))", marginBottom: 16, display: "inline-block" }}>
            <pre className="figlet-heading" style={{ fontFamily: "monospace", fontSize: "clamp(4.5px, 0.85vw, 7.5px)", lineHeight: 1.18, color: "#00e5b0", margin: 0, padding: 0, background: "none", border: "none", whiteSpace: "pre", letterSpacing: 0 }}>{`███╗   ███╗██╗   ██╗    ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
████╗ ████║╚██╗ ██╔╝    ██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
██╔████╔██║ ╚████╔╝     ███████╗█████╔╝ ██║██║     ██║     ███████╗
██║╚██╔╝██║  ╚██╔╝      ╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
██║ ╚═╝ ██║   ██║       ███████║██║  ██╗██║███████╗███████╗███████║
╚═╝     ╚═╝   ╚═╝       ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝`}</pre>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "24px" }}>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #00e5b030)" }} />
            <span style={{ color: "#00e5b040", fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>◆</span>
            <div style={{ height: "1px", width: "120px", background: "linear-gradient(to right, #00e5b030, #a855f730, #00e5b030)" }} />
            <span style={{ color: "#00e5b040", fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>◆</span>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #00e5b030)" }} />
          </div>
        </div>

        {/* HUD chips */}
        <div
          className="skills-hud"
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {HUD.map(({ label, dot, delay }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "#0d1526",
                border: "1px solid rgba(0,229,176,0.27)",
                borderRadius: 4,
                padding: "7px 12px",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 5.5,
                color: "#00e5b0",
                letterSpacing: "0.5px",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: dot,
                  boxShadow: `0 0 6px ${dot}`,
                  animation: `dotPulse 1.8s ease-in-out ${delay} infinite`,
                  flexShrink: 0,
                }}
              />
              {label}
            </div>
          ))}
        </div>

        {/* Skill cards */}
        <SkillCard
          title="Programming Languages"
          skills={PROGRAMMING}
          barColor="#00e5b0"
          mounted={mounted}
          animDelay="0.45s"
        />
        <SkillCard
          title="Frameworks & Libraries"
          skills={FRAMEWORKS}
          barColor="#a855f7"
          mounted={mounted}
          animDelay="0.55s"
        />
        <SkillCard
          title="AI & Data Science"
          skills={AI_DATA}
          barColor="linear-gradient(to right, #00e5b0, #a855f7)"
          mounted={mounted}
          animDelay="0.65s"
        />
        <SkillCard
          title="Cloud & Databases"
          skills={CLOUD_DB}
          barColor="#00e5b0"
          mounted={mounted}
          animDelay="0.75s"
        />
        <SkillCard
          title="Tools & Practices"
          skills={TOOLS}
          barColor="#a855f7"
          mounted={mounted}
          animDelay="0.85s"
        />

        {/* Currently Unlocking */}
        <div
          className="skills-unlocking"
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {UNLOCKING.map(({ label, delay }) => (
            <div
              key={label}
              style={{
                background: "rgba(168,85,247,0.06)",
                border: "1px dashed rgba(168,85,247,0.45)",
                borderRadius: 4,
                padding: "7px 14px",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 6,
                color: "rgba(168,85,247,0.8)",
                letterSpacing: "0.5px",
                animation: `unlockFlicker 2.2s ease-in-out ${delay} infinite`,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
