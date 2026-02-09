import { useState, useEffect } from "react";
import { ExternalLink, Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-4">
        <nav
          className={`rounded-full px-4 py-2 flex items-center justify-between max-w-7xl mx-auto transition-all duration-500 ${
            isScrolled ? "glass-dark shadow-lg" : "bg-[#1a1a5e]"
          }`}
        >
          {/* Left side - Logo and Nav */}
          <div className="flex items-center gap-2 md:gap-6">
            {/* Logo with animation */}
            <div className="relative group">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <svg width="25" height="25" viewBox="0 0 50 54" fill="none">
                  <path
                    d="M3.93272 47.5899C-2.65265 33.1997 0.883942 2.46798 1.4937 1.55335C2.10345 0.638713 7.89614 1.85823 7.89614 3.07774C7.89614 4.29725 5.76199 40.2729 8.50589 40.2729C10.64 40.2729 15.823 16.1875 20.701 6.73627C22.2254 5.82164 27.4083 6.73627 27.4083 8.56554C26.4937 16.1875 26.1888 40.2729 28.6278 41.1875C30.4571 41.8735 38.0791 5.82164 42.3474 1.55335C43.5669 0.943592 47.8352 1.55335 47.8352 3.38262C43.5669 13.4436 35.64 36.9192 32.2864 52.468C31.9604 53.9794 27.2254 53.1997 25.2742 51.2485C22.8352 48.8094 21.3108 22.5899 21.3108 21.3704C21.3108 21.3704 20.2742 20.7607 19.7864 21.9802C19.1766 23.5046 11.5547 49.7241 10.64 50.6387C9.72541 51.5533 4.44085 48.7078 3.93272 47.5899Z"
                    fill="black"
                  />
                  <path
                    d="M6.09758 46.3559C-0.48779 31.9657 3.0488 1.23397 3.65855 0.319339C4.26831 -0.595295 10.061 0.624218 10.061 1.84373C10.061 3.06324 7.92685 39.0388 10.6708 39.0388C12.8049 39.0388 17.9878 14.9535 22.8659 5.50226C24.3903 4.58763 29.5732 5.50226 29.5732 7.33153C28.6586 14.9535 28.3537 39.0388 30.7927 39.9535C32.622 40.6395 40.2439 4.58763 44.5122 0.319339C45.7317 -0.290417 50 0.319339 50 2.14861C45.7317 12.2096 37.8049 35.6852 34.4512 51.234C34.1252 52.7454 29.3903 51.9657 27.439 50.0145C25 47.5754 23.4756 21.3559 23.4756 20.1364C23.4756 20.1364 22.439 19.5267 21.9512 20.7462C21.3415 22.2706 13.7195 48.4901 12.8049 49.4047C11.8903 50.3193 6.60571 47.4738 6.09758 46.3559Z"
                    fill="#024DE6"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-30 animate-pulse-glow rounded-full" />
            </div>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { id: "projects", label: "Proyectos" },
                { id: "experience", label: "Experiencia" },
                { id: "education", label: "Educación" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-4 py-2 text-white text-sm font-medium rounded-full overflow-hidden group transition-all duration-300 hover:bg-white/10"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#024de6] transition-all duration-300 group-hover:w-1/2" />
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Name and CTA */}
          <div className="flex items-center gap-2 md:gap-4">
            <span className="hidden lg:block text-white text-sm opacity-80">
              Waltersdorf Lautaro •{" "}
              <span className="text-[#00d4ff]">Diseñador y Desarrollador</span>
            </span>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <a
              href="https://wa.me/+541144400101"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex btn-primary bg-[#024de6] hover:bg-[#0235b3] text-white px-5 py-2.5 rounded-full text-sm font-medium items-center gap-2"
            >
              Contactar
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`md:hidden mt-2 glass-dark rounded-2xl overflow-hidden transition-all duration-500 max-w-7xl mx-auto ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 space-y-2">
            {[
              { id: "projects", label: "Proyectos" },
              { id: "experience", label: "Experiencia" },
              { id: "education", label: "Educación" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left px-4 py-3 text-white text-sm font-medium rounded-xl hover:bg-white/10 transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://wa.me/+541144400101"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#024de6] text-white px-4 py-3 rounded-xl text-sm font-medium mt-2"
            >
              Contactar
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
