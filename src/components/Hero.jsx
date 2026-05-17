import { useState, useEffect, useRef, useCallback } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./hero.css";
import "./starry.css";
import "./projects.css";

// ─────────────────────────────────────────────────────────
// CRT boot overlay — mounts on load, fades out after ~2.4s
// ─────────────────────────────────────────────────────────
const CRTBoot = () => (
  <div className="crt-overlay">
    <div className="crt-noise" />
    <div className="crt-scanline" />
    <div className="crt-vignette" />
  </div>
);

// ─────────────────────────────────────────────────────────
// Hologram avatar
// ─────────────────────────────────────────────────────────
const AvatarHologram = () => (
  <div style={{ position: "relative", display: "inline-block" }}>
    {/* Float bob */}
    <div style={{ animation: "bobFloat 4s ease-in-out infinite" }}>
      {/* Chromatic aberration glitch */}
      <div style={{ position: "relative", animation: "holoGlitch 9s ease-in-out infinite" }}>
        <img
          src="/profile.jpg"
          alt="Namratha"
          className="hero-avatar-img"
        />
        {/* Teal CRT scanlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,229,176,0.07) 3px, rgba(0,229,176,0.07) 4px)",
            pointerEvents: "none",
          }}
        />
        {/* Edge teal tint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, transparent 55%, rgba(0,229,176,0.18) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>

    {/* Hi! bubble */}
    <div
      style={{
        position: "absolute",
        top: -48,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#00e5b0",
        color: "#0a0f1e",
        padding: "10px 22px",
        borderRadius: "9999px",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 13,
        whiteSpace: "nowrap",
        boxShadow: "0 0 14px rgba(0,229,176,0.55)",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      Hi!
      <span
        style={{
          position: "absolute",
          bottom: -8,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "8px solid #00e5b0",
        }}
      />
    </div>

    {/* Projector beam (emanates upward from below) */}
    <div
      style={{
        position: "absolute",
        bottom: -82,
        left: "50%",
        width: 220,
        height: 100,
        background:
          "linear-gradient(to bottom, rgba(0,229,176,0.38), rgba(0,229,176,0.02))",
        clipPath: "polygon(22% 0%, 78% 0%, 100% 100%, 0% 100%)",
        animation: "beamPulse 2.5s ease-in-out infinite",
        transform: "translateX(-50%)",
        filter: "blur(5px)",
        pointerEvents: "none",
      }}
    />
    {/* Glow dot at projector base */}
    <div
      style={{
        position: "absolute",
        bottom: -84,
        left: "50%",
        transform: "translateX(-50%)",
        width: 56,
        height: 7,
        borderRadius: "50%",
        background: "rgba(0,229,176,0.7)",
        filter: "blur(7px)",
        pointerEvents: "none",
      }}
    />
  </div>
);

// ─────────────────────────────────────────────────────────
// Cycles through role titles (starts only when enabled)
// ─────────────────────────────────────────────────────────
const TITLES = [
  "Fullstack Developer",
  "AI Engineer",
  "ML Engineer",
  "Data Science Explorer",
];

function useTypewriter(enabled) {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const full = TITLES[idx];
    let t;
    if (!deleting && typed === full) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && typed === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % TITLES.length);
    } else {
      t = setTimeout(
        () => setTyped(deleting ? typed.slice(0, -1) : full.slice(0, typed.length + 1)),
        deleting ? 44 : 88
      );
    }
    return () => clearTimeout(t);
  }, [typed, deleting, idx, enabled]);

  return typed;
}

