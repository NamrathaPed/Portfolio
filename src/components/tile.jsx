import "./projects.css";

export const Tile = ({ title, subtitle, description, className }) => {
    return (
      <div className={`flex flex-col justify-center items-center rounded-xl p-10 bg-[#111827] shadow-[0_0_15px_#00e5b0] border-4 border-[#00e5b0] ${className}`}>
        <h1 className="stage-header-text" style={{ color: "#00e5b0", fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(18px, 4vw, 34px)", letterSpacing: "2px", marginBottom: "16px", textAlign: "center" }}>{title}</h1>
        {title && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #00e5b030)" }} />
            <span style={{ color: "#00e5b040", fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>◆</span>
            <div style={{ height: "1px", width: "120px", background: "linear-gradient(to right, #00e5b030, #a855f730, #00e5b030)" }} />
            <span style={{ color: "#00e5b040", fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>◆</span>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #00e5b030)" }} />
          </div>
        )}
        {subtitle && (
          <p className="text-xl text-center text-[#a855f7] font-mono mb-6">{subtitle}</p>
        )}
        <div className="w-full  text-[#a855f7] font-mono">
          {description}
        </div>
      </div>
    )
  }
  