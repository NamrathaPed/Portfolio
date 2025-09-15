import { FaGithub, FaKaggle} from "react-icons/fa"
import { TbWorldWww } from "react-icons/tb"


export const ProjectTile = ({
        title,
        stack,
        description,
        imagePath,
        githubURL,
        liveURL
    }
        ) => {
    return (
        <div className="space-y-6 xl:flex w-[350px] h-[600px] shadow-4xl bg-slate-800 hover:border-2 hover:border-teal-300 shadow-[0_0_15px_#14b8a6] hover:scale-105 transition-transform p-10 rounded-xl scroll-smooth">
            <div className="flex flex-shrink-0 space-y-4 flex-col basis-64 text-center items-center">
                <h1 className="text-4xl font-['Press_Start_2P'] text-teal-300">{title}</h1>
                <p className=" text-violet-500">{stack}</p>
                <div className="flex justify-center ">
                <img className="max-w-[100%] min-w-[80%] aspect-video max-h-auto" src={imagePath} alt={title}/>
            </div>
                <p className="w-4/5 text-teal-300">{description}</p>
                <div className="flex lg:justify-start justify-center space-x-2">
                    {liveURL && <a href={liveURL} target="_blank" rel="noreferrer noopener" className="flex space-x-2 items-center w-max  bg-teal-300 hover:teal-500 hover:text-black px-6 py-3 rounded-xl">
                        <FaKaggle/>
                        <p>Notebook</p>
                    </a>}
                    {githubURL && <a href={githubURL} target="_blank" rel="noreferrer noopener" className="flex space-x-2 items-center w-max bg-teal-300 hover:teal-500 hover:text-black px-6 py-3 rounded-xl">
                        <FaGithub/>
                        <p>Repo</p>
                    </a>}
                </div>
            </div>
            
        </div>
    )
}