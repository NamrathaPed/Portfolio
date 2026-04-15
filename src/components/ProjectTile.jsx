import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FaKaggle } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";

const CornerBracket = ({ pos, color }) => {
  const base = { position: "absolute", width: "14px", height: "14px" };
  const borders = {
    tl: { top: 0, left: 0, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    tr: { top: 0, right: 0, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` },
    bl: { bottom: 0, left: 0, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    br: { bottom: 0, right: 0, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` },
  };
  return <span style={{ ...base, ...borders[pos] }} />;
};

const StarRating = ({ count }) => (
  <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < count ? "#fbbf24" : "#374151", fontSize: "13px" }}>
        {i < count ? "★" : "☆"}
      </span>
    ))}
    <span style={{ color: "#4b5563", fontFamily: "Inter, sans-serif", fontSize: "11px", marginLeft: "5px" }}>
      {count}/5
    </span>
  </div>
);

export const ProjectTile = ({ stage, title, stack, description, imagePath, githubURL, liveURL, demoURL, stars, isBoss }) => {
  const [hovered, setHovered] = useState(false);

  const accent     = isBoss ? "#a855f7" : "#00e5b0";
  const glowColor  = isBoss ? "rgba(168,85,247,0.45)" : "rgba(0,229,176,0.45)";
  const glowDiffuse = isBoss ? "rgba(168,85,247,0.12)" : "rgba(0,229,176,0.12)";

  const cardStyle = {
    backgroundColor: "#111827",
    border: `1px solid ${accent}`,
    borderRadius: "4px",
    width: "320px",
    minWidth: "320px",
    flexShrink: 0,
    position: "relative",
    padding: "22px",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    transform: hovered ? "translateY(-10px)" : "translateY(0)",
    boxShadow: hovered
      ? `0 0 0 1px ${accent}, 0 0 24px 4px ${glowColor}, 0 0 60px 12px ${glowDiffuse}, 0 24px 48px rgba(0,0,0,0.6)`
      : `0 0 8px 1px ${glowDiffuse}, 0 0 0 1px ${accent}30`,
  };

  const btnBase = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "7px 18px",
    borderRadius: "9999px",
    fontSize: "10px",
    fontFamily: "'Press Start 2P', monospace",
    textDecoration: "none",
    border: `1px solid ${accent}`,
    color: accent,
    backgroundColor: "transparent",
    cursor: "pointer",
    letterSpacing: "0.5px",
  };

  const handleBtnEnter = (e) => {
    e.currentTarget.style.backgroundColor = accent;
    e.currentTarget.style.color = "#0a0f1e";
    e.currentTarget.style.boxShadow = `0 0 12px 2px ${glowColor}`;
  };
  const handleBtnLeave = (e) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = accent;
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover selector arrow */}
      <div style={{
        position: "absolute",
        left: "-22px",
        top: "50%",
        transform: "translateY(-50%)",
        color: accent,
        fontSize: "14px",
        fontFamily: "'Press Start 2P', monospace",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.2s ease",
        pointerEvents: "none",
        textShadow: `0 0 8px ${accent}`,
      }}>
        ►
      </div>

      {/* Corner brackets */}
      <CornerBracket pos="tl" color={accent} />
      <CornerBracket pos="tr" color={accent} />
      <CornerBracket pos="bl" color={accent} />
      <CornerBracket pos="br" color={accent} />

      {/* Stage + Boss badges */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{
          backgroundColor: `${accent}18`,
          color: accent,
          border: `1px solid ${accent}60`,
          padding: "3px 9px",
          fontSize: "8px",
          fontFamily: "'Press Start 2P', monospace",
          letterSpacing: "2px",
          borderRadius: "2px",
        }}>
          STAGE {stage}
        </span>
        {isBoss && (
          <span className="boss-badge" style={{
            backgroundColor: "rgba(168,85,247,0.15)",
            color: "#a855f7",
            border: "1px solid rgba(168,85,247,0.7)",
            padding: "3px 9px",
            fontSize: "8px",
            fontFamily: "'Press Start 2P', monospace",
            letterSpacing: "1px",
            borderRadius: "2px",
          }}>
            !! BOSS !!
          </span>
        )}
      </div>

      {/* Screenshot area */}
      <div style={{
        position: "relative",
        height: "160px",
        backgroundColor: "#070b14",
        border: `1px solid ${accent}25`,
        borderRadius: "2px",
        marginBottom: "18px",
        overflow: "hidden",
      }}>
        {imagePath ? (
          <img
            src={imagePath}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
          />
        ) : (
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: "8px",
          }}>
            <span style={{ fontSize: "28px", color: `${accent}40` }}>◈</span>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: `${accent}50`, letterSpacing: "1px" }}>
              SCREENSHOT
            </span>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: `${accent}35`, letterSpacing: "1px" }}>
              LOADING...
            </span>
          </div>
        )}
        {/* CRT scanline overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Title */}
      <h2 style={{
        color: accent,
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "12px",
        lineHeight: "1.7",
        marginBottom: "10px",
        transition: "text-shadow 0.3s",
        textShadow: hovered ? `0 0 10px ${accent}` : "none",
      }}>
        {title}
      </h2>

      {/* Star rating */}
      <div style={{ marginBottom: "14px" }}>
        <StarRating count={stars} />
      </div>

      {/* Tech stack pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
        {stack.map((tech, i) => (
          <span key={i} style={{
            backgroundColor: "rgba(168,85,247,0.1)",
            color: "#a855f7",
            border: "1px solid rgba(168,85,247,0.3)",
            padding: "3px 10px",
            borderRadius: "9999px",
            fontSize: "10px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
          }}>
            {tech}
          </span>
        ))}
      </div>

      {/* Description */}
      <p style={{
        color: "#9ca3af",
        fontFamily: "Inter, sans-serif",
        fontSize: "13px",
        lineHeight: "1.65",
        marginBottom: "20px",
      }}>
        {description}
      </p>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {githubURL && (
          <a
            href={githubURL}
            target="_blank"
            rel="noreferrer noopener"
            style={btnBase}
            className="project-card-btn"
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
          >
            <FaGithub size={11} />
            REPO
          </a>
        )}
        {liveURL && liveURL.includes("kaggle") && (
          <a
            href={liveURL}
            target="_blank"
            rel="noreferrer noopener"
            style={btnBase}
            className="project-card-btn"
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
          >
            <FaKaggle size={11} />
            NOTEBOOK
          </a>
        )}
        {demoURL !== undefined && (
          demoURL ? (
            <a
              href={demoURL}
              target="_blank"
              rel="noreferrer noopener"
              style={btnBase}
              className="project-card-btn"
              onMouseEnter={handleBtnEnter}
              onMouseLeave={handleBtnLeave}
            >
              <TbWorldWww size={12} />
              DEMO
            </a>
          ) : (
            <span style={{ ...btnBase, color: "#4b5563", borderColor: "#4b5563", cursor: "not-allowed" }}>
              <TbWorldWww size={12} />
              DEMO
            </span>
          )
        )}
      </div>
    </div>
  );
};
