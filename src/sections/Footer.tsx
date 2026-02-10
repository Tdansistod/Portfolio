import { ExternalLink, ArrowUpRight, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a5e] to-[#0f0f3a]" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#024de6]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#00d4ff]/10 rounded-full blur-3xl" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
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
              <div>
                <h3 className="text-white font-bold text-lg">
                  Waltersdorf Lautaro
                </h3>
                <p className="text-white/60 text-sm">
                  Full Stack Developer & UI/UX Designer
                </p>
              </div>
            </div>

            <p className="text-white/70 max-w-md mb-6 leading-relaxed">
              Creando experiencias digitales excepcionales con código limpio y
              diseño intuitivo. Disponible para proyectos freelance y
              colaboraciones.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-3">
              {[
                { id: "projects", label: "Proyectos" },
                { id: "experience", label: "Experiencia" },
                { id: "education", label: "Educación" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-bold text-xl mb-2">
                ¿Tienes un proyecto en mente?
              </h4>
              <p className="text-white/60">
                Hablemos sobre cómo puedo ayudarte a hacerlo realidad.
              </p>
            </div>
            <a
              href="https://wa.me/+541144400101"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-[#024de6] hover:bg-[#0235b3] text-white px-8 py-4 rounded-full text-base font-semibold flex items-center gap-2 whitespace-nowrap"
            >
              Contactar
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-8 border-t border-white/10">
          {/* Contact info */}
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:lautaronuriel@gmail.com"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">lautaronuriel@gmail.com</span>
            </a>
            <span className="flex items-center gap-2 text-white/60">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Buenos Aires, Argentina</span>
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 text-sm group"
          >
            Volver arriba
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
              <ArrowUpRight className="w-4 h-4 rotate-[-45deg]" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
