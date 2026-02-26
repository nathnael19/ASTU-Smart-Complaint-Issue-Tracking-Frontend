import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  UploadCloud,
  Eye,
  UserPlus,
} from "lucide-react";
import StaffDashboardLayout from "../../components/staff/StaffDashboardLayout";

const CreateTicket = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Normal - Default");
  const [assignee, setAssignee] = useState("Keep Unassigned");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate ticket creation and redirect
    setTimeout(() => {
      navigate("/staff/tasks");
    }, 500);
  };

  return (
    <StaffDashboardLayout>
      <div className="min-h-screen bg-slate-50/50 pb-20">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100 px-6 sm:px-10 py-6 sticky top-0 z-10">
          <div className="max-w-[1000px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/staff/tasks"
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                  Create New Ticket
                </h1>
                <p className="text-sm font-medium text-gray-500 mt-0.5">
                  Submit a new official request or report a department-level
                  issue.
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center">
              <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-bold rounded-full uppercase tracking-wider">
                Draft Saved 12:45 PM
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1000px] mx-auto px-6 sm:px-10 mt-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-gray-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-8 sm:p-10 space-y-8"
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Ticket Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief summary of the issue..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-slate-50/50 text-gray-900 text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                required
              />
            </div>

            {/* Category & Priority Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-slate-50/50 text-gray-900 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                    required
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="hardware">Hardware Repair</option>
                    <option value="software">Software Installation</option>
                    <option value="network">Network & Connectivity</option>
                    <option value="access">Account & Portal Access</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Priority Level
                </label>
                <div className="relative">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-slate-50/50 text-gray-900 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                  >
                    <option value="Low">Low - Informational</option>
                    <option value="Normal - Default">Normal - Default</option>
                    <option value="High">High - Urgent Issue</option>
                    <option value="Critical">Critical - System Down</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={16}
                  />
                </div>
              </div>
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Assign to Staff Member
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <UserPlus size={18} />
                </div>
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 bg-slate-50/50 text-gray-900 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                >
                  <option value="Keep Unassigned">Keep Unassigned</option>
                  <option value="John Doe">John Doe (Network Admin)</option>
                  <option value="Sara Tesfaye">
                    Sara Tesfaye (Hardware Tech)
                  </option>
                  <option value="Biniyam Lulseged">
                    Biniyam Lulseged (Software Dev)
                  </option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* Description Editor */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Detailed Description
              </label>
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                {/* Editor Toolbar */}
                <div className="flex items-center gap-1.5 p-2 border-b border-gray-100 bg-slate-50/50">
                  <button
                    type="button"
                    className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <Bold size={16} />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <Italic size={16} />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <Underline size={16} />
                  </button>
                  <div className="w-px h-5 bg-gray-300 mx-1"></div>
                  <button
                    type="button"
                    className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <List size={16} />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <ListOrdered size={16} />
                  </button>
                  <div className="w-px h-5 bg-gray-300 mx-1"></div>
                  <button
                    type="button"
                    className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <LinkIcon size={16} />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <ImageIcon size={16} />
                  </button>
                </div>
                {/* Editor Area */}
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the problem in detail. Include steps to reproduce if applicable..."
                  className="w-full p-4 min-h-[160px] resize-y text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
                  required
                ></textarea>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Attachments
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl bg-slate-50/50 p-8 text-center hover:bg-slate-50 hover:border-blue-300 transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#1e3a8a] mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud size={24} />
                </div>
                <p className="text-sm font-bold text-gray-900 mb-1">
                  <span className="text-[#1e3a8a] hover:underline">
                    Click to upload
                  </span>{" "}
                  or drag and drop files
                </p>
                <p className="text-xs font-semibold text-gray-400">
                  PDF, JPG, PNG or DOCX (Max 10MB)
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-gray-500 text-xs font-semibold">
                <Eye size={14} className="mr-2" />
                Visible to department members and administrators
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/staff/tasks")}
                  className="px-6 py-3 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#1e3a8a] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-900 hover:shadow-md transition-all flex items-center gap-2 transform active:scale-95"
                >
                  Create Ticket
                  <span className="opacity-70 ml-1">▶</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </StaffDashboardLayout>
  );
};

export default CreateTicket;
