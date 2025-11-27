'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Timeline items observer
    timelineRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleItems((prev) => [...new Set([...prev, index])]);
              }
            });
          },
          { threshold: 0.1 }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    // Section observer
    Object.entries(sectionRefs.current).forEach(([key, ref]) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSections((prev) => [...new Set([...prev, key])]);
              }
            });
          },
          { threshold: 0.1 }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, scrollPercentage)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setTimelineRef = (index: number) => (el: HTMLDivElement | null) => {
    timelineRefs.current[index] = el;
  };

  return (
    <div className="min-h-screen bg-[#f5f7ff] text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-slate-200">
        {/* Scroll Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 overflow-visible">
          <div 
            className="h-full bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-300 ease-out shadow-lg shadow-cyan-500/50 relative flex items-center justify-end pr-2"
            style={{ width: `${scrollProgress}%` }}
          >
            <span className="text-[9px] font-bold text-white drop-shadow-lg whitespace-nowrap">{Math.round(scrollProgress)}%</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <span className="text-xl font-bold bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Team Enigma
                </span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#about" className="px-4 py-2 text-slate-600 hover:text-cyan-600 hover:bg-sky-50 rounded-lg transition-all font-medium">
                About
              </a>
              <a href="#members" className="px-4 py-2 text-slate-600 hover:text-cyan-600 hover:bg-sky-50 rounded-lg transition-all font-medium">
                Members
              </a>
              <a href="#research" className="px-4 py-2 text-slate-600 hover:text-cyan-600 hover:bg-sky-50 rounded-lg transition-all font-medium">
                Research
              </a>
              <a href="#competitions" className="px-4 py-2 text-slate-600 hover:text-cyan-600 hover:bg-sky-50 rounded-lg transition-all font-medium">
                Events
              </a>
              <a href="#contact" className="ml-2 px-6 py-2 bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 text-slate-950 rounded-lg font-semibold hover:from-cyan-300 hover:to-violet-400 transition-all shadow-lg shadow-cyan-500/40 hover:shadow-cyan-400/60 hover:scale-105">
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative p-2.5 bg-white border-2 border-slate-300 text-slate-700 rounded-lg hover:border-cyan-400 hover:bg-sky-50 focus:outline-none transition-all shadow-md hover:shadow-lg hover:scale-105"
                aria-label="Toggle menu"
              >
                <div className="relative">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-xl">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <a 
                href="#about" 
                className="block px-4 py-3 text-slate-600 hover:text-cyan-600 hover:bg-sky-50 rounded-lg font-medium transition-all" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About
                </div>
              </a>
              <a 
                href="#members" 
                className="block px-4 py-3 text-slate-600 hover:text-cyan-600 hover:bg-sky-50 rounded-lg font-medium transition-all" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Members
                </div>
              </a>
              <a 
                href="#research" 
                className="block px-4 py-3 text-slate-600 hover:text-cyan-600 hover:bg-sky-50 rounded-lg font-medium transition-all" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Research
                </div>
              </a>
              <a 
                href="#competitions" 
                className="block px-4 py-3 text-slate-600 hover:text-cyan-600 hover:bg-sky-50 rounded-lg font-medium transition-all" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Events
                </div>
              </a>
              <a 
                href="#contact" 
                className="block px-4 py-3 mt-2 bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 text-slate-950 rounded-lg font-semibold hover:from-cyan-300 hover:to-violet-400 transition-all shadow-lg text-center" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                </div>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-white via-slate-50 to-sky-50 py-20 lg:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 left-6 w-72 h-72 bg-cyan-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
          <div className="absolute top-32 right-16 w-72 h-72 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-16 left-40 w-72 h-72 bg-emerald-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 animate-fade-in-up">
            <span className="block text-slate-900 mb-2">Welcome to</span>
            <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent animate-gradient">
              Team Enigma
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up animation-delay-200">
            A multidisciplinary student team from SLIIT engaged in technology competitions and emerging research activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            <a
              href="#competitions"
              className="group px-8 py-3 bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 text-white rounded-lg font-semibold hover:from-cyan-300 hover:to-violet-400 hover:scale-110 transition-all duration-300 shadow-xl shadow-cyan-500/30 w-full sm:w-auto animate-pulse-glow"
            >
              <span className="inline-block group-hover:animate-bounce-subtle">View Events</span>
            </a>
            <a
              href="#research"
              className="px-8 py-3 bg-white text-slate-800 rounded-lg font-semibold hover:bg-slate-100 hover:scale-110 transition-all duration-300 shadow-xl shadow-slate-300 border border-slate-200 w-full sm:w-auto"
            >
              View Research
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-28 bg-white border-t border-slate-200 relative overflow-hidden">
        {/* Animated decorative circles */}
        <div className="absolute top-10 right-10 w-40 h-40 border-2 border-cyan-200 rounded-full animate-pulse-glow opacity-30"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border-2 border-violet-200 rounded-full animate-pulse-glow opacity-30" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.08),_transparent_60%)]" aria-hidden></div>
        <div 
          ref={(el) => { sectionRefs.current['about'] = el; }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center transition-all duration-700 ${
            visibleSections.includes('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            About Team Enigma
          </h2>
          <p className={`text-lg text-slate-600 leading-relaxed text-center max-w-4xl mx-auto transition-all duration-700 delay-200 ${
            visibleSections.includes('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Team Enigma is a multidisciplinary research and competition team from the Sri Lanka Institute of Information Technology (SLIIT), bringing together talented students from Computer Systems Engineering and Computer Science programs. We are passionate about tackling real-world challenges through innovative solutions in software development, network security, robotics, and emerging technologies. Our team thrives on collaboration, continuous learning, and pushing the boundaries of what&apos;s possible in engineering and computer science. We actively participate in hackathons, programming competitions, and research initiatives to make a meaningful impact in the tech community.
          </p>
        </div>
      </section>

      {/* Members Section */}
      <section id="members" className="py-20 lg:py-28 bg-[#eef3ff] border-t border-slate-200 relative overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-1/4 w-16 h-16 border-4 border-violet-300 rotate-45 animate-float opacity-20"></div>
        <div className="absolute bottom-20 right-1/4 w-20 h-20 border-4 border-cyan-300 rounded-full animate-float opacity-20" style={{animationDelay: '1s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.12),_transparent_60%)]" aria-hidden></div>
        <div 
          ref={(el) => { sectionRefs.current['members'] = el; }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center transition-all duration-700 ${
            visibleSections.includes('members') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Member 1 - Dilusha Chamika */}
            <div className={`group bg-white rounded-2xl border border-slate-200 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] p-6 transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-cyan-300/50 ${
              visibleSections.includes('members') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="w-20 h-20 bg-linear-to-br from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-950 text-2xl font-bold group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                DC
              </div>
              <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">
                Dilusha Chamika
              </h3>
              <p className="text-sm text-cyan-700 text-center mb-3 font-medium">
                Computer Systems Engineering Undergraduate – SLIIT
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Specializing in embedded systems and network security, with a strong passion for developing intelligent threat detection systems, robotics, and UAV technologies. Skilled in system-level problem-solving, embedded programming, and building AI-driven defensive tools.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <svg className="w-4 h-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Colombo, Sri Lanka</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:dilushachamika@gmail.com" className="text-cyan-600 hover:text-cyan-700 hover:underline transition-colors">
                    dilushachamika@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href="https://github.com/dilusha-chamika" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700 hover:underline transition-colors">
                    GitHub Profile
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <a href="https://linkedin.com/in/dilusha-chamika" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-700 hover:underline transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Member 2 - Hesara Perera */}
            <div className={`group bg-white rounded-2xl border border-slate-200 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] p-6 transition-all duration-500 delay-150 hover:-translate-y-2 hover:scale-105 hover:shadow-violet-300/50 ${
              visibleSections.includes('members') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="w-20 h-20 bg-linear-to-br from-indigo-400 via-violet-500 to-fuchsia-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                HP
              </div>
              <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">
                Hesara Perera
              </h3>
              <p className="text-sm text-violet-600 text-center mb-3 font-medium">
                Computer Science Undergraduate – SLIIT
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                A driven Full-Stack Developer and Microsoft Certified UX Design Professional, specializing in UI/UX, cloud computing, and scalable system design. Experienced in building modern digital experiences, IoT solutions, and cloud-native applications (Azure & AWS). Passionate about creating meaningful user-centered products.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Colombo, Sri Lanka</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:hesaraperera@gmail.com" className="text-violet-600 hover:text-violet-700 hover:underline transition-colors">
                    hesaraperera@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-violet-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href="https://github.com/hesara-perera" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 hover:underline transition-colors">
                    GitHub Profile
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-violet-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <a href="https://linkedin.com/in/hesara-perera" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 hover:underline transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Member 3 - Sandil Helitha Perera */}
            <div className={`group bg-white rounded-2xl border border-slate-200 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] p-6 transition-all duration-500 delay-300 hover:-translate-y-2 hover:scale-105 hover:shadow-pink-300/50 ${
              visibleSections.includes('members') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="w-20 h-20 bg-linear-to-br from-pink-400 via-rose-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                SP
              </div>
              <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">
                Sandil Helitha Perera
              </h3>
              <p className="text-sm text-pink-600 text-center mb-3 font-medium">
                Computer Science Undergraduate – SLIIT
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                A versatile programmer with strengths in backend development, algorithms, and system design. Experienced in competitive programming and building efficient workflows. Passionate about creating backend architectures, APIs, automation tools, and performance-focused solutions.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <svg className="w-4 h-4 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Colombo, Sri Lanka</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:sandilperera.dev@gmail.com" className="text-pink-600 hover:text-pink-700 hover:underline transition-colors">
                    sandilperera.dev@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href="https://github.com/sandil-perera" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 hover:underline transition-colors">
                    GitHub Profile
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <a href="https://linkedin.com/in/sandil-perera" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 hover:underline transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Member 4 - Hasith Kaushal */}
            <div className={`group bg-white rounded-2xl border border-slate-200 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] p-6 transition-all duration-500 delay-[450ms] hover:-translate-y-2 hover:scale-105 hover:shadow-emerald-300/50 ${
              visibleSections.includes('members') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="w-20 h-20 bg-linear-to-br from-emerald-400 via-teal-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                HK
              </div>
              <h3 className="text-xl font-semibold text-slate-900 text-center mb-2">
                Hasith Kaushal
              </h3>
              <p className="text-sm text-emerald-600 text-center mb-3 font-medium">
                Information Technology Undergraduate – SLIIT
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Tech enthusiast specializing in web development, cloud deployment, and problem-solving. Strong interest in collaborative hackathons, rapid prototyping, and building efficient cloud-backed applications. Actively exploring cybersecurity and system automation.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Colombo, Sri Lanka</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:hasithkaushal.dev@gmail.com" className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                    hasithkaushal.dev@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href="https://github.com/hasith-kaushal" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                    GitHub Profile
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <a href="https://linkedin.com/in/hasith-kaushal" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitions Section */}
      <section id="competitions" className="py-20 lg:py-28 bg-white border-t border-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.08),_transparent_60%)]" aria-hidden></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-16 text-center">
            Competitions & Events
          </h2>
          
          {/* Timeline Container */}
          <div className="relative">
            {/* Center Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-cyan-200 via-blue-200 to-violet-200 hidden lg:block"></div>
            
            {/* Timeline Items */}
            <div className="space-y-24 lg:space-y-32">
              
              {/* Event 1 - InnovateX Datathon */}
              <div 
                ref={setTimelineRef(0)}
                className={`relative flex flex-col lg:flex-row items-center lg:items-start gap-8 transition-all duration-1000 ${
                  visibleItems.includes(0) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                }`}
              >
                <div className="w-full lg:w-5/12 lg:pr-8 lg:text-right order-2 lg:order-1">
                  <div className="bg-white rounded-2xl p-6 shadow-[0_30px_70px_-40px_rgba(34,139,230,0.45)] transition-all duration-500 border border-cyan-100 hover:-translate-y-1 hover:shadow-cyan-300/50">
                    <div className="flex lg:flex-row-reverse items-start gap-4">
                      <div className="w-12 h-12 bg-linear-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                        <svg className="w-6 h-6 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          InnovateX Datathon – Finalists
                        </h3>
                        <p className="text-sm text-cyan-700 mb-2 font-medium">📍 Galle Face Hotel – Colombo</p>
                        <p className="text-sm text-slate-500 mb-3">👥 Dilusha Chamika, Sandil Helitha Perera, Sandali Sandagomi</p>
                        <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                          Finalists in a 6-hour Datathon organized by Zebra Technologies. Worked with real-world datasets to build insights and analytics dashboards under strict time constraints.
                        </p>
                        <div className="flex lg:justify-end gap-2 flex-wrap">
                          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full font-semibold">Data Science</span>
                          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full font-semibold">Rapid Prototyping</span>
                          <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-xs rounded-full font-semibold">6hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-2/12 flex justify-center order-1 lg:order-2">
                  <div className={`w-28 h-28 lg:w-32 lg:h-32 bg-white rounded-full shadow-2xl border-4 border-blue-500 flex flex-col items-center justify-center relative z-20 transition-all duration-700 delay-300 hover:scale-105 ${
                    visibleItems.includes(0) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}>
                    <span className="text-2xl lg:text-3xl font-bold text-blue-600">2025</span>
                    <span className="text-xs text-slate-500 font-semibold mt-1">October</span>
                    <div className="absolute -inset-1 bg-blue-400 rounded-full opacity-20 animate-ping"></div>
                  </div>
                </div>
                <div className="hidden lg:block lg:w-5/12 order-3"></div>
              </div>

              {/* Event 2 - CodeRally 6.0 */}
              <div 
                ref={setTimelineRef(1)}
                className={`relative flex flex-col lg:flex-row items-center lg:items-start gap-8 transition-all duration-1000 ${
                  visibleItems.includes(1) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                }`}
              >
                <div className="hidden lg:block lg:w-5/12 order-1"></div>
                <div className="w-full lg:w-2/12 flex justify-center order-1 lg:order-2">
                  <div className={`w-28 h-28 lg:w-32 lg:h-32 bg-white rounded-full shadow-2xl border-4 border-indigo-500 flex flex-col items-center justify-center relative z-20 transition-all duration-700 delay-300 hover:scale-105 ${
                    visibleItems.includes(1) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}>
                    <span className="text-2xl lg:text-3xl font-bold text-indigo-600">2025</span>
                    <span className="text-xs text-slate-500 font-semibold mt-1">September</span>
                    <div className="absolute -inset-1 bg-indigo-400 rounded-full opacity-20 animate-ping"></div>
                  </div>
                </div>
                <div className="w-full lg:w-5/12 lg:pl-8 order-2 lg:order-3">
                  <div className="bg-white rounded-2xl p-6 shadow-[0_30px_70px_-40px_rgba(99,102,241,0.4)] transition-all duration-500 border border-indigo-100 hover:-translate-y-1 hover:shadow-indigo-200/80">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-linear-to-br from-indigo-400 via-indigo-500 to-violet-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          CodeRally 6.0 – 4th Place (Intermediate Tier)
                        </h3>
                        <p className="text-sm text-indigo-700 mb-2 font-medium">📍 IIT – Informatics Institute of Technology</p>
                        <p className="text-sm text-slate-500 mb-3">👥 Hesara Perera, Sandil Helitha Perera, Senal Galagedara, Hasith Kaushal</p>
                        <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                          Participated in an intense 24-hour hackathon organized by the IEEE Computer Society SB Chapter of IIT. Built working solutions under time pressure and secured 4th place in the Intermediate Tier.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-semibold">AI/ML</span>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-semibold">Competitive Programming</span>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-semibold">24hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event 3 - Algothon Merit Award */}
              <div 
                ref={setTimelineRef(2)}
                className={`relative flex flex-col lg:flex-row items-center lg:items-start gap-8 transition-all duration-1000 ${
                  visibleItems.includes(2) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                }`}
              >
                <div className="w-full lg:w-5/12 lg:pr-8 lg:text-right order-2 lg:order-1">
                  <div className="bg-white rounded-2xl p-6 shadow-[0_30px_70px_-40px_rgba(168,85,247,0.35)] transition-all duration-500 border border-violet-100 hover:-translate-y-1 hover:shadow-violet-200/80">
                    <div className="flex lg:flex-row-reverse items-start gap-4">
                      <div className="w-12 h-12 bg-linear-to-br from-violet-400 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          Merit Award – Algothon Contest
                        </h3>
                        <p className="text-sm text-violet-700 mb-2 font-medium">📍 SLIIT Malabe Campus</p>
                        <p className="text-sm text-slate-500 mb-3">👥 Dilusha Chamika, Hesara Perera, Sandil Perera</p>
                        <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                          Received a Merit Award in the Algothon contest at SLIIT CODEFEST 2025, recognized for exceptional algorithmic problem-solving and teamwork in the Tertiary Category.
                        </p>
                        <div className="flex lg:justify-end gap-2 flex-wrap">
                          <span className="px-3 py-1 bg-violet-100 text-violet-800 text-xs rounded-full font-semibold">Algorithms</span>
                          <span className="px-3 py-1 bg-violet-100 text-violet-800 text-xs rounded-full font-semibold">Coding Contest</span>
                          <span className="px-3 py-1 bg-violet-100 text-violet-800 text-xs rounded-full font-semibold">Tertiary Category</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-2/12 flex justify-center order-1 lg:order-2">
                  <div className={`w-28 h-28 lg:w-32 lg:h-32 bg-white rounded-full shadow-2xl border-4 border-purple-500 flex flex-col items-center justify-center relative z-20 transition-all duration-700 delay-300 hover:scale-105 ${
                    visibleItems.includes(2) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}>
                    <span className="text-2xl lg:text-3xl font-bold text-purple-600">2025</span>
                    <span className="text-xs text-slate-500 font-semibold mt-1">September</span>
                    <div className="absolute -inset-1 bg-purple-400 rounded-full opacity-20 animate-ping"></div>
                  </div>
                </div>
                <div className="hidden lg:block lg:w-5/12 order-3"></div>
              </div>

              {/* Event 4 - CODEFEST 2024 Algothon */}
              <div 
                ref={setTimelineRef(3)}
                className={`relative flex flex-col lg:flex-row items-center lg:items-start gap-8 transition-all duration-1000 ${
                  visibleItems.includes(3) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                }`}
              >
                <div className="hidden lg:block lg:w-5/12 order-1"></div>
                <div className="w-full lg:w-2/12 flex justify-center order-1 lg:order-2">
                  <div className={`w-28 h-28 lg:w-32 lg:h-32 bg-white rounded-full shadow-2xl border-4 border-green-500 flex flex-col items-center justify-center relative z-20 transition-all duration-700 delay-300 hover:scale-105 ${
                    visibleItems.includes(3) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}>
                    <span className="text-2xl lg:text-3xl font-bold text-green-600">2025</span>
                    <span className="text-xs text-slate-500 font-semibold mt-1">January</span>
                    <div className="absolute -inset-1 bg-green-400 rounded-full opacity-20 animate-ping"></div>
                  </div>
                </div>
                <div className="w-full lg:w-5/12 lg:pl-8 order-2 lg:order-3">
                  <div className="bg-white rounded-2xl p-6 shadow-[0_30px_70px_-40px_rgba(16,185,129,0.35)] transition-all duration-500 border border-emerald-100 hover:-translate-y-1 hover:shadow-emerald-200/80">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-linear-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          Finalists – CODEFEST 2024 Algothon
                        </h3>
                        <p className="text-sm text-emerald-700 mb-2 font-medium">📍 SLIIT Malabe Campus</p>
                        <p className="text-sm text-slate-500 mb-3">👥 Dilusha Chamika, Hesara Perera, Sandil Perera</p>
                        <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                          Reached the final round of the CODEFEST 2024 Algothon competition after solving complex algorithmic challenges.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full font-semibold">Algorithms</span>
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full font-semibold">Problem Solving</span>
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full font-semibold">Finalists</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event 5 - SLIITXtreme 3.0 */}
              <div 
                ref={setTimelineRef(4)}
                className={`relative flex flex-col lg:flex-row items-center lg:items-start gap-8 transition-all duration-1000 ${
                  visibleItems.includes(4) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                }`}
              >
                <div className="w-full lg:w-5/12 lg:pr-8 lg:text-right order-2 lg:order-1">
                  <div className="bg-white rounded-2xl p-6 shadow-[0_30px_70px_-40px_rgba(248,113,113,0.35)] transition-all duration-500 border border-orange-100 hover:-translate-y-1 hover:shadow-orange-200/80">
                    <div className="flex lg:flex-row-reverse items-start gap-4">
                      <div className="w-12 h-12 bg-linear-to-br from-orange-400 via-amber-500 to-rose-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          5th Place – SLIITXtreme 3.0
                        </h3>
                        <p className="text-sm text-orange-600 mb-2 font-medium">📍 SLIIT Malabe Campus</p>
                        <p className="text-sm text-slate-500 mb-3">👥 Dilusha Chamika, Hesara Perera, Sandil Perera</p>
                        <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                          Achieved 5th place at SLIITXtreme 3.0, demonstrating teamwork and competitive coding skills under time pressure.
                        </p>
                        <div className="flex lg:justify-end gap-2 flex-wrap">
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-semibold">Competitive Programming</span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-semibold">Teamwork</span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-semibold">Coding Challenge</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-2/12 flex justify-center order-1 lg:order-2">
                  <div className={`w-28 h-28 lg:w-32 lg:h-32 bg-white rounded-full shadow-2xl border-4 border-orange-500 flex flex-col items-center justify-center relative z-20 transition-all duration-700 delay-300 hover:scale-105 ${
                    visibleItems.includes(4) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}>
                    <span className="text-2xl lg:text-3xl font-bold text-orange-600">2024</span>
                    <span className="text-xs text-slate-500 font-semibold mt-1">October</span>
                    <div className="absolute -inset-1 bg-orange-400 rounded-full opacity-20 animate-ping"></div>
                  </div>
                </div>
                <div className="hidden lg:block lg:w-5/12 order-3"></div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 lg:py-28 bg-[#eef3ff] border-t border-slate-200 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-gradient-to-br from-cyan-300/30 to-violet-300/30 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-gradient-to-br from-orange-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,161,120,0.18),_transparent_65%)]" aria-hidden></div>
        <div 
          ref={(el) => { sectionRefs.current['research'] = el; }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center transition-all duration-700 ${
            visibleSections.includes('research') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Research
          </h2>
          <div className={`bg-white rounded-2xl shadow-[0_25px_70px_-40px_rgba(14,165,233,0.35)] p-8 border border-slate-200 transition-all duration-500 delay-200 hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-200 hover:shadow-cyan-200/70 ${
            visibleSections.includes('research') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center shrink-0 hover:bg-cyan-500/20 hover:rotate-12 transition-all duration-300">
                <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                  Advanced Network Intrusion Detection Using Machine Learning
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  <span className="font-medium text-slate-900">Authors:</span> Dilusha Chamika, Hesara Perera, Sandil Perera
                </p>
                <div className="prose max-w-none text-slate-600">
                  <p className="leading-relaxed mb-4">
                    <span className="font-semibold">Abstract:</span> In the modern digital landscape, cybersecurity threats continue to evolve at an unprecedented rate, posing significant challenges to network infrastructure security. This research investigates the application of advanced machine learning algorithms for real-time network intrusion detection systems (NIDS). Our approach combines deep learning techniques with traditional signature-based detection methods to create a hybrid system capable of identifying both known and zero-day attacks.
                  </p>
                  <p className="leading-relaxed mb-4">
                    We developed NetSentryX, a comprehensive threat detection platform that utilizes convolutional neural networks (CNNs) and recurrent neural networks (RNNs) to analyze network traffic patterns. The system processes packet-level data in real-time, extracting features such as packet size, protocol type, connection duration, and behavioral anomalies. Our experimental results demonstrate a 96.8% detection accuracy with a false positive rate of less than 2.1% when tested against the CICIDS2017 and NSL-KDD datasets.
                  </p>
                  <p className="leading-relaxed">
                    The proposed architecture incorporates adaptive learning mechanisms that allow the system to continuously improve its detection capabilities through exposure to new attack vectors. This research contributes to the field of network security by providing a scalable, efficient solution that can be deployed in enterprise environments to protect critical infrastructure from sophisticated cyber threats.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full font-medium hover:bg-cyan-200 hover:scale-110 transition-all duration-300 cursor-pointer">Machine Learning</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full font-medium hover:bg-cyan-200 hover:scale-110 transition-all duration-300 cursor-pointer">Cybersecurity</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full font-medium hover:bg-cyan-200 hover:scale-110 transition-all duration-300 cursor-pointer">Network Security</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full font-medium hover:bg-cyan-200 hover:scale-110 transition-all duration-300 cursor-pointer">Deep Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="hidden bg-[#f4f7ff]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.1),_transparent_60%)]" aria-hidden></div>
        <div 
          ref={(el) => { sectionRefs.current['projects'] = el; }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center transition-all duration-700 ${
            visibleSections.includes('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className={`bg-white rounded-2xl border border-slate-200 shadow-[0_20px_60px_-35px_rgba(14,165,233,0.35)] overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-cyan-200/80 ${
              visibleSections.includes('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="h-2 bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs rounded-full font-semibold border border-emerald-200">Active</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  NetSentryX
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Advanced network threat detection system powered by machine learning algorithms. Monitors network traffic in real-time, identifies anomalies, and prevents potential cyber attacks with high accuracy.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">Python</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">TensorFlow</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">Scapy</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className={`bg-white rounded-2xl border border-slate-200 shadow-[0_20px_60px_-35px_rgba(16,185,129,0.35)] overflow-hidden transition-all duration-500 delay-150 hover:-translate-y-1 hover:shadow-emerald-200/80 ${
              visibleSections.includes('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="h-2 bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs rounded-full font-semibold border border-amber-200">Planned</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  UAV-Based Agriculture Monitoring System
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Autonomous drone system for precision agriculture using computer vision and IoT sensors. Monitors crop health, detects diseases, and optimizes irrigation through intelligent data analysis.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">Computer Vision</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">IoT</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">Python</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className={`bg-white rounded-2xl border border-slate-200 shadow-[0_20px_60px_-35px_rgba(139,92,246,0.35)] overflow-hidden transition-all duration-500 delay-300 hover:-translate-y-1 hover:shadow-violet-200/80 ${
              visibleSections.includes('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="h-2 bg-linear-to-r from-violet-400 via-indigo-500 to-cyan-400"></div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs rounded-full font-semibold border border-emerald-200">Active</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  Gym Equipment Maintenance & Ticketing System
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Full-stack web application for gym management that streamlines equipment maintenance tracking, generates automated service tickets, and provides analytics for facility operators.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">Node.js</span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-28 bg-linear-to-br from-white via-slate-50 to-slate-100 relative overflow-hidden border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Interested in collaborating or learning more about our projects? We&apos;d love to hear from you!
          </p>
          <div className="bg-white rounded-2xl shadow-[0_25px_70px_-40px_rgba(14,165,233,0.4)] p-8 inline-block border border-slate-200 hover:border-cyan-200 hover:-translate-y-2 hover:scale-105 transition-all duration-500">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center hover:bg-cyan-500/20 hover:rotate-12 transition-all duration-300">
                <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm text-slate-500 font-medium">Team Email</p>
                <a href="mailto:teamenigma.sliit@gmail.com" className="text-lg text-slate-900 hover:text-cyan-600 font-semibold transition-colors">
                  teamenigma.sliit@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center hover:bg-cyan-500/20 hover:rotate-12 transition-all duration-300">
                <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm text-slate-500 font-medium">Location</p>
                <p className="text-lg text-slate-900 font-semibold">
                  SLIIT, Malabe, Sri Lanka
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-slate-600 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xl font-bold text-slate-900 mb-1">Team Enigma</p>
              <p className="text-sm">Sri Lanka Institute of Information Technology</p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-20">
                <Image 
                  src="/logo.png" 
                  alt="Team Enigma Logo" 
                  width={430}
                  height={131}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Team Enigma. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
