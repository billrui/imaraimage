import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

//import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import SocialBar from "./components/SocialBar";
import WaterFooter from "./components/WaterFooter";

function App() {
  const heroRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative">
      <Hero ref={heroRef} />

      <About />
      <Services />
      <Contact />
      <SocialBar />
      <WaterFooter />
    </div>
  );
}

export default App;
