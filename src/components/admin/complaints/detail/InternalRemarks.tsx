import { MessageSquare } from "lucide-react";

interface Remark {
  id: string;
  authorName: string;
  role: string;
  time: string;
  content: string;
  avatarSeed: string;
}

const InternalRemarks = () => {
  const remarks: Remark[] = [
    {
      id: "1",
      authorName: "Sarah Miller (Support Staff)",
      role: "Support",
      time: "FEB 24, 11:30 AM",
      content:
        "Ticket acknowledged. Assigning to ICT Infrastructure team for on-site inspection.",
      avatarSeed: "sarah",
    },
    {
      id: "2",
      authorName: "Kevin Chen (ICT Engineer)",
      role: "Engineer",
      time: "FEB 25, 09:15 AM",
      content:
        "Initial inspection shows Access Point #AP-LIB-2B is intermittently losing power. Replacing PoE injector today.",
      avatarSeed: "kevin",
    },
  ];

  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <MessageSquare size={20} className="text-[#1e3a8a]" />
          <h3 className="text-xl font-black text-gray-900">Internal Remarks</h3>
        </div>
        <span className="text-xs font-bold text-gray-400">
          Chronological View
        </span>
      </div>

      <div className="space-y-6">
        {remarks.map((remark) => (
          <div key={remark.id} className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1 border border-gray-200">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${remark.avatarSeed}&backgroundColor=f1f5f9`}
                alt={remark.authorName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="bg-[#f8fafc] rounded-2xl rounded-tl-none p-5 border border-slate-100 flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-black text-[#1e3a8a]">
                  {remark.authorName}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  {remark.time}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600 leading-relaxed">
                {remark.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Remark Form */}
      <div className="mt-8 pt-8 border-t border-gray-100">
        <p className="text-xs font-black text-gray-500 uppercase mb-3 tracking-widest">
          Add New Remark
        </p>
        <textarea
          placeholder="Type internal update here..."
          className="w-full min-h-[120px] bg-white border border-gray-200 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none mb-4"
        />
        <div className="flex justify-end">
          <button className="bg-[#1e3a8a] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-950 transition-colors shadow-sm">
            Post Remark
          </button>
        </div>
      </div>
    </div>
  );
};

export default InternalRemarks;
