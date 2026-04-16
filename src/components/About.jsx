import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiArrowLeftWideLine } from "react-icons/ri";
import "./starry.css";
import "./about.css";
import "./hero.css"; // reuse blinkCaret + beamPulse

// ─── Sequential terminal typewriter ───────────────────────────────────────────
const TERMINAL_LINES = [
  "> Initializing profile...",
  "> Loading Namratha.exe...",
  "> Status: Ready ✓",
];

function useTerminal() {
  const [display, setDisplay] = useState(""); // what's visible right now
  const [finished, setFinished] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) { setFinished(true); return; }
    const full = TERMINAL_LINES[lineIdx];
    const isLast = lineIdx === TERMINAL_LINES.length - 1;

    if (!clearing) {
      // Typing phase
      if (charIdx < full.length) {
        const t = setTimeout(() => {
          setDisplay(full.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 46);
        return () => clearTimeout(t);
      } else if (!isLast) {
        // Pause then start clearing
        const t = setTimeout(() => setClearing(true), 500);
        return () => clearTimeout(t);
      }
      // Last line: just stay
    } else {
      // Clearing phase — erase one char at a time
      if (display.length > 0) {
        const t = setTimeout(() => setDisplay((d) => d.slice(0, -1)), 22);
        return () => clearTimeout(t);
      } else {
        setClearing(false);
        setCharIdx(0);
        setLineIdx((i) => i + 1);
      }
    }
  }, [charIdx, lineIdx, clearing, display]);

  return { display, finished };
}

// ─── Bio paragraphs with inline highlights ────────────────────────────────────
const BIO_P1 = [
  { t: "Hi! I'm passionate about using " },
  { t: "AI, data, and software", hi: true },
  { t: " to solve real-world problems. From building " },
  { t: "AI tools", hi: true },
  { t: " that help people debug code or sharpen their resumes, to analysing complex datasets and designing " },
  { t: "user-friendly solutions", hi: true },
  { t: "." },
];

const BIO_P2 = [
  { t: "I enjoy crafting technology that's both smart and accessible. I love diving into " },
  { t: "cutting-edge technologies", hi: true },
  { t: " and applying them to work that has a " },
  { t: "meaningful impact", hi: true },
  { t: ". Every project is a chance to make technology more practical, efficient, and helpful for people." },
];

// ─── Ticker text (duplicated in JSX for seamless loop) ────────────────────────
const TICKER =
  "\u00a0\u00a0★ Python  ·  React  ·  Node.js  ·  TensorFlow  ·  LLMs  ·  RAG  ·  LangChain  ·  Data Science  ·  scikit-learn  ·  Gemini API  ·  FAISS  ·  NLP  \u00a0\u00a0\u00a0\u00a0";

// ─── Stat chips ───────────────────────────────────────────────────────────────
const CHIPS = ["◆ 3+ PROJECTS", "◆ 2 INTERNSHIPS", "◆ FULL STACK DEV", "◆ OPEN TO WORK"];

