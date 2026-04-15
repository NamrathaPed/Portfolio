import "./projects.css";

export const Tile = ({ title, subtitle, description, className }) => {
    return (
      <div className={`flex flex-col justify-center items-center rounded-xl p-10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 shadow-[0_0_15px_#00e5b0] border-4 border-[#00e5b0] ${className}`}>
        <h1 className="stage-header-text" style={{ color: "#00e5b0", fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(18px, 4vw, 34px)", letterSpacing: "2px", marginBottom: "40px", textAlign: "center" }}>{title}</h1>
        {subtitle && (
          <p className="text-xl text-center text-violet-500 font-mono mb-6">{subtitle}</p>
        )}
        <div className="w-full  text-violet-500 font-mono">
          {description}
        </div>
      </div>
    )
  }
  