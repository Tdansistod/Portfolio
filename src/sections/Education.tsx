import { useEffect, useRef, useState } from "react";
import { GraduationCap, Award, Languages } from "lucide-react";

interface EducationItem {
  id: number;
  institution: string;
  status: string;
  degree: string;
  icon: string;
}

interface Language {
  name: string;
  level: string;
  progress: number;
}

const educations: EducationItem[] = [
  {
    id: 1,
    institution: "Universidad Tecnológica Nacional",
    status: "Estudiante",
    degree: "Ingeniería en Sistemas",
    icon: "🎓",
  },
  {
    id: 2,
    institution: "Henry",
    status: "Egresado",
    degree: "Desarrollador Full Stack",
    icon: "💻",
  },
  {
    id: 3,
    institution: 'Escuela Técnica N°28 "República Francesa"',
    status: "Egresado",
    degree: "Técnico en Electrónica",
    icon: "⚡",
  },
];

const languages: Language[] = [
  { name: "Español", level: "Nivel Nativo", progress: 100 },
  { name: "Inglés", level: "Nivel Avanzado", progress: 85 },
  { name: "Chino Mandarín", level: "Nivel Básico", progress: 30 },
];

const Education = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [languagesVisible, setLanguagesVisible] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const languagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" },
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLanguagesVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (languagesRef.current) {
      observer.observe(languagesRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#024de6]/30 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-56 h-56 bg-[#a855f7]/10 rounded-full opacity-60" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-[#10b981]/10 rounded-full opacity-60" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#024de6]/10 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-[#024de6]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black-900">
              Educación
            </h2>
          </div>
          <p className="text-black-600 text-center max-w-xl">
            Formación académica y certificaciones que respaldan mi experiencia
            profesional.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {educations.map((edu, index) => (
            <div
              key={edu.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              data-index={index}
              className={`group relative transition-all duration-700 ${
                visibleItems.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-full bg-white/90 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-[#024de6]/20 overflow-hidden">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#024de6]/5 via-transparent to-[#00d4ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="relative z-10 text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {edu.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-[#024de6]" />
                    <span className="text-xs font-semibold text-[#024de6] uppercase tracking-wider">
                      {edu.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-black-900 mb-2 group-hover:text-[#024de6] transition-colors duration-300">
                    {edu.institution}
                  </h3>

                  <p className="text-black-600 text-sm">{edu.degree}</p>
                </div>

                {/* Decorative corner */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#024de6]/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Languages Section */}
        <div
          ref={languagesRef}
          className={`relative transition-all duration-700 ${
            languagesVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
          }`}
        >
          <div className="bg-white/90 rounded-2xl p-8 shadow-sm border border-black-100">
            {/* Languages Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#024de6]/10 flex items-center justify-center">
                <Languages className="w-5 h-5 text-[#024de6]" />
              </div>
              <h3 className="text-2xl font-bold text-black-900">Idiomas</h3>
            </div>

            {/* Languages Grid */}
            <div className="grid sm:grid-cols-3 gap-6">
              {languages.map((lang, index) => (
                <div
                  key={lang.name}
                  className={`relative transition-all duration-500 ${
                    languagesVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${(index + 3) * 150}ms`,
                  }}
                >
                  <div className="text-center">
                    <h4 className="font-semibold text-black-900 mb-1">
                      {lang.name}
                    </h4>
                    <p className="text-sm text-black-500 mb-3">{lang.level}</p>

                    {/* Progress bar */}
                    <div className="relative h-2 bg-black-200 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#024de6] to-[#00d4ff] rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: languagesVisible ? `${lang.progress}%` : "0%",
                          transitionDelay: `${(index + 3) * 200}ms`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
