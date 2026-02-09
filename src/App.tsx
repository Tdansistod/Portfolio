import Header from './sections/Header';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Footer from './sections/Footer';
import AbstractBackground from './components/AbstractBackground';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-[#cfe6fd] relative">
      <AbstractBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Experience />
        <Education />
      </main>
      <Footer />
    </div>
  );
}

export default App;
