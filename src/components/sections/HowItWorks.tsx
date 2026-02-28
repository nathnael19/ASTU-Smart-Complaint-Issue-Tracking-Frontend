import { User, Building2, Wrench, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

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

const HowItWorks = () => {
  return (
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
              department, ensuring your voice is heard and issues are handled by
              the right professionals.
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
  );
};

export default HowItWorks;
