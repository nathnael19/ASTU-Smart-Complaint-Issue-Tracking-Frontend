import { ClipboardCheck, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

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

const Features = () => {
  return (
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
  );
};

export default Features;
