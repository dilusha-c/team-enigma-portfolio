'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([0, 1, 2]);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
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

  const setTimelineRef = (index: number) => (el: HTMLDivElement | null) => {
    timelineRefs.current[index] = el;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Team Enigma
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="#members" className="text-gray-700 hover:text-gray-900 transition-colors">
                Members
              </a>
              <a href="#research" className="text-gray-700 hover:text-gray-900 transition-colors">
                Research
              </a>
              <a href="#projects" className="text-gray-700 hover:text-gray-900 transition-colors">
                Projects
              </a>
              <a href="#competitions" className="text-gray-700 hover:text-gray-900 transition-colors">
                Competitions
              </a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 transition-colors">
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                About
              </a>
              <a href="#members" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Members
              </a>
              <a href="#research" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Research
              </a>
              <a href="#projects" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Projects
              </a>
              <a href="#competitions" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Competitions
              </a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Team Enigma
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            A research-driven student team from SLIIT, focused on solving real-world problems through engineering, software development, and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#projects"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto"
            >
              View Projects
            </a>
            <a
              href="#research"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-md border border-blue-200 w-full sm:w-auto"
            >
              View Research
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 lg:py-24 bg-white">
        <div 
          ref={(el) => { sectionRefs.current['about'] = el; }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center transition-all duration-700 ${
            visibleSections.includes('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            About Team Enigma
          </h2>
          <p className={`text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto transition-all duration-700 delay-200 ${
            visibleSections.includes('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Team Enigma is a multidisciplinary research and competition team from the Sri Lanka Institute of Information Technology (SLIIT), bringing together talented students from Computer Systems Engineering and Computer Science programs. We are passionate about tackling real-world challenges through innovative solutions in software development, network security, robotics, and emerging technologies. Our team thrives on collaboration, continuous learning, and pushing the boundaries of what&apos;s possible in engineering and computer science. We actively participate in hackathons, programming competitions, and research initiatives to make a meaningful impact in the tech community.
          </p>
        </div>
      </section>

      {/* Members Section */}
      <section id="members" className="py-16 lg:py-24 bg-gray-50">
        <div 
          ref={(el) => { sectionRefs.current['members'] = el; }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center transition-all duration-700 ${
            visibleSections.includes('members') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Member 1 */}
            <div className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-700 ${
              visibleSections.includes('members') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                DC
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Dilusha Chamika
              </h3>
              <p className="text-sm text-blue-600 text-center mb-3 font-medium">
                Computer Systems Engineering Undergraduate
              </p>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Specializing in embedded systems and network security. Passionate about developing intelligent threat detection systems and working with UAV technologies for innovative applications.
              </p>
            </div>

            {/* Member 2 */}
            <div className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-700 delay-150 ${
              visibleSections.includes('members') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                HP
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Hesara Perera
              </h3>
              <p className="text-sm text-blue-600 text-center mb-3 font-medium">
                Computer Science Undergraduate
              </p>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Full-stack developer with expertise in web technologies and software architecture. Focused on building scalable applications and exploring machine learning integration in practical systems.
              </p>
            </div>

            {/* Member 3 */}
            <div className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-700 delay-300 ${
              visibleSections.includes('members') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                SP
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Sandil Perera
              </h3>
              <p className="text-sm text-blue-600 text-center mb-3 font-medium">
                Computer Science Undergraduate
              </p>
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                Software engineer passionate about automation and intelligent systems. Experienced in database design, API development, and creating user-centric solutions for complex problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-16 lg:py-24 bg-white">
        <div 
          ref={(el) => { sectionRefs.current['research'] = el; }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center transition-all duration-700 ${
            visibleSections.includes('research') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Research
          </h2>
          <div className={`bg-white rounded-xl shadow-lg p-8 border border-gray-100 transition-all duration-700 delay-200 ${
            visibleSections.includes('research') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  Advanced Network Intrusion Detection Using Machine Learning
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  <span className="font-medium">Authors:</span> Dilusha Chamika, Hesara Perera, Sandil Perera
                </p>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <span className="font-semibold">Abstract:</span> In the modern digital landscape, cybersecurity threats continue to evolve at an unprecedented rate, posing significant challenges to network infrastructure security. This research investigates the application of advanced machine learning algorithms for real-time network intrusion detection systems (NIDS). Our approach combines deep learning techniques with traditional signature-based detection methods to create a hybrid system capable of identifying both known and zero-day attacks.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We developed NetSentryX, a comprehensive threat detection platform that utilizes convolutional neural networks (CNNs) and recurrent neural networks (RNNs) to analyze network traffic patterns. The system processes packet-level data in real-time, extracting features such as packet size, protocol type, connection duration, and behavioral anomalies. Our experimental results demonstrate a 96.8% detection accuracy with a false positive rate of less than 2.1% when tested against the CICIDS2017 and NSL-KDD datasets.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The proposed architecture incorporates adaptive learning mechanisms that allow the system to continuously improve its detection capabilities through exposure to new attack vectors. This research contributes to the field of network security by providing a scalable, efficient solution that can be deployed in enterprise environments to protect critical infrastructure from sophisticated cyber threats.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">Machine Learning</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">Cybersecurity</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">Network Security</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">Deep Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 lg:py-24 bg-gray-50">
        <div 
          ref={(el) => { sectionRefs.current['projects'] = el; }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center transition-all duration-700 ${
            visibleSections.includes('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-700 ${
              visibleSections.includes('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">Active</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  NetSentryX
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Advanced network threat detection system powered by machine learning algorithms. Monitors network traffic in real-time, identifies anomalies, and prevents potential cyber attacks with high accuracy.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Python</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">TensorFlow</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Scapy</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-700 delay-150 ${
              visibleSections.includes('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="h-2 bg-gradient-to-r from-green-500 to-teal-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-semibold">Planned</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  UAV-Based Agriculture Monitoring System
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Autonomous drone system for precision agriculture using computer vision and IoT sensors. Monitors crop health, detects diseases, and optimizes irrigation through intelligent data analysis.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Computer Vision</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">IoT</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Python</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-700 delay-300 ${
              visibleSections.includes('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">Active</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Gym Equipment Maintenance & Ticketing System
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Full-stack web application for gym management that streamlines equipment maintenance tracking, generates automated service tickets, and provides analytics for facility operators.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Node.js</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competitions Section */}
      <section id="competitions" className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-16 text-center">
            Competitions & Events
          </h2>
          
          {/* Timeline Container */}
          <div className="relative">
            {/* Center Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-600 hidden lg:block"></div>
            
            {/* Timeline Items */}
            <div className="space-y-24 lg:space-y-32">
              
              {/* Event 1 - Left Side */}
              <div 
                ref={setTimelineRef(0)}
                className={`relative flex flex-col lg:flex-row items-center lg:items-start gap-8 transition-all duration-1000 ${
                  visibleItems.includes(0) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                }`}
              >
                {/* Content - Left */}
                <div className="w-full lg:w-5/12 lg:pr-8 lg:text-right order-2 lg:order-1">
                  <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-blue-100 hover:scale-105 transform hover:rotate-1">
                    <div className="flex lg:flex-row-reverse items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Hackathon at Gold Face Hotel
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                          Participated in an intensive 24-hour hackathon focusing on developing innovative solutions for sustainable tourism. Our team developed a smart booking platform with AI-powered recommendations.
                        </p>
                        <div className="flex lg:justify-end gap-2 flex-wrap">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold hover:bg-blue-200 transition-colors">AI/ML</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold hover:bg-blue-200 transition-colors">Web Dev</span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-semibold hover:bg-blue-200 transition-colors">24hrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Center Circle with Date */}
                <div className="w-full lg:w-2/12 flex justify-center order-1 lg:order-2">
                  <div className={`w-28 h-28 lg:w-32 lg:h-32 bg-white rounded-full shadow-2xl border-4 border-blue-500 flex flex-col items-center justify-center relative z-20 transition-all duration-1000 delay-300 hover:scale-110 hover:rotate-12 ${
                    visibleItems.includes(0) ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
                  }`}>
                    <span className="text-2xl lg:text-3xl font-bold text-blue-600">2025</span>
                    <span className="text-xs text-gray-600 font-semibold mt-1">March</span>
                    <div className="absolute -inset-1 bg-blue-400 rounded-full opacity-20 animate-ping"></div>
                  </div>
                </div>
                
                {/* Empty Right Space */}
                <div className="hidden lg:block lg:w-5/12 order-3"></div>
              </div>

              {/* Event 2 - Right Side */}
              <div 
                ref={setTimelineRef(1)}
                className={`relative flex flex-col lg:flex-row items-center lg:items-start gap-8 transition-all duration-1000 ${
                  visibleItems.includes(1) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                }`}
              >
                {/* Empty Left Space */}
                <div className="hidden lg:block lg:w-5/12 order-1"></div>
                
                {/* Center Circle with Date */}
                <div className="w-full lg:w-2/12 flex justify-center order-1 lg:order-2">
                  <div className={`w-28 h-28 lg:w-32 lg:h-32 bg-white rounded-full shadow-2xl border-4 border-indigo-500 flex flex-col items-center justify-center relative z-20 transition-all duration-1000 delay-300 hover:scale-110 hover:-rotate-12 ${
                    visibleItems.includes(1) ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-180'
                  }`}>
                    <span className="text-2xl lg:text-3xl font-bold text-indigo-600">2025</span>
                    <span className="text-xs text-gray-600 font-semibold mt-1">February</span>
                    <div className="absolute -inset-1 bg-indigo-400 rounded-full opacity-20 animate-ping"></div>
                  </div>
                </div>
                
                {/* Content - Right */}
                <div className="w-full lg:w-5/12 lg:pl-8 order-2 lg:order-3">
                  <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-indigo-100 hover:scale-105 transform hover:-rotate-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          CodeQuest 2025 – CTF Competition
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                          Competed in one of the premier Capture The Flag cybersecurity competitions in Sri Lanka. Solved challenges across cryptography, reverse engineering, web exploitation, and network security.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-semibold hover:bg-indigo-200 transition-colors">Cybersecurity</span>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-semibold hover:bg-indigo-200 transition-colors">CTF</span>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-semibold hover:bg-indigo-200 transition-colors">Crypto</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event 3 - Left Side */}
              <div 
                ref={setTimelineRef(2)}
                className={`relative flex flex-col lg:flex-row items-center lg:items-start gap-8 transition-all duration-1000 ${
                  visibleItems.includes(2) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                }`}
              >
                {/* Content - Left */}
                <div className="w-full lg:w-5/12 lg:pr-8 lg:text-right order-2 lg:order-1">
                  <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-purple-100 hover:scale-105 transform hover:rotate-1">
                    <div className="flex lg:flex-row-reverse items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          RoboGames 2024 – Webots Simulation
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                          Participated in the robotics simulation competition using Webots platform. Programmed autonomous robots to navigate complex environments, avoid obstacles, and complete mission-critical tasks.
                        </p>
                        <div className="flex lg:justify-end gap-2 flex-wrap">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold hover:bg-purple-200 transition-colors">Robotics</span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold hover:bg-purple-200 transition-colors">Simulation</span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold hover:bg-purple-200 transition-colors">Webots</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Center Circle with Date */}
                <div className="w-full lg:w-2/12 flex justify-center order-1 lg:order-2">
                  <div className={`w-28 h-28 lg:w-32 lg:h-32 bg-white rounded-full shadow-2xl border-4 border-purple-500 flex flex-col items-center justify-center relative z-20 transition-all duration-1000 delay-300 hover:scale-110 hover:rotate-12 ${
                    visibleItems.includes(2) ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
                  }`}>
                    <span className="text-2xl lg:text-3xl font-bold text-purple-600">2024</span>
                    <span className="text-xs text-gray-600 font-semibold mt-1">November</span>
                    <div className="absolute -inset-1 bg-purple-400 rounded-full opacity-20 animate-ping"></div>
                  </div>
                </div>
                
                {/* Empty Right Space */}
                <div className="hidden lg:block lg:w-5/12 order-3"></div>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Interested in collaborating or learning more about our projects? We&apos;d love to hear from you!
          </p>
          <div className="bg-white rounded-xl shadow-md p-8 inline-block">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500 font-medium">Team Email</p>
                <a href="mailto:contact@teamenigma.lk" className="text-lg text-blue-600 hover:text-blue-700 font-semibold">
                  contact@teamenigma.lk
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500 font-medium">Location</p>
                <p className="text-lg text-gray-900 font-semibold">
                  SLIIT, Malabe, Sri Lanka
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xl font-bold mb-1">Team Enigma</p>
              <p className="text-gray-400 text-sm">Sri Lanka Institute of Information Technology</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Team Enigma. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
