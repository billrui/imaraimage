import React, { useRef, forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCreative } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

// Images
import Logo from "../assets/IMARA.jpg";
import WelcomeImage from "../assets/welcome.jpg";
import SoilImage from "../assets/soil.jpg";
import PlantImage from "../assets/plant.jpg";
import FeedImage from "../assets/feed.jpg";
import FoodImage from "../assets/food.jpg";
import FertilizerImage from "../assets/fertilizer.jpg";
import CompostImage from "../assets/compost.jpg";
import WaterImage from "../assets/water.jpg";
import EffluentImage from "../assets/effluent.jpg";
import ResearchImage from "../assets/research.jpg";

// Button styles
const BUTTON_STYLES = {
  primary: "bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-md hover:from-green-500/30 hover:to-green-600/30 text-white border border-green-500/30 hover:border-green-500/60 rounded-full transition-all duration-300 font-medium px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-green-500/20 hover:scale-105 active:scale-95",
  secondary: "bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-md hover:from-blue-500/30 hover:to-blue-600/30 text-white border border-blue-500/30 hover:border-blue-500/60 rounded-full transition-all duration-300 font-medium px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 active:scale-95",
  accent: "bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-md hover:from-purple-500/30 hover:to-purple-600/30 text-white border border-purple-500/30 hover:border-purple-500/60 rounded-full transition-all duration-300 font-medium px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base shadow-lg hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 active:scale-95",
};

// Slide data
const slides = [
  {
    title: "Welcome to Imara Analytical Laboratories",
    rightText: "More Info About Us",
    description: "Imara Analytical Laboratories (IAL) is a leading private testing laboratory headquartered in Kericho, Kenya, serving clients across East Africa.",
    shortDescription: "Accurate. Certified. Trusted laboratory testing services for Agriculture, Environment & Industry.",
    image: WelcomeImage,
    isWelcome: true,
    stats: [
      { value: "5+", label: "Years Experience", icon: "⭐" },
      { value: "1k+", label: "Happy Clients", icon: "👥" },
      { value: "10k+", label: "Tests Completed", icon: "🔬" },
      { value: "24/7", label: "Support", icon: "🕒" }
    ]
  },
  {
    title: "Soil Analysis",
    description: "Comprehensive soil testing for optimal crop production and environmental conservation.",
    table: [
      { name: "Total nitrogen", parameters: "N" },
      { name: "Soil pH", parameters: "pH" },
      { name: "Basic soil analysis", parameters: "pH, P, K, Ca, Mg, Na, OM, N, CEC" },
    ],
    image: SoilImage,
    icon: "🌱",
    metrics: { turnaround: "1-3 days" }
  },
  {
    title: "Plant Tissue Analysis",
    description: "Determine nutritional content of plant partitions for deficiency correction and monitoring.",
    table: [
      { name: "Total nitrogen", parameters: "N" },
      { name: "Leaf analysis", parameters: "N, P, K, Ca, Mg, S, Na, Fe, Mn, B, MO, Zn" },
    ],
    image: PlantImage,
    icon: "🌿",
    metrics: { turnaround: "1-3 days" }
  },
  {
    title: "Animal Feed Analysis",
    description: "Physical, biological and chemical analysis of various food products to determine quality and safety.",
    table: [
      { name: "Mineral elements in feeds", parameters: "P, K, Ca, Mg, S, Fe, Mn, B, Cu, Mo, Zn" },
      { name: "Heavy metals analysis", parameters: "Cu, Cd, Pb, Co, B, Ni, Zn, Cr, As" },
    ],
    image: FeedImage,
    icon: "🐄",
    metrics: { turnaround: "1-3 days" }
  },
  {
    title: "Food Analysis",
    description: "Quality and safety testing for human food products.",
    image: FoodImage,
    icon: "🍎",
    metrics: { turnaround: "1-3 days" }
  },
  {
    title: "Fertilizer Analysis",
    description: "Determine quality and chemical composition of fertilizers for optimal crop yield.",
    image: FertilizerImage,
    icon: "🧪",
    metrics: { turnaround: "1-3 days" }
  },
  {
    title: "Compost / Manure Analysis",
    description: "Organic matter evaluation supporting sustainable soil management.",
    image: CompostImage,
    icon: "🌿",
    metrics: { turnaround: "1-3 days" }
  },
  {
    title: "Water Analysis",
    description: "Physical, biological, and chemical tests for various water types.",
    table: [
      { name: "Microbial", parameters: "Coliforms, E.coli, TVC, Salmonella" },
      { name: "Complete irrigation water", parameters: "pH, Na, Al, Ca, Mg, Cl, EC, TDS, S, Ni, P, K, B, SO4, Total nitrogen, NH4" },
    ],
    image: WaterImage,
    icon: "💧",
    metrics: { turnaround: "1-3 days" }
  },
  {
    title: "NEMA Effluent Analysis",
    description: "Environmental discharge testing meeting regulatory compliance standards.",
    image: EffluentImage,
    icon: "🏭",
    metrics: { turnaround: "1-3 days" }
  },
  {
    title: "Research Analysis",
    description: "Advanced analytical support for universities, colleges, and research institutions.",
    table: [
      { name: "Heavy Metals Analysis", parameters: "Se, Ni, Pb, Cd, Co, Cr, Zn" },
    ],
    image: ResearchImage,
    icon: "🔬",
    metrics: { turnaround: "Custom" }
  },
];

