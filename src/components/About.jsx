import {Tile} from "./tile";
import "./starry.css";
export const About=()=> {
    return (
        <section className="flex min-h-screen starry-bg bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800">
        
        
        <Tile
        title= "About Me"
        subtitle=" A little more about me"
        description="Hi, Im Namratha, a recent Masters graduate in Information Systems from DePaul University with a GPA of 3.8/4.0. I’m passionate about data, AI, and problem-solving, and I enjoy building intelligent systems that make technology more practical and human-centered.

        Ive worked on projects ranging from an AI-powered resume analyzer and AI code debugger to an e-commerce fraud detection system and an image search and recognition tool. Recently, I’ve been diving deeper into Generative AI, LLMs, and agentic AI systems while also strengthening my foundations in data analysis, C++, SQL, and software engineering.

        My skillset spans Python, Java, R, SQL, Tableau, Power BI, TensorFlow, PyTorch, and cloud computing, along with hands-on experience in Agile/Scrum environments. Beyond technical skills, I bring strong problem-solving, adaptability, and communication—qualities I continue to refine while applying to both data analyst and software engineer roles."
        className="flex flex-col p-10"
        />

        </section>
    )

}