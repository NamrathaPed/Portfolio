import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { AiFillHome } from "react-icons/ai";
import { RiArrowLeftWideLine } from "react-icons/ri";
import "./starry.css";
import "./contact.css";
import "./projects.css";

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const Contact = () => {
  const navigate = useNavigate();

  // ── Canvas stars with mouse repulsion (matches About/Projects) ──
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

  // ── Form state ────────────────────────────────────────────────
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  // "idle" | "sending" | "fading" | "success"
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");

    emailjs.send(
      "service_xpdmmsb",
      "template_uade7ua",
      { from_name: form.name, from_email: form.email, name: form.name, email: form.email, message: form.message },
      "C7Awyfpt1kYXh9a2R"
    ).then(() => {
      setStatus("fading");
      setTimeout(() => setStatus("success"), 350);
    }).catch(() => {
      setStatus("idle");
      alert("Failed to send message. Please try again.");
    });
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'Press Start 2P', monospace",
    fontSize: "9px",
    color: "#a855f7",
    marginBottom: "8px",
    letterSpacing: "0.3px",
  };

  return (
    <section
      className="starry-bg"
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#0a0f1e",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
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

      {/* ── Page content ──────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
          width: "100%",
          padding: "0 24px",
          marginTop: "72px",
          marginBottom: "40px",
        }}
      >
        {/* Social buttons */}
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="https://github.com/NamrathaPed"
            className="contact-social-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/namratha-peddamalla"
            className="contact-social-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        </div>

        {/* ── Contact card ──────────────────────────────────── */}
        <div
          style={{
            background: "#0d1526",
            border: "2px solid #00e5b0",
            borderRadius: "12px",
            boxShadow: "0 0 28px rgba(0,229,176,0.22), 0 0 60px rgba(0,229,176,0.08)",
            maxWidth: "520px",
            width: "100%",
            padding: "40px 36px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Card CRT scanline */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              pointerEvents: "none",
              borderRadius: "12px",
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,229,176,0.02) 3px, rgba(0,229,176,0.02) 4px)",
            }}
          />

          {/* Card body */}
          <div style={{ position: "relative", zIndex: 2 }}>
            {status === "success" ? (

              /* ── Success state ─────────────────────────────── */
              <div
                className="contact-success"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "24px",
                  padding: "20px 0",
                }}
              >
                {/* Animated checkmark circle */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    border: "2px solid #00e5b0",
                    background: "rgba(0,229,176,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 22px rgba(0,229,176,0.35)",
                  }}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="#00e5b0"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path className="contact-check-path" d="M10 24 L20 34 L38 14" />
                  </svg>
                </div>

                {/* Heading */}
                <h2
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "13px",
                    color: "#00e5b0",
                    textAlign: "center",
                    lineHeight: 1.8,
                    letterSpacing: "0.5px",
                    margin: 0,
                  }}
                >
                  Message Transmitted!
                </h2>

                {/* Blinking subtitle */}
                <div
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "7px",
                    color: "#a855f7",
                    textAlign: "center",
                    lineHeight: 2.4,
                    letterSpacing: "0.3px",
                  }}
                >
                  <div>&gt; Signal received successfully</div>
                  <div>
                    &gt; I&apos;ll get back to you soon
                    <span className="contact-blink">_</span>
                  </div>
                </div>
              </div>

            ) : (

              /* ── Form state ─────────────────────────────────── */
              <div className={status === "fading" ? "contact-form-fadeout" : ""}>

                {/* Heading */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <div style={{ filter: "drop-shadow(0 0 8px rgba(0,229,176,0.7))", display: "inline-block" }}>
                    <pre className="figlet-heading" style={{ fontFamily: "monospace", fontSize: "clamp(3.5px, 0.7vw, 6px)", lineHeight: 1.18, color: "#00e5b0", margin: 0, padding: 0, background: "none", border: "none", whiteSpace: "pre", letterSpacing: 0 }}>{` ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗  ██████╗████████╗    ███╗   ███╗███████╗
██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝    ████╗ ████║██╔════╝
██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║        ██║       ██╔████╔██║█████╗
██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║        ██║       ██║╚██╔╝██║██╔══╝
╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╗   ██║       ██║ ╚═╝ ██║███████╗
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝       ╚═╝     ╚═╝╚══════╝`}</pre>
                  </div>
                </div>

                {/* Gradient divider */}
                <div
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(to right, transparent, rgba(0,229,176,0.4), transparent)",
                    marginBottom: "28px",
                  }}
                />

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "18px" }}
                >
                  {/* Name */}
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input
                      type="text"
                      className="contact-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      className="contact-input"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      className="contact-input"
                      placeholder="What would you like to say?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    style={{
                      width: "100%",
                      background: status === "sending" ? "rgba(0,229,176,0.65)" : "#00e5b0",
                      border: "none",
                      borderRadius: "20px",
                      padding: "13px",
                      color: "#0a0f1e",
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "9px",
                      letterSpacing: "0.5px",
                      cursor: status === "sending" ? "not-allowed" : "pointer",
                      marginTop: "4px",
                      transition: "background 0.2s",
                    }}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
