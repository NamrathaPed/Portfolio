import { useEffect, useRef } from "react";
import { NavigationButtons } from "./NavigationButtons";
import "./starry.css";
import "./projects.css";

export const Contact = () => {
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
    <section className="flex min-h-screen justify-center items-center starry-bg px-4 pt-20 pb-10" style={{ position: "relative", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />
      <NavigationButtons />
      <div className="flex flex-col max-w-xl w-full mx-auto p-6 sm:p-8 bg-[#111827] rounded-xl shadow-[0_0_15px_#00e5b0] border-2 border-[#00e5b0]" style={{ position: "relative", zIndex: 1 }}>
        <h1 className="stage-header-text" style={{ color: "#00e5b0", fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(18px, 4vw, 34px)", letterSpacing: "2px", marginBottom: "16px", textAlign: "center" }}>Contact Me</h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #00e5b030)" }} />
          <span style={{ color: "#00e5b040", fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>◆</span>
          <div style={{ height: "1px", width: "120px", background: "linear-gradient(to right, #00e5b030, #a855f730, #00e5b030)" }} />
          <span style={{ color: "#00e5b040", fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>◆</span>
          <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #00e5b030)" }} />
        </div>
        <form action="">
          <div className="mb-4">
            <label htmlFor="Your Name" className="block text-[#a855f7] font-mono items-center justify-center mb-2">Name</label>
            <input placeholder="John Doe" className="w-full px-3 py-2 border-rounded border-[#a855f7] rounded-lg bg-slate-800 text-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]" />
          </div>
          <div className="mb-4">
            <label htmlFor="Your Email" className="block text-[#a855f7] font-mono mb-2">Email</label>
            <input placeholder="johndoe@example.com" className="w-full px-3 py-2 border-rounded border-[#a855f7] rounded-lg bg-slate-800 text-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]" />
          </div>
          <div className="mb-6">
            <label htmlFor="Your Message" className="block text-[#a855f7] font-mono mb-2">Message</label>
            <textarea rows="4" placeholder="Type your message here..." className="w-full px-3 py-2 border-rounded border-[#a855f7] rounded-lg bg-slate-800 text-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]" />
          </div>
          <div className="flex justify-center mb-2">
            <button type="submit" className="bg-[#00e5b0] hover:bg-[#00c49a] text-black font-mono font-bold px-4 py-2 rounded-lg text-lg">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  );
};
