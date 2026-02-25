import React from "react";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
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
  );
};

export default Hero;