// ─────────────────────────────────────────────────────────
// Main Hero
// ─────────────────────────────────────────────────────────
export default function Hero() {
  const navigate = useNavigate();
  const typed = useTypewriter(true);

  // ── CRT boot ──────────────────────────────────────────
  const [crtDone, setCrtDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setCrtDone(true), 1000);
    return () => clearTimeout(t);
  }, []);

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
      starsRef.current = Array.from({ length: 140 }, () => {
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

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
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
        // Spring back to origin
        s.vx += (s.baseX - s.x) * 0.007;
        s.vy += (s.baseY - s.y) * 0.007;
        // Damping
        s.vx *= 0.88;
        s.vy *= 0.88;
        s.x += s.vx;
        s.y += s.vy;

        const op =
          s.opacity * (0.5 + 0.5 * Math.sin(t * 0.001 * s.twinkle + s.phase));
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

  // ── Click particle burst ───────────────────────────────
  const [particles, setParticles] = useState([]);

  const handleClick = useCallback((e) => {
    const burst = Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const speed = 45 + Math.random() * 65;
      return {
        id: `${Date.now()}-${i}`,
        x: e.clientX,
        y: e.clientY,
        tx: Math.cos(angle) * speed,
        ty: Math.sin(angle) * speed,
        color: i % 2 === 0 ? "#00e5b0" : "#a855f7",
        size: 3 + Math.random() * 3,
      };
    });
    setParticles((p) => [...p, ...burst]);
    setTimeout(
      () => setParticles((p) => p.filter((x) => !burst.find((b) => b.id === x.id))),
      700
    );
  }, []);

  // ── Navigation ─────────────────────────────────────────
  const go = (path) => (e) => { e.stopPropagation(); navigate(path); };
  const open = (url) => (e) => { e.stopPropagation(); window.open(url, "_blank"); };

  return (
    <section
      className="hero-page starry-bg"
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#0a0f1e",
        overflow: "hidden",
      }}
      onClick={handleClick}
    >
      {/* Canvas star field */}
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      />

      {/* CRT boot */}
      {!crtDone && <CRTBoot />}

      {/* Click particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: p.color,
            pointerEvents: "none",
            zIndex: 9998,
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
            animation: "particleFly 0.7s ease-out forwards",
            boxShadow: `0 0 6px ${p.color}`,
          }}
        />
      ))}

      {/* Top nav buttons */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          right: 16,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button onClick={go("/about")} style={topBtnStyle}>About</button>
        <button onClick={go("/contact")} style={topBtnStyle}>Contact Me</button>
      </div>

      {/* Main layout */}
      <div className="hero-main-layout">
        {/* ── Left: text ─────────────────────────────────── */}
        <div className="hero-text-block">
          <div style={{ animation: "slideInLeft 0.5s ease-out 0.8s both" }}>
            <div
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "clamp(9px, 1.1vw, 12px)",
                color: "#00e5b088",
                marginBottom: "0.3rem",
                letterSpacing: "3px",
              }}
            >
              I&apos;m
            </div>
            <div style={{ filter: "drop-shadow(0 0 8px rgba(0,229,176,0.7))", marginBottom: "1.2rem" }}>
              <pre
                className="figlet-heading"
                style={{
                  fontFamily: "monospace",
                  fontSize: "clamp(4.5px, 0.85vw, 7.5px)",
                  lineHeight: 1.18,
                  color: "#00e5b0",
                  margin: 0,
                  padding: 0,
                  background: "none",
                  border: "none",
                  whiteSpace: "pre",
                  letterSpacing: 0,
                }}
              >{`███╗   ██╗ █████╗ ███╗   ███╗██████╗  █████╗ ████████╗██╗  ██╗ █████╗
████╗  ██║██╔══██╗████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝██║  ██║██╔══██╗
██╔██╗ ██║███████║██╔████╔██║██████╔╝███████║   ██║   ███████║███████║
██║╚██╗██║██╔══██║██║╚██╔╝██║██╔══██╗██╔══██║   ██║   ██╔══██║██╔══██║
██║ ╚████║██║  ██║██║ ╚═╝ ██║██║  ██║██║  ██║   ██║   ██║  ██║██║  ██║
╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝`}</pre>
            </div>
          </div>

          {/* Subtitle typewriter */}
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(10px, 1.4vw, 16px)",
              color: "#a855f7",
              marginBottom: "1.8rem",
              minHeight: "2.2em",
              letterSpacing: "1px",
              animation: "fadeIn 0.4s ease-out 0.8s both",
            }}
          >
            {typed}
            <span className="typewriter-caret">_</span>
          </div>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#9ca3af",
              fontSize: "clamp(15px, 1.4vw, 20px)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
              animation: "slideInLeft 0.5s ease-out 1.0s both",
            }}
          >
            I'm a fullstack developer with a keen interest in AI, Machine
            Learning and Data Science.
          </p>

          {/* Nav links */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(12px, 1.3vw, 17px)",
              animation: "slideInLeft 0.5s ease-out 1.1s both",
            }}
          >
            {[
              { label: "Experience", fn: go("/projects") },
              { label: "Skills",   fn: go("/skills") },
              { label: "Resume",   fn: open("/Namratha Resume.pdf") },
            ].map(({ label, fn }) => (
              <span
                key={label}
                onClick={fn}
                className="hero-nav-link"
                style={{
                  color: "#00e5b0",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  userSelect: "none",
                }}
              >
                <span style={{ color: "#00e5b060" }}>➤</span> {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: avatar ───────────────────────────────── */}
        <div className="hero-avatar-block">
          <AvatarHologram />
        </div>
      </div>

      {/* Social icons */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 28,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          fontSize: 22,
          color: "#00e5b0",
        }}
      >
        <FaGithub
          className="social-icon"
          onClick={open("https://github.com/NamrathaPed")}
        />
        <FaLinkedin
          className="social-icon"
          onClick={open("https://www.linkedin.com/in/namratha-peddamalla")}
        />
      </div>
    </section>
  );
}

const topBtnStyle = {
  fontFamily: "'Press Start 2P', monospace",
  fontSize: 10,
  color: "#0a0f1e",
  backgroundColor: "#00e5b0",
  border: "none",
  padding: "8px 16px",
  borderRadius: 4,
  letterSpacing: "0.5px",
};
