import { ShieldCheck, Activity } from "lucide-react";

const AuthInfoSide = () => {
  return (
    <div className="bg-[#1e3a8a] md:w-5/12 p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-center">
      {/* Background pattern */}
      <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white/5 rounded-full" />
      <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white/5 rounded-full" />

      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold mb-8 leading-[1.2]">
          Empowering the ASTU community through transparency.
        </h1>
        <p className="text-blue-100/70 text-base leading-relaxed mb-12">
          Our smart issue tracking system ensures that every voice is heard and
          every technical challenge is addressed promptly by the right
          department.
        </p>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">
                Official University Portal
              </h3>
              <p className="text-xs text-blue-100/60 leading-relaxed">
                Secure and verified access for all members.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0">
              <Activity size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">Real-time Tracking</h3>
              <p className="text-xs text-blue-100/60 leading-relaxed">
                Monitor the progress of your requests instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthInfoSide;
