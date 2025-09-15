import { NavigationButtons } from "./NavigationButtons";
import "./starry.css";
export const Contact=() => {
    return (
    <section className="flex min-h-screen justify-center items-center starry-bg">
        <NavigationButtons />
        <div className="flex flex-col max-w-xl w-xl mx-auto p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 rounded-xl shadow-[0_0_15px_#14b8a6] border-4 border-teal-400">
            <h1 className="text-4xl text-center text-teal-300 font-['Press_Start_2P'] mb-6 w-full">Contact Me</h1>
            <form action="">
                <div className="mb-4">
                <label htmlFor="Your Name" className="block text-violet-500 font-mono items- center justify-center mb-2">Name</label>
                <input placeholder="John Doe" className= "w-full px-3 py-2 border-rounded border-violet-500 rounded-lg bg-slate-800 text-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-700"/>
                </div>
                <div className="mb-4">
                <label htmlFor="Your Email" className="block text-violet-500 font-mono mb-2">Email</label>
                <input placeholder="johndoe@example.com" className= "w-full px-3 py-2 border-rounded border-violet-500 rounded-lg bg-slate-800 text-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-700"/>
                </div>
                <div className="mb-6">
                <label htmlFor="Your Message" className="block text-violet-500 font-mono mb-2">Message</label>
                <textarea rows="4" placeholder="Type your message here..." className= "w-full px-3 py-2 border-rounded border-violet-500 rounded-lg bg-slate-800 text-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-700"/>
                </div>
                <div className="flex justify-center mb-2">
                    <button type="submit" className="bg-teal-300 hover:bg-teal-500 text-black font-mono font-bold px-4 py-2 rounded-lg text-lg">Send Message</button>
                </div>      
                
            </form>
            </div>  

    </section>
    )
}