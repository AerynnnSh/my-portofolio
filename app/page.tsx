"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Link as LinkIcon,
  X,
  Github,
  ExternalLink,
} from "lucide-react";
import { FaFigma, FaGithub } from "react-icons/fa";
import {
  SiVercel,
  SiNextdotjs,
  SiTailwindcss,
  SiCanva,
  SiSupabase,
  SiPhp,
  SiMysql,
  SiHtml5,
  SiCss3,
  SiJavascript,
} from "react-icons/si";

// Tipe data untuk Project
type Project = {
  title: string;
  tags: string[];
  shortDesc: string;
  longDesc: string;
  image: string;
  icons: React.ReactNode[];
  links: {
    demo?: string;
    github?: string;
    figma?: string;
  };
};

export default function Home() {
  const [time, setTime] = useState<string>("00:00:00");
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 1. UPDATE WAKTU
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      });
      setTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // 2. NAV OBSERVER
    const navOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    }, navOptions);

    if (heroRef.current) navObserver.observe(heroRef.current);
    if (projectsRef.current) navObserver.observe(projectsRef.current);
    if (stackRef.current) navObserver.observe(stackRef.current);
    if (contactRef.current) navObserver.observe(contactRef.current);

    // 3. REVEAL ANIMATION
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 },
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      clearInterval(interval);
      navObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  const navLinks = [
    { id: "hero", label: "Hero" },
    { id: "projects", label: "Projects" },
    { id: "stack", label: "Tools" },
    { id: "contact", label: "Contact" },
  ];

  const marqueeImages = [
    "/p1.png",
    "/p2.png",
    "/p3.png",
    "/p4.png",
    "/p5.png",
    "/p6.png",
  ];
  const infiniteMarquee = [...marqueeImages, ...marqueeImages];

  // =========================================
  // DATA PROJECT
  // =========================================
  const featuredProjects: Project[] = [
    // --- CODE PROJECTS ---
    {
      title: "AlgoTerminal — Real-time Crypto Analytics",
      tags: ["Fullstack", "Next.js", "Supabase"],
      shortDesc:
        "A full-stack crypto dashboard featuring real-time market data, technical indicators (EMA/SMA), and a hybrid watchlist system.",
      longDesc:
        "AlgoTerminal is a professional-grade cryptocurrency analytics dashboard built to simulate a real trading environment. It features real-time price updates via CoinGecko API, custom-built technical indicators (EMA/SMA) calculated on the client-side, and a robust authentication system using Supabase. Users can login via GitHub to sync their watchlist across devices, while guest users enjoy a seamless experience with LocalStorage persistence.",
      image: "/algo.png",
      icons: [<SiVercel key="vercel" />, <FaGithub key="github" />],
      links: {
        demo: "https://algoterminal.vercel.app",
        github: "https://github.com/AerynnnSh/AlgoTerminal-Project",
      },
    },
    {
      title: "Uangku — RPG Finance Tracker",
      tags: ["PHP Native", "MySQL"],
      shortDesc:
        "A gamified finance tracker with a 'Dark Pixel RPG' theme. Turns boring expense tracking into an engaging visual experience.",
      longDesc:
        "Uangku transforms personal finance management into an RPG adventure. Built with Native PHP and optimized MySQLi, it reimagines Income as 'Loot' and Expenses as 'Damage'. The application features a 'Budget Health Bar' to visualize monthly limits, interactive Chart.js analytics, and secure authentication. It combines a nostalgic 8-bit aesthetic with modern functionality like Excel export and responsive mobile design.",
      image: "/uangku.png",
      icons: [<FaGithub key="github" />],
      links: {
        github: "https://github.com/AerynnnSh/uangku-pixel",
      },
    },
    {
      title: "AlgoDesign — Verifiable UI for Finance",
      tags: ["Frontend Logic", "Vanilla JS", "DOM Manipulation"],
      shortDesc:
        "A high-fidelity fintech agency simulation. Features complex client-to-admin workflows and immersive animations using pure Vanilla JS.",
      longDesc:
        "AlgoDesign simulates a premium Fintech Design Agency interface without using any frameworks. It demonstrates advanced DOM manipulation and state management purely on the client-side. Key features include a 'Simulated Backend' using LocalStorage to persist client orders and Base64 payment proofs, a fully functional Admin Dashboard with real-time revenue calculation, and immersive UX details like text-scramble effects, smooth page transitions, and custom toast notifications.",
      image: "/algodesign.png",
      icons: [<SiVercel key="vercel" />, <FaGithub key="github" />],
      links: {
        demo: "#",
        github: "#",
      },
    },
    {
      title: "Vinix7 WebSpire — Digital Agency",
      tags: ["Internship", "Real Client", "Web Development"],
      shortDesc:
        "A professional company profile website for Vinix7. Features SEO optimization, booking systems, and a responsive design.",
      longDesc:
        "Vinix7 WebSpire is a real-world project developed during my internship, serving as the digital face of the Vinix7 agency. The platform includes a comprehensive service catalog, a booking and inquiry system, and a dedicated admin dashboard for managing client leads. The architecture emphasizes SEO performance, fast load times, and a seamless mobile experience to help the agency convert visitors into clients.",
      image: "/f2.png",
      icons: [<SiVercel key="vercel" />],
      links: {
        demo: "https://angelicaviannaantonetta.github.io/Final-Project-Kel-57-Vinix7-WebSpire/",
      },
    },

    // --- DESIGN PROJECTS ---
    {
      title: "DomoSync — Smart Home Platform",
      tags: ["UX Design", "UI Design", "Web Design"],
      shortDesc:
        "DomoSync is a smart home control platform designed to make it easy to manage home devices in one intuitive dashboard.",
      longDesc:
        "DomoSync addresses the fragmentation in smart home apps by unifying control into a single, intuitive dashboard. The design process involved extensive user research to identify pain points in existing IoT apps. The final high-fidelity prototype in Figma features a dark-mode aesthetic with neumorphic elements, focusing on accessibility and ease of use for controlling lighting, temperature, and security systems.",
      image: "/f1.png",
      icons: [<FaFigma key="figma" />],
      links: {
        figma:
          "https://www.figma.com/design/ztt9o54WJkkWRtzJDdABXr/DomoSync---IOT?node-id=0-1&t=hogMUnGnO918Zgjo-1",
      },
    },
    {
      title: "Coreloop Agent Platform",
      tags: ["UX Design", "UI Design", "SaaS"],
      shortDesc:
        "Coreloop is a developer-first platform for building AI agents at scale. Features visual builder, SDK, and monitoring dashboard.",
      longDesc:
        "Coreloop is a SaaS platform design tailored for developers building AI agents. The challenge was to present complex technical data (pipelines, logs, API keys) in a clean, digestible interface. The design system uses a strict grid layout and monospaced typography to appeal to the developer demographic, featuring a node-based visual editor for constructing AI workflows.",
      image: "/f4.png",
      icons: [<FaFigma key="figma" />],
      links: {
        figma:
          "https://www.figma.com/design/74qA56gHLrdn5fvXRO8Rqo/Coreloop?node-id=0-1&t=DrdVOHqv1WLg68XI-1",
      },
    },
    {
      title: "C4C — Concert Ticketing",
      tags: ["UX Design", "UI Design", "Mobile App"],
      shortDesc:
        "C4C is a concert ticketing app combining music with social impact. A portion of sales is allocated to measurable social programs.",
      longDesc:
        "C4C (Concerts for Change) is a mobile app concept that merges entertainment with philanthropy. The UX flow guides users from discovering artists to purchasing tickets, with a transparent breakdown of the social impact donation included in each ticket. The visual identity uses vibrant, high-energy colors typical of music festivals, balanced with clear, trustworthy typography for the payment and donation sections.",
      image: "/f3.png",
      icons: [<FaFigma key="figma" />],
      links: {
        figma:
          "https://www.figma.com/design/n7XgIjZSLnzNKg6Bc312ag/C4C?node-id=0-1&t=SyBERnB9XTVDhdm7-1",
      },
    },
  ];

  const stackItems = [
    {
      name: "Figma",
      desc: "Design, collaborate, and iterate on interfaces.",
      icon: <FaFigma size={24} />,
    },
    {
      name: "Vercel",
      desc: "Deploy and host modern web projects with speed.",
      icon: <SiVercel size={24} />,
    },
    {
      name: "Github",
      desc: "Manage code, version control, and team projects.",
      icon: <FaGithub size={24} />,
    },
    {
      name: "Canva",
      desc: "Create marketing visuals and graphics quickly.",
      icon: <SiCanva size={24} />,
    },
  ];

  return (
    <main className="min-h-screen bg-black flex flex-col items-center py-20 px-6 font-mono text-gray-200 gap-24 overflow-hidden relative selection:bg-orange-500 selection:text-black">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-zinc-800/20 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* DEKORASI */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center overflow-hidden">
        <div className="w-full max-w-[850px] relative h-full">
          <div className="absolute top-[240px] -right-12 text-zinc-800 text-2xl font-thin select-none hidden md:block animate-pulse">
            +
          </div>
          <div className="absolute top-[900px] -right-12 text-zinc-800 text-2xl font-thin select-none hidden md:block animate-pulse delay-700">
            +
          </div>
          <div className="absolute top-[600px] -left-12 text-zinc-800 text-2xl font-thin select-none hidden md:block animate-pulse delay-300">
            +
          </div>
        </div>
      </div>

      {/* SECTION 1: HERO */}
      <div
        id="hero"
        ref={heroRef}
        className="reveal w-full max-w-[850px] border border-zinc-800 bg-black relative z-10 scroll-mt-24 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] hover:border-zinc-700"
      >
        <div className="p-8 md:p-10 pb-0">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden group">
              <Image
                src="/profile.jpg"
                alt="Profile"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>
            <h1 className="text-base font-medium text-white tracking-wide">
              Elian Putera Tanuwijaya
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs mb-6 font-medium tracking-wide">
            <span className="text-orange-500 text-sm animate-pulse">✱</span>
            <span className="text-zinc-500">
              Actively looking for internship opportunities!
            </span>
          </div>

          <h2 className="text-2xl md:text-[32px] font-bold text-white mb-5 leading-snug tracking-tight max-w-2xl">
            Turning ideas into intuitive experiences through{" "}
            <span className="text-zinc-400">UI/UX</span> &{" "}
            <span className="text-zinc-400">web development</span>.
          </h2>

          <p className="text-zinc-500 text-xs md:text-[13px] leading-relaxed max-w-xl mb-10">
            I am a 6th-semester Information Systems student passionate about
            designing clean user interfaces and building responsive web
            applications.
          </p>

          <div className="flex items-center gap-6 mb-16">
            <a
              href="/Elian Putera Tanuwijaya_CV.pdf"
              download="Elian Putera Tanuwijaya_CV.pdf"
              className="bg-white text-black px-5 py-2 text-xs font-bold hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 rounded-sm"
            >
              Download CV <ArrowRight size={14} />
            </a>
            <a
              href="#projects"
              className="text-zinc-400 hover:text-white transition flex items-center gap-2 text-xs group"
            >
              View Projects{" "}
              <ArrowRight
                size={14}
                className="rotate-90 group-hover:translate-y-1 transition-transform"
              />
            </a>
          </div>

          {/* Footer Hero Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-dashed border-zinc-800 pt-5 pb-8">
            <div>
              <p className="mb-2 text-zinc-600 text-[10px] uppercase tracking-wider">
                Email
              </p>
              <a
                href="mailto:elianputera@gmail.com"
                className="text-zinc-300 text-xs hover:text-white transition flex items-center h-5 hover:underline decoration-zinc-600 underline-offset-4"
              >
                elianputera@gmail.com
              </a>
            </div>
            <div>
              <p className="mb-2 text-zinc-600 text-[10px] uppercase tracking-wider">
                Links
              </p>
              <a
                href="#"
                className="text-zinc-300 text-xs hover:text-white transition flex items-center gap-1 h-5 hover:underline decoration-zinc-600 underline-offset-4"
              >
                LinkedIn <LinkIcon size={10} />
              </a>
            </div>
            <div className="md:text-right">
              <p className="mb-2 text-zinc-600 text-[10px] uppercase tracking-wider">
                Location
              </p>
              <div className="flex items-center md:justify-end h-5">
                <p className="text-zinc-300 text-xs">
                  Surabaya, East Java, Indonesia
                </p>
              </div>
              <p className="text-zinc-500 text-xs mt-1 font-mono tabular-nums">
                {time}
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Grid Bottom */}
        <div className="grid grid-cols-8 border-t border-zinc-800 h-12 w-full">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="border-r border-zinc-800"></div>
          ))}
          <div></div>
        </div>
      </div>

      {/* SECTION 2: CAROUSEL */}
      <div className="reveal w-full max-w-[95vw] relative opacity-60 hover:opacity-100 transition-opacity duration-500 z-10">
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] py-4">
            {infiniteMarquee.map((imagePath, index) => (
              <div
                key={index}
                className="flex-none w-[300px] md:w-[400px] mr-8"
              >
                <div className="aspect-[16/9] bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden relative group cursor-pointer hover:border-zinc-500 transition-all duration-300 shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1">
                  <Image
                    src={imagePath}
                    alt={`Marquee ${index}`}
                    fill
                    quality={100}
                    unoptimized
                    className="object-cover grayscale group-hover:grayscale-0 transition duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: FEATURED PROJECTS */}
      <div
        id="projects"
        ref={projectsRef}
        className="w-full max-w-[850px] pt-10 z-10 scroll-mt-24"
      >
        <h3 className="reveal text-xl font-bold text-white mb-8 font-mono tracking-tight flex items-center gap-3">
          <span className="w-2 h-2 bg-orange-500 rounded-full inline-block"></span>
          Featured Projects
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedProject(project)}
              style={{ transitionDelay: `${index * 100}ms` }}
              className="reveal border border-zinc-800 bg-black group hover:border-zinc-500 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.05)] transition-all duration-300 flex flex-col h-full hover:-translate-y-2 relative cursor-pointer"
            >
              <div className="aspect-[4/3] w-full bg-zinc-900 relative overflow-hidden border-b border-zinc-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  quality={100}
                  unoptimized
                  className="object-cover group-hover:scale-105 transition duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Overlay Hint Text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-black/80 text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-zinc-700 backdrop-blur-sm">
                    View Details
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow relative">
                <h4 className="text-sm font-bold text-white mb-3 leading-snug group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] border border-zinc-700 text-zinc-400 px-1.5 py-0.5 rounded-[2px] bg-zinc-900/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mb-6 flex-grow">
                  <p className="text-[10px] md:text-xs text-zinc-500 leading-relaxed line-clamp-4">
                    {project.shortDesc}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-dashed border-zinc-800 pt-4 mt-auto">
                  <div className="flex gap-3">
                    {project.icons.map((icon, i) => (
                      <div
                        key={i}
                        className="relative w-8 h-8 flex items-center justify-center bg-black group/icon"
                      >
                        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-zinc-600"></div>
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-zinc-600"></div>
                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-zinc-600"></div>
                        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-zinc-600"></div>
                        <div className="text-base text-zinc-500 group-hover/icon:text-white transition-colors">
                          {icon}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: THE STACK */}
      <div
        id="stack"
        ref={stackRef}
        className="reveal w-full max-w-[850px] border border-zinc-800 bg-black p-8 md:p-10 mt-6 z-10 scroll-mt-24"
      >
        <h3 className="text-xl font-bold text-white mb-12 font-mono tracking-tight leading-snug">
          The Stack <br /> <span className="text-zinc-500">Behind My Work</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {stackItems.map((item, index) => {
            return (
              <div
                key={index}
                style={{ transitionDelay: `${index * 150}ms` }}
                className="reveal flex items-start gap-5 group/stack cursor-default"
              >
                <div className="relative w-12 h-12 shrink-0 flex items-center justify-center bg-black mt-1">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-500 transition-all duration-300 ease-out group-hover/stack:-translate-y-1 group-hover/stack:-translate-x-1"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-500 transition-all duration-300 ease-out group-hover/stack:-translate-y-1 group-hover/stack:translate-x-1"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-500 transition-all duration-300 ease-out group-hover/stack:translate-y-1 group-hover/stack:-translate-x-1"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-500 transition-all duration-300 ease-out group-hover/stack:translate-y-1 group-hover/stack:translate-x-1"></div>
                  <div className="text-zinc-300 group-hover/stack:text-white group-hover/stack:scale-110 transition-all duration-300 relative z-10">
                    {item.icon}
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover/stack:text-orange-500 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-zinc-500 leading-relaxed max-w-xs group-hover/stack:text-zinc-400 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex items-center gap-2 text-xs text-zinc-500 font-mono">
          <span className="text-orange-500 text-lg leading-none animate-pulse">
            ✱
          </span>
          Tools I rely on to build and ship fast.
        </div>
      </div>

      {/* SECTION 5: FOOTER */}
      <footer
        id="contact"
        ref={contactRef}
        className="reveal w-full max-w-[850px] border border-zinc-800 bg-black p-8 md:p-12 mt-6 mb-20 z-10 scroll-mt-24"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-16 font-mono tracking-tight">
          Elian Putera Tanuwijaya
        </h2>
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 w-full md:w-auto">
            {[
              {
                label: "Instagram",
                val: "@elianputera16",
                url: "https://instagram.com/elianputera16",
              },
              { label: "LinkedIn", val: "Elian Putera Tanuwijaya", url: "#" },
              {
                label: "GitHub",
                val: "AerynnnSh",
                url: "https://github.com/AerynnnSh",
              },
            ].map((link, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                  {link.label}
                </span>
                <a
                  href={link.url}
                  target={link.label === "Instagram" ? "_blank" : "_self"}
                  className="text-xs text-white hover:text-zinc-300 transition flex items-center gap-1 group font-mono font-medium whitespace-nowrap"
                >
                  {link.val}
                  <ArrowRight
                    size={12}
                    className="text-zinc-500 group-hover:text-white transition-colors shrink-0 group-hover:-rotate-45 transition-transform"
                  />
                </a>
              </div>
            ))}
          </div>
          <a
            href="mailto:elianputera@gmail.com"
            className="bg-white text-black px-5 py-2.5 text-xs font-bold hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 rounded-[2px] shrink-0 font-mono h-fit"
          >
            Contact Me <ArrowRight size={14} />
          </a>
        </div>
      </footer>

      {/* FLOATING NAV */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 hidden md:flex">
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="group flex items-center justify-end gap-3 cursor-pointer relative py-1"
            >
              <span
                className={`text-white text-sm font-mono transition-all duration-500 ease-in-out absolute right-6 whitespace-nowrap
                  ${
                    isActive
                      ? "opacity-100 translate-x-0 delay-100"
                      : "opacity-0 translate-x-4 pointer-events-none"
                  }`}
              >
                {link.label}
              </span>
              <div
                className={`w-3 h-3 rotate-45 border transition-all duration-300 ease-out
                  ${
                    isActive
                      ? "bg-orange-500 border-orange-500 scale-110 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                      : "bg-transparent border-zinc-500 group-hover:border-white group-hover:bg-white/20"
                  }`}
              ></div>
            </a>
          );
        })}
      </div>

      {/* =========================================
          MODAL / POPUP COMPONENT (NO IMAGE)
      ========================================= */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#0a0a0a] border border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-10 p-1 hover:bg-zinc-800 rounded-md text-zinc-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Konten Modal (Tanpa Gambar) */}
            <div className="p-8 pt-10">
              <h3 className="text-2xl font-bold text-white mb-3 pr-8">
                {selectedProject.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs border border-zinc-700 text-zinc-400 px-2 py-1 rounded-[2px] bg-zinc-900/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-invert prose-sm max-w-none text-zinc-400 mb-8 leading-relaxed">
                <p>{selectedProject.longDesc}</p>
              </div>

              {/* Action Buttons Dynamic */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-zinc-800">
                {/* 1. Tampilkan Tombol Demo (Website) */}
                {selectedProject.links.demo && (
                  <a
                    href={selectedProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-[4px] text-sm font-bold hover:bg-zinc-200 transition-colors"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}

                {/* 2. Tampilkan Tombol GitHub */}
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 text-white px-4 py-2.5 rounded-[4px] text-sm font-medium hover:bg-zinc-800 hover:border-zinc-500 transition-all"
                  >
                    <Github size={16} /> View Code
                  </a>
                )}

                {/* 3. Tampilkan Tombol Figma */}
                {selectedProject.links.figma && (
                  <a
                    href={selectedProject.links.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#1e1e1e] border border-zinc-700 text-white px-4 py-2.5 rounded-[4px] text-sm font-medium hover:bg-zinc-800 hover:border-[#F24E1E] transition-all"
                  >
                    <FaFigma size={16} /> View Prototype
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
