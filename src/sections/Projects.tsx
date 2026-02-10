import { useEffect, useRef, useState } from "react";
import { Globe, ExternalLink, ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Electrodel",
    subtitle: "Electricidad e Iluminación",
    description:
      "Desarrollo de un eCommerce a medida para el negocio Electrodel, construido con Next.js. La plataforma incluye un panel de administración con autenticación, desde el cual se gestionan ventas, productos, pedidos, configuración y un resumen general mediante tablas interactivas estilo Excel. Los clientes pueden crear una cuenta, guardar sus datos de envío y realizar compras de forma segura gracias a la integración con Mercado Pago.",
    image: "/project-electrodel.webp",
    tags: ["SSR", "CSR"],
    link: "https://electrodel.com.ar",
    color: "#ef4444",
  },
  {
    id: 2,
    title: "CTBAy",
    subtitle: "Teatro",
    description:
      "Desarrollo de una plataforma web para un teatro utilizando funciones en JavaScript creadas a mano para la generación dinámica de HTML y CSS. El proyecto implementa ISR (Incremental Static Regeneration) junto con GitHub Actions para la automatización de builds y despliegues. La gestión de contenidos se realiza mediante un panel administrativo en Sanity.io, permitiendo actualizar la información de forma simple y centralizada.",
    image: "/project-ctbay.webp",
    tags: ["ISR"],
    link: "https://ctbay.ar",
    color: "#a855f7",
  },
  {
    id: 3,
    title: "Walter Burgers",
    subtitle: "Hamburguesería",
    description:
      "Desarrollo de un sitio modelo tipo landing page para una hamburguesería ficticia llamada Walterburgers, creado con el objetivo de demostrar diseño visual y creatividad. El proyecto destaca por el uso de efectos 3D interactivos con Atropos.js, combinados con imágenes transparentes especialmente diseñadas y editadas para potenciar la profundidad visual, así como videos integrados al diseño. A pesar del uso de efectos avanzados, el sitio mantiene una buena performance, logrando un equilibrio entre impacto visual y optimización.",
    image: "/project-walterburgers.webp",
    tags: ["CSR"],
    link: "https://walter-burgers.vercel.app/",
    color: "#f97316",
  },
];

const Projects = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      {/* Section background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#024de6]/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16 transition-all duration-700 opacity-100 translate-y-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#024de6]/10 flex items-center justify-center">
              <Globe className="w-6 h-6 text-[#024de6]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black-900">
              Proyectos
            </h2>
          </div>
          <p className="text-black-600 text-center max-w-xl">
            Una selección de proyectos que demuestran mi experiencia en
            desarrollo web y diseño de interfaces.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-20">
          {projects.map((project, index) => (
            <div
              key={project.id}
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
              {/* Project Card */}
              <div
                className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image Container */}
                <div
                  className={`relative overflow-hidden rounded-2xl ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  {/* Background glow effect */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-3xl`}
                    style={{ backgroundColor: project.color }}
                  />

                  {/* Image */}
                  <div className="relative overflow-hidden rounded-2xl aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* View button */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 bg-white text-black-900 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#024de6] hover:text-white"
                    >
                      Ver proyecto
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Decorative corner */}
                  <div
                    className="absolute -bottom-2 -right-2 w-20 h-20 border-r-2 border-b-2 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ borderColor: project.color }}
                  />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-black-900 mb-1 group-hover:text-[#024de6] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span
                      className="text-sm font-medium"
                      style={{ color: project.color }}
                    >
                      {project.subtitle}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-black-600 leading-relaxed mb-6 text-sm md:text-base">
                    {project.description
                      .split(
                        /\b(Next\.js|Excel|Mercado Pago|JavaScript|HTML|CSS|ISR|GitHub Actions|Sanity\.io|Atropos\.js)\b/,
                      )
                      .map((part, i) =>
                        [
                          "Next.js",
                          "Excel",
                          "Mercado Pago",
                          "JavaScript",
                          "HTML",
                          "CSS",
                          "ISR",
                          "GitHub Actions",
                          "Sanity.io",
                          "Atropos.js",
                        ].includes(part) ? (
                          <span
                            key={i}
                            className="font-semibold text-[#024de6] bg-[#024de6]/10 px-1 rounded"
                          >
                            {part}
                          </span>
                        ) : (
                          part
                        ),
                      )}
                  </p>

                  {/* Tags */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-sm text-black-500">Renderizado:</span>
                    <div className="flex gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-semibold text-[#024de6] border-2 border-[#024de6]/30 rounded-full hover:bg-[#024de6] hover:text-white hover:border-[#024de6] transition-all duration-300 cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#024de6] font-semibold group/link"
                  >
                    <span className="relative">
                      Visitar sitio
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#024de6] transition-all duration-300 group-hover/link:w-full" />
                    </span>
                    <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