const HeroWithNavbar = forwardRef((props, ref) => {
  const [swiper, setSwiper] = useState(null);
  const [showServicePopup, setShowServicePopup] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [currentInfo, setCurrentInfo] = useState({ title: "", description: "", table: null, icon: "", metrics: {} });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [hoveredLink, setHoveredLink] = useState(null);
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);

  const whatsappNumber = "+254736351633";
  const serviceTitles = slides.slice(1);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ["hero", "about", "services", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body overflow control
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  useImperativeHandle(ref, () => ({
    resetSwiper: () => swiper?.slideToLoop(0, 500),
    goToSlide: (index) => swiper?.slideTo(index)
  }));

  // WhatsApp handlers
  const handleWhatsApp = (message) => {
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleServiceClick = (service) => {
    handleWhatsApp(`Hello, I would like to request: ${service.title}`);
    setShowServicePopup(false);
  };

  const handleRequestPrice = () => handleWhatsApp("Hello, I would like the Price List.");
  const handleRequestCallback = () => handleWhatsApp("Hello, I would like a call back.");

  const handleReadMore = (slide) => {
    setCurrentInfo({ 
      title: slide.title, 
      description: slide.description, 
      table: slide.table || null,
      icon: slide.icon || null,
      metrics: slide.metrics || null,
    });
    setShowInfoPopup(true);
  };

  // Navigation functions
  const handleOurServicesClick = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => swiper?.slideToLoop(0, 500), 400);
    setActiveLink("home");
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = document.querySelector("header")?.offsetHeight || 0;
      window.scrollTo({
        top: element.offsetTop - navbarHeight,
        behavior: "smooth",
      });
    }
    
    setActiveLink(href.replace("#", ""));
  };

  // Menu links
  const menuLinks = [
    { href: "#hero", label: "Home", onClick: handleHomeClick, id: "home" },
    { href: "#about", label: "About", onClick: (e) => handleLinkClick(e, "#about"), id: "about" },
    { href: "#services", label: "Services", onClick: (e) => handleLinkClick(e, "#services"), id: "services" },
    { href: "#contact", label: "Contact", onClick: (e) => handleLinkClick(e, "#contact"), id: "contact" },
  ];

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/5 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{ 
              y: [null, -30, 30],
              x: [null, Math.random() * 50 - 25],
            }}
            transition={{ 
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-gray-900/80 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent py-4 md:py-5"
        }`}
        style={{
          background: scrolled ? "rgba(17, 24, 39, 0.8)" : "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)"
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative cursor-pointer group"
            onClick={handleHomeClick}
          >
            <div className="relative flex items-center gap-3">
              <img 
                src={Logo} 
                alt="Imara Analytical Laboratories" 
                className="h-10 md:h-12 rounded-xl relative z-10 shadow-lg"
              />
              <div className="hidden lg:block">
                <span className="text-sm font-light text-white/80">Imara Analytical</span>
                <span className="block text-xs text-white/60">Laboratories</span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {menuLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ y: -2 }}
                onClick={link.onClick}
                onHoverStart={() => setHoveredLink(link.id)}
                onHoverEnd={() => setHoveredLink(null)}
                className="relative group"
              >
                <span className={`text-sm lg:text-base font-medium transition-colors duration-300 ${
                  activeLink === link.id ? "text-white" : "text-white/70 group-hover:text-white"
                }`}>
                  {link.label}
                </span>
                <motion.span 
                  className="absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: activeLink === link.id || hoveredLink === link.id ? "100%" : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Button */}
            <motion.div
              className="relative hidden sm:block"
              onHoverStart={() => setShowWhatsAppTooltip(true)}
              onHoverEnd={() => setShowWhatsAppTooltip(false)}
            >
              <motion.a
                href="https://wa.me/254736351633"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-md border border-green-500/30 hover:border-green-500/60 rounded-full transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-green-400 text-lg">📱</span>
                <span className="text-white text-sm font-medium hidden lg:inline">Chat on WhatsApp</span>
                <span className="text-white text-sm font-medium lg:hidden">WhatsApp</span>
              </motion.a>

              <AnimatePresence>
                {showWhatsAppTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-12 right-0 bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap shadow-xl"
                  >
                    Chat with us 24/7 on WhatsApp
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-12 h-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/20 shadow-lg z-50 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-5 h-5 flex flex-col justify-center gap-1.5">
                <motion.span 
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                />
                <motion.span 
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span 
                  className="w-full h-0.5 bg-white rounded-full"
                  animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)" }}
          >
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/5 rounded-full"
                  initial={{ 
                    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                  }}
                  animate={{ 
                    scale: [0, 1, 0],
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 space-y-6 text-center">
              {menuLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={link.onClick}
                  className="group relative block"
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="relative text-3xl md:text-4xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </div>

            <motion.a
              href="https://wa.me/254736351633"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-md border border-green-500/30 rounded-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-green-400 text-2xl">📱</span>
              <span className="text-white font-medium">Chat on WhatsApp</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Swiper */}
      <Swiper
        onSwiper={setSwiper}
        modules={[Navigation, Pagination, EffectCreative]}
        loop={true}
        speed={1000}
        effect="creative"
        creativeEffect={{
          prev: { translate: [0, 0, -400], opacity: 0 },
          next: { translate: [0, 0, -400], opacity: 0 },
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
          className: "hero-pagination"
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%), url(${slide.image})`,
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]"></div>
              
              <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24">
                <div className="max-w-7xl mx-auto">
                  {slide.isWelcome ? (
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-6rem)]">
                      {/* Left column */}
                      <div className="text-center lg:text-left">
                        <motion.h1
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6"
                        >
                          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {slide.title}
                          </span>
                        </motion.h1>

                        <motion.p
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl lg:mx-0 mx-auto leading-relaxed"
                        >
                          {slide.shortDescription}
                        </motion.p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                          {slide.stats?.map((stat, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              className="text-center lg:text-left"
                            >
                              <div className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center lg:justify-start gap-2">
                                <span className="text-green-400">{stat.icon}</span>
                                <span>{stat.value}</span>
                              </div>
                              <div className="text-xs md:text-sm text-gray-300">{stat.label}</div>
                            </motion.div>
                          ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowServicePopup(true)}
                            className={BUTTON_STYLES.primary}
                          >
                            Request Service
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleRequestPrice}
                            className={BUTTON_STYLES.secondary}
                          >
                            Price List
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleRequestCallback}
                            className={BUTTON_STYLES.accent}
                          >
                            Call Back
                          </motion.button>
                        </div>

                        {/* Our Services button */}
                        <motion.button
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          whileHover={{ scale: 1.1 }}
                          onClick={handleOurServicesClick}
                          className="mt-8 group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-full border border-white/30 hover:border-white/60 shadow-2xl hover:shadow-green-500/20 transition-all duration-300"
                        >
                          <span className="text-base md:text-lg font-semibold text-white">Explore All Services</span>
                          <span className="text-white text-xl animate-pulse">→</span>
                        </motion.button>
                      </div>

                      {/* Right column - Info Card */}
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="hidden lg:block"
                      >
                        <motion.div 
                          className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
                          whileHover={{ y: -5 }}
                        >
                          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-green-400 to-blue-500 rounded-full"></span>
                            {slide.rightText}
                          </h3>
                          <p className="text-gray-200 mb-6 leading-relaxed">
                            Learn more about our accredited laboratory services and quality standards.
                          </p>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleReadMore(slide)}
                            className={BUTTON_STYLES.secondary + " w-full mb-6"}
                          >
                            Read More
                          </motion.button>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <span className="text-purple-400">✓</span>
                              </div>
                              <span className="text-white/80 text-sm">NEMA Approved</span>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  ) : (
                    // Service slides
                    <div className="max-w-3xl mx-auto text-center min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="relative mb-6"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-full blur-2xl"></div>
                        <div className="relative text-7xl md:text-8xl bg-white/5 backdrop-blur-xl rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center border-2 border-white/20">
                          {slide.icon}
                        </div>
                      </motion.div>

                      <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                      >
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {slide.title}
                        </span>
                      </motion.h1>

                      {slide.metrics?.turnaround && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mb-8"
                        >
                          <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-full border border-white/20 text-white">
                            <span className="text-blue-400">⏱️</span>
                            <span>Turnaround: {slide.metrics.turnaround}</span>
                          </span>
                        </motion.div>
                      )}

                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleReadMore(slide)}
                        className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-full border border-white/30 hover:border-white/60 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
                      >
                        <span className="text-lg font-semibold text-white">View Details</span>
                        <span className="text-white animate-pulse">→</span>
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 text-white text-3xl lg:text-4xl w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 z-30"
                onClick={() => swiper?.slidePrev()}
              >
                ‹
              </button>
              <button
                className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 text-white text-3xl lg:text-4xl w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 z-30"
                onClick={() => swiper?.slideNext()}
              >
                ›
              </button>

              {/* Slide counter for service slides */}
              {!slide.isWelcome && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-20 md:bottom-24 right-4 md:right-8 z-30"
                >
                  <div className="px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/20 text-white/60 text-xs md:text-sm font-mono">
                    {String(index).padStart(2, '0')} / {String(slides.length - 1).padStart(2, '0')}
                  </div>
                </motion.div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Service Popup */}
      <AnimatePresence>
        {showServicePopup && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setShowServicePopup(false)}
          >
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl w-full max-w-3xl p-6 md:p-8 shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Our Services
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                {serviceTitles.map((service, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleServiceClick(service)}
                    className="group relative p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white text-left transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative flex items-center gap-4">
                      <span className="text-3xl bg-white/5 rounded-xl w-12 h-12 flex items-center justify-center border border-white/10">
                        {service.icon || "🔬"}
                      </span>
                      <div>
                        <div className="font-semibold text-white mb-1">{service.title}</div>
                        {service.metrics?.turnaround && (
                          <div className="text-xs text-gray-400 flex items-center gap-1">
                            <span className="text-blue-400">⏱️</span>
                            {service.metrics.turnaround}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowServicePopup(false)}
                className="mt-6 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/20 transition-all duration-300 font-medium"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Popup */}
      <AnimatePresence>
        {showInfoPopup && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setShowInfoPopup(false)}
          >
            <motion.div
              className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl w-full max-w-4xl p-6 md:p-8 shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl bg-white/5 rounded-2xl w-16 h-16 flex items-center justify-center border border-white/20">
                  {currentInfo.icon || "🔬"}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  {currentInfo.title}
                </h2>
              </div>

              {currentInfo.metrics?.turnaround && (
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400">
                    <span>⏱️</span>
                    Turnaround: {currentInfo.metrics.turnaround}
                  </span>
                </div>
              )}

              <p className="text-gray-200 leading-relaxed mb-6">{currentInfo.description}</p>

              {currentInfo.table && (
                <div className="overflow-x-auto mb-6 rounded-xl border border-white/10">
                  <table className="w-full text-white">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Analysis Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Parameters Included</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {currentInfo.table.map((row, idx) => (
                        <motion.tr 
                          key={idx} 
                          className="hover:bg-white/5 transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <td className="px-4 py-3 text-sm">{row.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{row.parameters}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowInfoPopup(false);
                    setShowServicePopup(true);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30 text-white border border-green-500/30 transition-all duration-300 font-medium"
                >
                  Request Service
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowInfoPopup(false)}
                  className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/20 transition-all duration-300 font-medium"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`

      `}</style>
    </section>
  );
});

export default HeroWithNavbar;