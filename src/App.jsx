import './index.css'
import Hero from './components/Hero'
import Contact from './components/Contact'
import Aboutme from './components/Aboutme'
export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-teal-300 font-mono overflow-x-hidden">
      {/* Hero Section */}
      <Hero /> 
      <Contact />
      <Aboutme />
    </div>
  );
}