export const About = () => {
  const navigate = useNavigate();

  // ── Canvas stars with mouse repulsion ─────────────────
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

  // ── Terminal ──────────────────────────────────────────
  const { display: termDisplay, finished: termFinished } = useTerminal();

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#0a0f1e",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Canvas stars */}
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />

      {/* Page-wide CRT scanline overlay */}
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

      {/* ── Main card ───────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          border: "2px solid #00e5b0",
          borderRadius: "12px",
          background: "#0d1526",
          boxShadow:
            "0 0 28px rgba(0,229,176,0.22), 0 0 60px rgba(0,229,176,0.08)",
          maxWidth: "1020px",
          width: "calc(100% - 48px)",
          marginTop: "72px",
          marginBottom: "40px",
          overflow: "hidden",
        }}
      >
        {/* Two-column body */}
        <div className="about-card-grid">

          {/* ── Left column ──────────────────────────────── */}
          <div className="about-left-col">
            {/* Avatar */}
            <div style={{ position: "relative", display: "inline-block", animation: "aboutGlitch 8s ease-in-out infinite" }}>
              <img
                src="/profile-about.jpg"
                alt="Namratha"
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  objectFit: "cover",
                  display: "block",
                  border: "2px solid #00e5b0",
                  boxShadow: "0 0 18px rgba(0,229,176,0.5)",
                }}
              />
              {/* Scrolling hologram scanlines */}
              <div className="about-holo-scan" />
              {/* Edge tint */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, transparent 52%, rgba(0,229,176,0.22) 100%)",
                  pointerEvents: "none",
                }}
              />
              {/* Projector beam — absolutely positioned, centred via left:50% + translateX(-50%) */}
              <div style={{
                position: "absolute",
                bottom: -56,
                left: "50%",
                width: 110,
                height: 52,
                background: "linear-gradient(to bottom, rgba(0,229,176,0.32), rgba(0,229,176,0.02))",
                clipPath: "polygon(32% 0%, 68% 0%, 100% 100%, 0% 100%)",
                animation: "beamPulse 2.5s ease-in-out infinite",
                filter: "blur(4px)",
                pointerEvents: "none",
              }}/>
              {/* Glow dot at beam base */}
              <div style={{
                position: "absolute",
                bottom: -60,
                left: "50%",
                transform: "translateX(-50%)",
                width: 72,
                height: 5,
                borderRadius: "50%",
                background: "rgba(0,229,176,0.7)",
                filter: "blur(5px)",
                pointerEvents: "none",
              }}/>
            </div>

            {/* Stat chips */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "76px",
                width: "100%",
              }}
            >
              {CHIPS.map((chip) => (
                <div
                  key={chip}
                  style={{
                    backgroundColor: "rgba(0,229,176,0.06)",
                    border: "1px solid rgba(0,229,176,0.38)",
                    borderRadius: "4px",
                    padding: "9px 10px",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "7px",
                    color: "#00e5b0",
                    letterSpacing: "0.5px",
                    textAlign: "center",
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column ─────────────────────────────── */}
          <div className="about-right-col">
            {/* Terminal typewriter — single line, cycles through messages */}
            <div
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "13px",
                color: "#7c5cbf",
                marginBottom: "22px",
                minHeight: "24px",
                lineHeight: 1.9,
              }}
            >
              {termDisplay}
              {!termFinished && (
                <span className="typewriter-caret" style={{ color: "#7c5cbf" }}>_</span>
              )}
            </div>

            {/* About Me heading */}
            <h1
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "21px",
                color: "#00e5b0",
                marginBottom: "18px",
                letterSpacing: "1px",
              }}
            >
              About Me
            </h1>

            {/* Gradient divider */}
            <div
              style={{
                height: "1px",
                background: "linear-gradient(to right, transparent, rgba(0,229,176,0.4), transparent)",
                marginBottom: "20px",
              }}
            />

            {/* Bio — two paragraphs */}
            {[BIO_P1, BIO_P2].map((para, pi) => (
              <p
                key={pi}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15.5px",
                  color: "#8aa0c0",
                  lineHeight: 1.9,
                  margin: 0,
                  marginBottom: pi === 0 ? "18px" : 0,
                }}
              >
                {para.map((seg, i) =>
                  seg.hi ? (
                    <span key={i} style={{ color: "#00e5b0", fontWeight: 600 }}>{seg.t}</span>
                  ) : (
                    <span key={i}>{seg.t}</span>
                  )
                )}
              </p>
            ))}
          </div>
        </div>

        {/* ── Ticker footer ────────────────────────────────── */}
        <div
          style={{
            borderTop: "1px solid rgba(0,229,176,0.15)",
            padding: "10px 0",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              display: "inline-block",
              animation: "aboutTicker 20s linear infinite",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
              color: "#a855f7",
              letterSpacing: "1px",
            }}
          >
            {TICKER}{TICKER}
          </div>
        </div>
      </div>
    </section>
  );
};
