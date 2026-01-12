"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Link as LinkIcon } from "lucide-react";
import { FaFigma, FaReact, FaGithub } from "react-icons/fa";
import { SiVercel, SiNextdotjs, SiTailwindcss, SiCanva } from "react-icons/si";

export default function Home() {
  const [time, setTime] = useState<string>("00:00:00");
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Refs untuk section navigation
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

    // 2. NAV OBSERVER (Untuk Floating Nav)
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

    // 3. REVEAL ANIMATION OBSERVER (BARU: Untuk Efek Muncul)
    // Ini akan mencari semua elemen dengan class 'reveal' dan menambahkan 'active' saat terlihat
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // Optional: unobserve setelah muncul agar tidak animasi ulang saat scroll naik
            // revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 } // Muncul saat 15% elemen masuk layar
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      clearInterval(interval);
      navObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const navLinks = [
    { id: "hero", label: "Hero" },
    { id: "projects", label: "Projects" },
    { id: "stack", label: "Tools" },
    { id: "contact", label: "Contact" },
  ];

  const marqueeImages = ["/p1.png", "/p2.png", "/p3.png", "/p4.png", "/p5.png"];
  const infiniteMarquee = [...marqueeImages, ...marqueeImages];

  const featuredProjects = [
    {
      title: "DomoSync — Smart Home Platform",
      tags: ["UX Design", "UI Design", "Web Design"],
      desc: "DomoSync is a smart home control platform designed to make it easy to manage home devices in one intuitive dashboard. Focus on user-friendliness and interaction flow.",
      image: "/f1.png",
      icons: [<FaFigma key="figma" />, <SiVercel key="vercel" />],
    },
    {
      title: "WebSpire — Digital Web Agency",
      tags: ["UX Design", "UI Design", "Web Design"],
      desc: "WebSpire is a responsive and SEO-friendly website for a digital agency. Includes booking form, payment upload system, and admin dashboard.",
      image: "/f2.png",
      icons: [<FaFigma key="figma" />, <SiVercel key="vercel" />],
    },
    {
      title: "C4C — Concert Ticketing",
      tags: ["UX Design", "UI Design", "Mobile App"],
      desc: "C4C is a concert ticketing app combining music with social impact. A portion of sales is allocated to measurable social programs.",
      image: "/f3.png",
      icons: [<FaFigma key="figma" />],
    },
    {
      title: "Coreloop Agent Platform",
      tags: ["UX Design", "UI Design", "SaaS"],
      desc: "Coreloop is a developer-first platform for building AI agents at scale. Features visual builder, SDK, and monitoring dashboard.",
      image: "/f4.png",
      icons: [<FaFigma key="figma" />, <SiVercel key="vercel" />],
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
      {/* =========================================
          BACKGROUND GLOW (BARU)
          Memberikan efek ambient light di belakang hero
         ========================================= */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-zinc-800/20 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* =========================================
          DEKORASI (TANDA +)
         ========================================= */}
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

      {/* =========================================
          SECTION 1: HERO (IMPROVED)
          - Added 'reveal' class
          - Added Hover Effect (Shadow Glow)
         ========================================= */}
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
              href="/cv.pdf"
              className="bg-white text-black px-5 py-2 text-xs font-bold hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 rounded-sm"
            >
              Download CV <ArrowRight size={14} />
            </a>
            <a
              href="#projects"
              className="text-zinc-400 hover:text-white transition flex items-center gap-2 text-xs group"
            >
              Scroll Down{" "}
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

      {/* =========================================
          SECTION 2: CAROUSEL (IMPROVED)
          - Added 'reveal'
         ========================================= */}
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

      {/* =========================================
          SECTION 3: FEATURED PROJECTS (IMPROVED)
          - Added 'reveal' to title & grid
          - Added Hover Lift & Depth Effect on Cards
         ========================================= */}
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
              // Added staggered delay based on index (index * 100ms)
              style={{ transitionDelay: `${index * 100}ms` }}
              className="reveal border border-zinc-800 bg-black group hover:border-zinc-500 hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.05)] transition-all duration-300 flex flex-col h-full hover:-translate-y-2 relative"
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
                {/* Overlay saat hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                    {project.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-dashed border-zinc-800 pt-4 mt-auto">
                  <div className="flex gap-3">
                    {project.icons.map((icon, i) => (
                      <div
                        key={i}
                        className="relative w-8 h-8 flex items-center justify-center bg-black group/icon cursor-pointer"
                      >
                        {/* Custom geometric borders */}
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

      {/* =========================================
          SECTION 4: THE STACK (IMPROVED)
          - Added 'reveal'
          - Staggered entrance for list items
         ========================================= */}
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
                // Staggered animation (muncul satu2)
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

      {/* =========================================
          SECTION 5: FOOTER (IMPROVED)
          - Added 'reveal'
         ========================================= */}
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
            {/* Social Links Loop untuk kode lebih rapi */}
            {[
              {
                label: "Instagram",
                val: "@elianputera16",
                url: "https://instagram.com/elianputera16",
              },
              { label: "LinkedIn", val: "Elian Putera Tanuwijaya", url: "#" },
              {
                label: "Email",
                val: "elianputera@gmail.com",
                url: "mailto:elianputera@gmail.com",
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

      {/* =========================================
          FLOATING NAV (TETAP SAMA)
         ========================================= */}
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
    </main>
  );
}
