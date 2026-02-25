import React, { useState, useEffect } from "react";
import {
  ClipboardCheck,
  Clock,
  ShieldCheck,
  ChevronRight,
  User,
  Building2,
  Wrench,
  CheckCircle2,
  Menu,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          </div>
          <span className="text-xl font-bold text-primary tracking-tight">
            ASTU <span className="text-accent">SmartComp</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {["How It Works", "Features", "FAQ", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-semibold text-primary px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
            Login
          </button>
          <button className="text-sm font-semibold bg-primary text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg hover:bg-primary/90 transition-all">
            Register
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white mt-4 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {["How It Works", "Features", "FAQ", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-lg font-medium text-gray-800 py-2 border-b border-gray-50"
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <button className="w-full text-center py-3 font-semibold text-primary border border-primary/20 rounded-xl">
                  Login
                </button>
                <button className="w-full text-center py-3 font-semibold bg-primary text-white rounded-xl shadow-lg">
                  Register
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-100 hover:shadow-2xl transition-all border border-gray-100 group"
  >
    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-sm md:text-base">
      {description}
    </p>
  </motion.div>
);

const StepItem = ({
  number,
  title,
  description,
  isActive,
}: {
  number: string;
  title: string;
  description: string;
  isActive?: boolean;
}) => (
  <div className="flex items-start gap-4 mb-8">
    <div
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
        isActive ? "bg-white text-primary" : "bg-white/20 text-white",
      )}
    >
      {number}
    </div>
    <div>
      <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
      <p className="text-white/70 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-accent selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Official University System
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-8 leading-[1.1]">
              Report. Track. <br />
              <span className="text-accent underline decoration-primary/10 transition-all hover:decoration-primary/30">
                Resolve.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-xl">
              Empowering ASTU students and staff with a streamlined digital
              platform to manage complaints, track infrastructure issues, and
              academic grievances with complete transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:bg-primary/90 flex items-center justify-center gap-2 group transition-all">
                File a Complaint{" "}
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="px-8 py-4 bg-white text-primary border border-gray-200 rounded-2xl font-bold shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
                View Status
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl z-10">
              <img
                src="/landingpage-image.png"
                alt="ASTU Staff and Students"
                className="w-full aspect-auto object-contain"
              />
            </div>
            {/* Stats Card Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4 border border-gray-100"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-600">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                  Last Resolution
                </p>
                <p className="text-base font-bold text-primary">2 hours ago</p>
              </div>
            </motion.div>
            {/* Decors */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/10 rounded-[4rem] rotate-6 scale-90 blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4">
            Core Capabilities
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">
            Designed for Accountability
          </h2>
          <div className="w-20 h-1.5 bg-accent mx-auto rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={ClipboardCheck}
            title="Structured Tracking"
            description="Categorize and submit issues through formal university channels with standardized forms for every department."
            delay={0.1}
          />
          <FeatureCard
            icon={Clock}
            title="Real-Time Status"
            description="Monitor the progress of your requests with live updates and automated email notifications for every action taken."
            delay={0.2}
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Transparent Process"
            description="Full accountability with a clear trail from submission to final resolution, including admin notes and timeframes."
            delay={0.3}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-primary rounded-[3rem] p-10 md:p-20 overflow-hidden relative">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="grid lg:grid-cols-2 gap-16 relative z-10 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
                How It Works
              </h2>
              <p className="text-white/60 text-lg mb-12">
                The system connects you directly to the relevant university
                department, ensuring your voice is heard and issues are handled
                by the right professionals.
              </p>

              <div className="space-y-6">
                <StepItem
                  number="1"
                  title="Student Submits Complaint"
                  description="Use our simple form to describe the issue and attach evidence."
                  isActive
                />
                <StepItem
                  number="2"
                  title="Department Review"
                  description="Relevant administrators review and assign priority to the case."
                />
                <StepItem
                  number="3"
                  title="Final Resolution"
                  description="Issue is resolved and the student provides feedback on the process."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: User,
                  label: "Student",
                  sub: "Voice Heard",
                  color: "bg-white/10",
                },
                {
                  icon: Wrench,
                  label: "Execution",
                  sub: "Technical Support",
                  color: "bg-white/10",
                },
                {
                  icon: Building2,
                  label: "Department",
                  sub: "Resource Allocation",
                  color: "bg-white/10",
                },
                {
                  icon: CheckCircle2,
                  label: "Resolved",
                  sub: "Issue Closed",
                  color: "bg-white text-primary",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "p-8 rounded-[2rem] shadow-xl flex flex-col items-center justify-center text-center gap-4 border border-white/10",
                    item.color,
                  )}
                >
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-2",
                      item.color.includes("bg-white text-primary")
                        ? "bg-accent/10 text-accent"
                        : "bg-white/10 text-white",
                    )}
                  >
                    <item.icon size={32} />
                  </div>
                  <div>
                    <h5
                      className={cn(
                        "font-black mb-1",
                        item.color.includes("bg-white text-primary")
                          ? "text-primary"
                          : "text-white",
                      )}
                    >
                      {item.label}
                    </h5>
                    <p
                      className={cn(
                        "text-xs font-medium opacity-60",
                        item.color.includes("bg-white text-primary")
                          ? "text-primary/60"
                          : "text-white/60",
                      )}
                    >
                      {item.sub}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-primary mb-8">
            Ready to improve campus life?
          </h2>
          <p className="text-lg text-gray-500 mb-12">
            Join thousands of students and staff members who are helping build a
            better university environment through active communication and
            transparency.
          </p>
          <button className="px-12 py-5 bg-primary text-white rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all">
            Access Dashboard
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-gray-100 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <Globe size={20} />
              </div>
              <span className="text-lg font-extrabold text-primary">
                ASTU SmartComp
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              The official Issue Tracking and Complaint Management System for
              Adama Science and Technology University.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h6 className="font-bold text-gray-800 mb-6 underline decoration-accent/20 decoration-2 underline-offset-4">
              Platform
            </h6>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li>
                <a href="#" className="hover:text-primary">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Submit Report
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Admin Portal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-gray-800 mb-6 underline decoration-accent/20 decoration-2 underline-offset-4">
              Support
            </h6>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li>
                <a href="#" className="hover:text-primary">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Contact Registrar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  IT Helpdesk
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Knowledge Base
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-gray-800 mb-6 underline decoration-accent/20 decoration-2 underline-offset-4">
              University
            </h6>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li>
                <a href="#" className="hover:text-primary">
                  ASTU Website
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Campus Map
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Announcements
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary">
                  Student Union
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 flex flex-col md:row-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-gray-300">
            © 2026 Adama Science and Technology University. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
