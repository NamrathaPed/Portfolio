import './index.css'
import Hero from './components/Hero'
//import Contact from './components/Contact'
//import About from './components/About'
export const App = () => {
  return (
    <div className="min-h-screen text-teal-300 font-mono overflow-x-hidden">
      {/* Hero Section */}
      <Hero /> 
    </div>
  );
}
