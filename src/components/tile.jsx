export const Tile = ({ title, subtitle, description, className }) => {
    return (
      <div className={`flex flex-col justify-center items-center rounded-xl p-10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 shadow-[0_0_15px_#14b8a6] border-4 border-teal-400 ${className}`}>
        <h1 className="text-4xl text-center text-teal-300 font-['Press_Start_2P'] mb-10 ">{title}</h1>
        {subtitle && (
          <p className="text-xl text-center text-violet-500 font-mono mb-6">{subtitle}</p>
        )}
        <div className="w-full text-teal-300 font-mono">
          {description}
        </div>
      </div>
    )
  }
  