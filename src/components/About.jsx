import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Images
import TeamImage from "../assets/About1.jpg";
import LaboratoryImage from "../assets/About2.jpg";

export default function About() {
  const [activeTab, setActiveTab] = useState(0);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Tab data
  const tabs = [
    { id: 0, label: "Overview", icon: "📊" },
    { id: 1, label: "Mission & Vision", icon: "🎯" },
    { id: 2, label: "Core Values", icon: "💎" },
    { id: 3, label: "Accreditations", icon: "🏆" }
  ];

  // Core values data
  const coreValues = [
    { title: "Integrity", desc: "We build trust through transparency, ethical practices, and accountability.", icon: "🤝" },
    { title: "Innovation", desc: "We embrace advanced techniques and ISO/IEC 17025:2017 standards.", icon: "💡" },
    { title: "Excellence", desc: "We pursue the highest standards in testing and advisory services.", icon: "⭐" },
    { title: "Reliability", desc: "Our clients depend on us for timely, consistent, and accurate results.", icon: "⚡" },
    { title: "Customer Focus", desc: "We tailor solutions to empower informed, confident decisions.", icon: "👥" }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white py-12 md:py-16 lg:py-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              About Imara Analytical
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Your trusted partner in laboratory testing and analytical services across East Africa
          </p>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "80px" } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mt-4"
          />
        </motion.div>

        {/* Main Content Grid - REMOVED max-height constraints */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - REMOVED overflow-y-auto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full" />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Our Story
              </span>
            </h3>

            <div className="space-y-4 text-gray-700 text-sm md:text-base">
              <p>
                <span className="text-green-600 font-semibold">Imara Analytical Laboratories (IAL)</span> is a leading private testing laboratory headquartered in Kericho, Kenya, serving clients across East Africa. We specialize in comprehensive laboratory services for soil, water, effluent, fertilizers, plant tissue, human food, and animal feed.
              </p>

              <p>
                IAL partners with agricultural producers, tea and coffee farmers, water management authorities, and agribusinesses, delivering timely and reliable laboratory solutions.
              </p>

              <p>
                Committed to excellence, IAL offers affordable, accurate, and rapid testing services with hands-on guidance to support informed decision-making.
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {["NEMA Accredited", "Fast Turnaround", "Expert Consultants", "Modern Equipment"].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs md:text-sm bg-gray-50 p-2 rounded-lg">
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs">✓</span>
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - REMOVED overflow-y-auto and max-height */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100"
          >
            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span className="text-xs sm:text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content - REMOVED overflow and max-height constraints */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="min-h-[300px]"
              >
                {activeTab === 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-green-600">Who We Are</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Imara Analytical Laboratories stands at the forefront of laboratory testing in East Africa, combining cutting-edge technology with decades of collective expertise.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-green-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">24/7</div>
                        <div className="text-xs text-gray-600">Customer Support</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">100%</div>
                        <div className="text-xs text-gray-600">Accuracy Rate</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 1 && (
                  <div className="space-y-6">
                    <div className="bg-green-50/50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-green-600 mb-2 flex items-center gap-2">
                        <span>🎯</span> Our Mission
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Provide affordable laboratory testing services with unwavering commitment to customer satisfaction and scientific excellence.
                      </p>
                    </div>
                    <div className="bg-blue-50/50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-blue-600 mb-2 flex items-center gap-2">
                        <span>👁️</span> Our Vision
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        To be the leading provider of timely, innovative, and quality laboratory services across East Africa.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  <div>
                    <h4 className="text-lg font-semibold text-green-600 mb-4">Core Values</h4>
                    <div className="grid gap-4">
                      {coreValues.map((value, idx) => (
                        <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-2xl flex-shrink-0">{value.icon}</span>
                          <div>
                            <h5 className="font-semibold text-green-600 text-sm mb-1">{value.title}</h5>
                            <p className="text-gray-700 text-xs leading-relaxed">{value.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 3 && (
                  <div>
                    <h4 className="text-lg font-semibold text-green-600 mb-4">Accreditations & Certifications</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-2xl flex-shrink-0">
                          🌿
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800">NEMA Approved</h5>
                          <p className="text-xs text-gray-600 mt-1">National Environment Management Authority approved laboratory</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-2xl flex-shrink-0">
                          ✓
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-800">ISO Standards</h5>
                          <p className="text-xs text-gray-600 mt-1">Following ISO/IEC 17025:2017 quality management standards</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}