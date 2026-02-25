import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Features from "./components/sections/Features";
import HowItWorks from "./components/sections/HowItWorks";
import CTA from "./components/sections/CTA";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;
