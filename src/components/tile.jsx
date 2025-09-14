
export const Tile=({title, subtitle, description, className}) => {
    return (
        <div className ={`flex justify-center items-center rounded-xl p-10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 shadow-[0_0_15px_#14b8a6] border-4 border-teal-400 my-[100px] mx-[200px] ${className}`}>
            <h1 className="text-4xl text-center text-teal-300 font-['Press_Start_2P'] mb-10">{title}</h1>
            <p className="text-xl text-center text-violet-800 font-mono mb-10">{subtitle}</p>
            <p className="text-xl text-center font-mono text-teal-300 flex justify-center overflow-auto ">{description}</p>
        </div>
    )
}