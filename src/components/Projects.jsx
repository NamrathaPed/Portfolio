import { NavigationButtons } from "./NavigationButtons";
import { memo } from "react"
import { ProjectTile } from "./ProjectTile"

export const Projects = memo(() => {

  const projectsData = [
    {
        title: "Resume Analyzer", 
        stack: "Python, Natural Language Processing (NLP), Large Language Models (LLMs), scikit-learn",
        description: "An AI-powered tool that reviews resumes, highlights key strengths, and suggests improvements. It helps job seekers create resumes that stand out to recruiters and match job descriptions more effectively.",
        imagePath: "realestate.png",
        githubURL:"https://github.com/NamrathaPed/resumean-Part-1",
        liveURL: ""
    },
    {
        title: "AI Code Debugger", 
        stack: "Python, Gemini API, Large Language Models (LLMs)",
        description: "An AI-based system that finds errors in code, explains what went wrong, and suggests possible fixes in plain language. It makes debugging faster and easier, especially for beginners who want to understand their mistakes.",
        imagePath: "AiMeet.png",
        githubURL:"https://github.com/NamrathaPed/ai_code_debugger",
        liveURL: ""
    },
    {
        title: "Gen AI Pitch Pal", 
        stack: "Python, Gemini API, RAG, Langchain, Faiss, NLP",
        description: "A generative AI tool that creates clear and professional pitch decks from simple inputs, helping founders present their ideas with ease.",
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