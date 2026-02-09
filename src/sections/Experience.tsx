import { useEffect, useRef, useState } from "react";
import { Briefcase, Calendar, Building2 } from "lucide-react";

interface ExperienceItem {
  id: number;
  title: string;
  period: string;
  company: string;
  description: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "Diseñador y Desarrollador Full Stack",
    period: "2024 - Actualidad",
    company: "FREELANCER",
    description: [
      "Desarrollo soluciones web a medida que mejoran el rendimiento, automatizan procesos y optimizan la operación de los negocios.",
      "Diseño interfaces UI/UX responsivas con foco en usabilidad y conversión.",
      "Creo sistemas de automatización que reducen tareas manuales y optimizan flujos de trabajo utilizando tecnologías modernas.",
      "Configuro y administro servidores VPS para asegurar buen rendimiento, despliegues seguros y estabilidad.",
    ],
    skills: [
      "JavaScript (ES6+)",
      "React.js",
      "Redux",
      "Next.js (App Router)",
      "HTML5",
      "CSS3",
      "Node.js",
      "Express.js",
      "PHP",
      "MySQL",
      "PostgreSQL",
      "Git & GitHub",
      "Sanity",
      "Supabase",
      "Vercel",
      "OpenLiteSpeed",
    ],
  },
  {
    id: 2,
    title: "Diseñador y Desarrollador Full Stack",
    period: "2023 - 2023",
    company: "GO UP CLOUD (Pasantía)",
    description: [
      "Trabajé de forma remota en un equipo de cuatro desarrolladores en la construcción de una aplicación web desde cero.",
      "La aplicación gestiona procesos de producción, empleados, servicios y facturación.",
    ],
    skills: ["React.js", "PHP", "MySQL"],
  },
];

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [hoveredExp, setHoveredExp] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Section divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#024de6]/30 to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#024de6]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-[#00d4ff]/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#024de6]/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-[#024de6]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black-900">
              Experiencia
            </h2>
          </div>
          <p className="text-black-600 text-center max-w-xl">
            Mi trayectoria profesional en el mundo del desarrollo web y diseño
            de experiencias digitales.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#024de6] via-[#024de6]/50 to-transparent transform md:-translate-x-1/2" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-index={index}
                className={`relative transition-all duration-700 ${
                  visibleItems.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredExp(exp.id)}
                onMouseLeave={() => setHoveredExp(null)}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 transition-all duration-300 ${
                    hoveredExp === exp.id
                      ? "bg-[#024de6] scale-150"
                      : "bg-[#024de6]/50"
                  }`}
                  style={{ top: "24px" }}
                />

                {/* Card */}
                <div
                  className={`ml-12 md:ml-0 ${
                    index % 2 === 0
                      ? "md:mr-[50%] md:pr-12"
                      : "md:ml-[50%] md:pl-12"
                  }`}
                >
                  <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-[#024de6]/20">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#024de6]/5 to-[#00d4ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-black-900 mb-2 group-hover:text-[#024de6] transition-colors duration-300">
                            {exp.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-black-500">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-[#024de6]" />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Building2 className="w-4 h-4 text-[#024de6]" />
                              {exp.company}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <ul className="space-y-3 mb-6">
                        {exp.description.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-black-600 text-sm md:text-base"
                          >
                            <span className="w-1.5 h-1.5 bg-[#024de6] rounded-full mt-2 flex-shrink-0" />
                            <span>
                              {item
                                .split(
                                  /\b(soluciones web a medida|interfaces UI\/UX responsivas|sistemas de automatización|servidores VPS)\b/,
                                )
                                .map((part, j) =>
                                  [
                                    "soluciones web a medida",
                                    "interfaces UI/UX responsivas",
                                    "sistemas de automatización",
                                    "servidores VPS",
                                  ].includes(part) ? (
                                    <span
                                      key={j}
                                      className="font-semibold text-[#024de6]"
                                    >
                                      {part}
                                    </span>
                                  ) : (
                                    part
                                  ),
                                )}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 text-xs font-medium text-[#024de6] bg-[#024de6]/10 rounded-full hover:bg-[#024de6] hover:text-white transition-all duration-300 cursor-default"
                            style={{
                              transitionDelay: `${skillIndex * 50}ms`,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
