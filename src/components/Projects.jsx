import { NavigationButtons } from "./NavigationButtons";
import { memo } from "react"
import { ProjectTile } from "./ProjectTile"

export const Projects = memo(() => {

  const projectsData = [
    {
        title: "Resume Analyzer", 
        stack: "React, TailwindCSS, Typescript",
        description: "Experience real estate like never before with our impeccably designed landing page, featuring a stunning, seamless layout and captivating animations.",
        imagePath: "realestate.png",
        githubURL:"https://github.com/NamrathaPed/resumean-Part-1",
        liveURL: ""
    },
    {
        title: "AI Code Debugger", 
        stack: "Flutter, Firebase, Sqflite",
        description: "An AI chat app with OpenAI API and Firebase, featuring image recognition, customizable avatars, and efficient local database management, achieving 10,000+ downloads.",
        imagePath: "AiMeet.png",
        githubURL:"https://github.com/NamrathaPed/ai_code_debugger",
        liveURL: ""
    },
    {
        title: "Gen AI Pitch Pal", 
        stack: "React, Redux, Json Server, Bootstrap",
        description: "A Boat Lifestyle Website clone using React, Bootstrap, Redux, and JSON Server.",
        imagePath: "boatclone.png",
        githubURL:"",
        liveURL: "https://www.kaggle.com/code/adityagupta961/gen-ai-pitchpal-2"
    }
]


    const projectList = projectsData.map((project)=>{
        return (
            <ProjectTile 
                title={project.title}
                stack={project.stack}
                imagePath={project.imagePath}
                description={project.description}
                liveURL={project.liveURL}
                githubURL={project.githubURL}
            />
        )
    })

    return (
        <div className="min-h-screen starry-bg">
            <NavigationButtons />
            <div className="flex xl:flex-row flex-wrap justify-center gap-12 p-20">
            {projectList}
            </div>
        </div>
    )
})