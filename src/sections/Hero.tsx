import { useEffect, useRef, useState } from "react";
import { ChevronDown, Code2, Palette, Sparkles } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Waltersdorf Lautaro";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [isVisible]);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-[10%] w-32 h-32 border border-[#024de6]/20 rounded-full animate-rotate-slow" />
      <div className="absolute bottom-1/4 right-[15%] w-24 h-24 border border-[#024de6]/20 rotate-45 animate-bounce-subtle" />
      <div className="absolute top-1/3 right-[20%] w-4 h-4 bg-[#024de6]/30 rounded-full animate-pulse" />
      <div
        className="absolute bottom-1/3 left-[15%] w-3 h-3 bg-[#00d4ff]/40 rounded-full animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Floating icons */}
      <div
        className={`absolute top-[30%] left-[8%] transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: "0.8s" }}
      >
        <Code2 className="w-8 h-8 text-[#024de6]/30 animate-float" />
      </div>
      <div
        className={`absolute top-[25%] right-[12%] transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: "1s" }}
      >
        <Palette
          className="w-6 h-6 text-[#ec4899]/40 animate-float"
          style={{ animationDelay: "-2s" }}
        />
      </div>
      <div
        className={`absolute bottom-[35%] left-[12%] transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: "1.2s" }}
      >
        <Sparkles
          className="w-7 h-7 text-[#feca57]/50 animate-float"
          style={{ animationDelay: "-4s" }}
        />
      </div>

      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Pre-title */}
        <div
          className={`mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[#024de6] font-medium">
            <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
            Disponible para proyectos
          </span>
        </div>

        {/* Main title with typing effect */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          <span className="gradient-text">{typedText}</span>
          <span className="animate-pulse text-[#024de6]">|</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-xl sm:text-2xl md:text-3xl text-black-700 mb-8 font-light transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <span className="relative">
            Diseñador y Desarrollador{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[#024de6] font-semibold">
                Full Stack
              </span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#024de6]/20 -skew-x-6" />
            </span>
          </span>
        </p>

        {/* Description */}
        <p
          className={`text-black-600 text-lg max-w-2xl mx-auto mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          Creando experiencias digitales únicas con código limpio y diseño
          intuitivo. Especializado en React, Next.js y soluciones web a medida.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "0.8s" }}
        >
          <button
            onClick={scrollToProjects}
            className="btn-primary bg-[#024de6] text-white px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 group"
          >
            Ver Proyectos
            <ChevronDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
          </button>
          <a
            href="https://wa.me/+541144400101"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full text-base font-semibold border-2 border-[#024de6] text-[#024de6] hover:bg-[#024de6] hover:text-white transition-all duration-300"
          >
            Contactar
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
