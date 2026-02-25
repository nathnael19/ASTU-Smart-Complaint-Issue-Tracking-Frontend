import { useState } from "react";
import {
  ChevronRight,
  Upload,
  Info,
  HelpCircle,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";
import DashboardLayout from "../../components/students/DashboardLayout";
import { cn } from "../../lib/utils";

const SubmitComplaint = () => {
  const [urgency, setUrgency] = useState("MEDIUM");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-full bg-[#fcfdfe]">
        <div className="p-4 sm:p-8 lg:p-10 max-w-[1400px] mx-auto w-full space-y-6 sm:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Page Title & Intro */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Submit New Complaint
            </h1>
            <p className="text-sm sm:text-base font-medium text-gray-400 max-w-2xl leading-relaxed">
              Please provide comprehensive details about the issue. Accurate
              information helps our staff resolve your concern more efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
            {/* Left Column: Form */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-100 shadow-sm p-6 sm:p-8 lg:p-12 space-y-8 sm:space-y-10">
                {/* Complaint Title */}
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">
                    Complaint Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Wi-Fi connection issue in Block 4"
                    className="w-full bg-slate-50 border-none rounded-[1.25rem] py-5 px-7 text-sm font-bold text-gray-950 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all"
                  />
                </div>

                {/* Category & Urgency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">
                      Issue Category
                    </label>
                    <div className="relative group">
                      <select className="w-full bg-slate-50 border-none rounded-[1.25rem] py-4 sm:py-5 px-6 sm:px-7 text-sm font-bold text-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all appearance-none cursor-pointer">
                        <option>Select a category</option>
                        <option>IT & Network</option>
                        <option>Facility & Maintenance</option>
                        <option>Academic Affairs</option>
                        <option>Student Services</option>
                      </select>
                      <ChevronRight
                        size={18}
                        className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">
                      Urgency Level
                    </label>
                    <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3">
                      {["LOW", "MEDIUM", "HIGH"].map((level) => (
                        <button
                          key={level}
                          onClick={() => setUrgency(level)}
                          className={cn(
                            "flex-1 min-w-[80px] py-3 sm:py-4 rounded-[1rem] sm:rounded-[1.25rem] font-black text-[10px] tracking-widest border-2 transition-all",
                            urgency === level
                              ? "border-blue-900 bg-white text-blue-900 shadow-sm"
                              : "border-gray-100 bg-white text-gray-900 hover:border-gray-200",
                          )}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detailed Description */}
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">
                    Detailed Description
                  </label>
                  <textarea
                    rows={8}
                    placeholder="Provide as much detail as possible, including dates, locations, and any specific identifiers..."
                    className="w-full bg-slate-50 border-none rounded-[1.25rem] py-5 sm:py-6 px-6 sm:px-7 text-sm font-bold text-gray-950 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Supporting Documents */}
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">
                    Supporting Documents (Optional)
                  </label>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    className={cn(
                      "relative border-2 border-dashed rounded-[1.5rem] sm:rounded-[2rem] p-8 sm:p-16 transition-all group flex flex-col items-center justify-center gap-4 sm:gap-5 text-center",
                      dragActive
                        ? "border-blue-600 bg-blue-50/30"
                        : "border-blue-100 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-200",
                    )}
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-50/80 rounded-[1rem] sm:rounded-[1.25rem] flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-inner">
                      <Upload size={24} className="sm:hidden" />
                      <Upload size={28} className="hidden sm:block" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs sm:text-sm font-black text-gray-900">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 pt-6 sm:pt-10 mt-6 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Info size={16} className="sm:size-18" />
                    <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                      Submissions are reviewed within 24-48 hours.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none text-xs sm:text-sm font-black text-gray-950 hover:text-blue-600 px-4 sm:px-6 transition-colors">
                      Cancel
                    </button>
                    <button className="flex-1 sm:flex-none bg-[#1e3a8a] text-white px-8 sm:px-14 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all hover:translate-y-[-2px] tracking-tight">
                      Submit Complaint
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Information & Sidebars */}
            <div className="space-y-6 sm:space-y-10">
              {/* Submission Guide Card */}
              <div className="bg-[#1e3a8a] rounded-[1.5rem] sm:rounded-[2.5rem] p-8 sm:p-12 text-white space-y-6 sm:space-y-10 shadow-2xl shadow-blue-900/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                  Submission Guide
                </h3>
                <div className="space-y-8">
                  {[
                    "Be as specific as possible about the location of the issue.",
                    "Attach photos if the issue is a physical maintenance problem.",
                    "Check if a similar issue has already been reported in the Dashboard.",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="shrink-0 mt-0.5">
                        <CheckCircle2 size={20} className="text-blue-300" />
                      </div>
                      <p className="text-[13px] font-medium leading-relaxed text-blue-50/90">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Help Card */}
              <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-8 sm:p-12 border border-gray-100 shadow-sm space-y-8 sm:space-y-10">
                <div className="flex items-center gap-4 text-blue-900">
                  <HelpCircle size={24} />
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-950">
                    Need Help?
                  </h3>
                </div>
                <p className="text-[13px] font-medium text-gray-500 leading-relaxed">
                  If you are unsure which category to choose, contact our
                  helpdesk for guidance.
                </p>
                <div className="space-y-5">
                  <div className="p-6 bg-slate-50/50 rounded-[1.5rem] flex items-center gap-5 group hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-gray-100">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-0.5">
                        Call Extension
                      </p>
                      <p className="text-sm font-black text-gray-950 group-hover:text-blue-900 transition-colors">
                        800-ASTU-HELP
                      </p>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50/50 rounded-[1.5rem] flex items-center gap-5 group hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-gray-100">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-0.5">
                        Email Support
                      </p>
                      <p className="text-sm font-black text-gray-950 group-hover:text-blue-900 transition-colors">
                        support@astu.edu.et
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Location (Map) */}
              <div className="relative rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden group shadow-xl border border-gray-100 aspect-[4/3] lg:aspect-auto h-56 sm:h-72">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                  alt="Location Map"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />
                <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 space-y-2">
                  <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                    Current Location
                  </h4>
                  <p className="text-sm sm:text-base font-black text-white leading-tight">
                    Adama Science and Technology University Main Campus
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubmitComplaint;
