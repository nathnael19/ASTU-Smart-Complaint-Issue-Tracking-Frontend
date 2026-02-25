import { Camera, ShieldCheck, HelpCircle, ChevronRight } from "lucide-react";

const ProfileTab = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Information Card */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-10">
        <h2 className="text-xl font-black text-gray-900">
          Profile Information
        </h2>

        {/* Profile Photo Section */}
        <div className="flex flex-col sm:flex-row items-center gap-8 pb-4">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2.5 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
              <Camera size={16} />
            </button>
          </div>
          <div className="space-y-4 text-center sm:text-left">
            <div>
              <h3 className="text-base font-black text-gray-900 mb-1">
                Profile Photo
              </h3>
              <p className="text-xs font-medium text-gray-400">
                JPG, GIF or PNG. Max size of 800K
              </p>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <button className="bg-slate-50 hover:bg-slate-100 text-gray-700 px-6 py-2.5 rounded-xl font-bold text-xs transition-colors border border-gray-100">
                Upload New
              </button>
              <button className="text-gray-400 hover:text-red-500 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Abebe Kebede"
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              ID Number
            </label>
            <input
              type="text"
              defaultValue="UG/2021/4582"
              disabled
              className="w-full bg-slate-50/50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-400 cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              University Email
            </label>
            <input
              type="email"
              defaultValue="abebe.kebede@astu.edu.et"
              disabled
              className="w-full bg-slate-50/50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-400 cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              Department
            </label>
            <select className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all appearance-none cursor-pointer">
              <option>Software Engineering</option>
              <option>Computer Science</option>
              <option>Electrical Engineering</option>
              <option>Mechanical Engineering</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              Bio (Optional)
            </label>
            <textarea
              rows={4}
              placeholder="A short description about yourself..."
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-10">
          <button className="text-gray-500 hover:text-gray-900 px-8 py-4 rounded-2xl font-black text-sm transition-colors border border-gray-100">
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all hover:translate-y-[-2px]">
            Save Changes
          </button>
        </div>
      </div>

      {/* Bottom Cards Info Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Account Status */}
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex items-start gap-5">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div className="space-y-3">
            <h4 className="text-base font-black text-gray-900">
              Account Status
            </h4>
            <p className="text-xs font-medium text-gray-400 leading-relaxed">
              Your account is currently active and verified as a student of
              ASTU.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-black uppercase tracking-wider">
                Verified Member
              </span>
            </div>
          </div>
        </div>

        {/* Need Help */}
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex items-start gap-5">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
            <HelpCircle size={24} />
          </div>
          <div className="space-y-3">
            <h4 className="text-base font-black text-gray-900">Need Help?</h4>
            <p className="text-xs font-medium text-gray-400 leading-relaxed">
              Contact the registrar office for data correction if your ID or
              department is incorrect.
            </p>
            <button className="text-blue-600 font-black text-xs flex items-center gap-1 hover:gap-2 transition-all">
              Contact Registrar Office <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
