import { ExternalLink, Heart, ArrowUpRight, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#1a1a5e] font-bold text-xl">W</span>
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

            {/* Contact info */}
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:contact@waltersdorf.com"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@waltersdorf.com</span>
              </a>
              <span className="flex items-center gap-2 text-white/60">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Buenos Aires, Argentina</span>
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-3">
              {[
                { id: 'projects', label: 'Proyectos' },
                { id: 'experience', label: 'Experiencia' },
                { id: 'education', label: 'Educación' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-white/50 text-sm flex items-center gap-1">
            © {currentYear} Waltersdorf Lautaro. Hecho con
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            en Buenos Aires
          </p>

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
