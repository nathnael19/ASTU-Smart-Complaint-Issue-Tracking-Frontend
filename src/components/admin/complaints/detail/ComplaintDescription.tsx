import { FileText, Image as ImageIcon } from "lucide-react";

const ComplaintDescription = () => {
  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText size={20} className="text-[#1e3a8a]" />
        <h3 className="text-xl font-black text-gray-900">
          Complaint Description
        </h3>
      </div>

      <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
        <p>
          The main library's second-floor study area (Section B) has been
          experiencing significant Wi-Fi connectivity issues since Monday
          morning. The signal keeps dropping every 10-15 minutes, making it
          impossible to access online research journals or the university
          portal.
        </p>
        <p className="font-bold underline underline-offset-4 decoration-gray-300">
          Specific Location: Table 42 through 58, Block 2.
        </p>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-100">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
          Attachments
        </p>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {/* Mock Image 1 */}
          <div className="w-48 h-32 rounded-xl bg-slate-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0 group relative cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=400&auto=format&fit=crop"
              alt="Router"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Mock Image 2 */}
          <div className="w-48 h-32 rounded-xl bg-slate-50 border border-gray-200 flex flex-col items-center justify-center shrink-0 group hover:bg-slate-100 transition-colors cursor-pointer">
            <ImageIcon
              size={24}
              className="text-gray-400 mb-2 group-hover:text-blue-500 transition-colors"
            />
            <span className="text-xs font-bold text-gray-500">
              speedtest_result.png
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDescription;
