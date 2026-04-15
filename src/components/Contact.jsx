import { NavigationButtons } from "./NavigationButtons";
import "./starry.css";
import "./projects.css";
export const Contact=() => {
    return (
    <section className="flex min-h-screen justify-center items-center starry-bg">
        <NavigationButtons />
        <div className="flex flex-col max-w-xl w-xl mx-auto p-8 bg-[#111827] rounded-xl shadow-[0_0_15px_#00e5b0] border-4 border-[#00e5b0]">
            <h1 className="stage-header-text" style={{ color: "#00e5b0", fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(18px, 4vw, 34px)", letterSpacing: "2px", marginBottom: "16px", textAlign: "center" }}>Contact Me</h1>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "24px" }}>
              <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, #00e5b030)" }} />
              <span style={{ color: "#00e5b040", fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>◆</span>
              <div style={{ height: "1px", width: "120px", background: "linear-gradient(to right, #00e5b030, #a855f730, #00e5b030)" }} />
              <span style={{ color: "#00e5b040", fontFamily: "'Press Start 2P', monospace", fontSize: "8px" }}>◆</span>
              <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, #00e5b030)" }} />
            </div>
            <form action="">
                <div className="mb-4">
                <label htmlFor="Your Name" className="block text-[#a855f7] font-mono items- center justify-center mb-2">Name</label>
                <input placeholder="John Doe" className= "w-full px-3 py-2 border-rounded border-[#a855f7] rounded-lg bg-slate-800 text-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]"/>
                </div>
                <div className="mb-4">
                <label htmlFor="Your Email" className="block text-[#a855f7] font-mono mb-2">Email</label>
                <input placeholder="johndoe@example.com" className= "w-full px-3 py-2 border-rounded border-[#a855f7] rounded-lg bg-slate-800 text-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]"/>
                </div>
                <div className="mb-6">
                <label htmlFor="Your Message" className="block text-[#a855f7] font-mono mb-2">Message</label>
                <textarea rows="4" placeholder="Type your message here..." className= "w-full px-3 py-2 border-rounded border-[#a855f7] rounded-lg bg-slate-800 text-[#a855f7] focus:outline-none focus:ring-2 focus:ring-[#a855f7]"/>
                </div>
                <div className="flex justify-center mb-2">
                    <button type="submit" className="bg-[#00e5b0] hover:bg-[#00c49a] text-black font-mono font-bold px-4 py-2 rounded-lg text-lg">Send Message</button>
                </div>      
                
            </form>
            </div>  

    </section>
    )
}