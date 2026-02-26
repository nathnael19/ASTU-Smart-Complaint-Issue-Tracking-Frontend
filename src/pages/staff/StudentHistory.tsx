import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  History,
  TicketIcon,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import StaffDashboardLayout from "../../components/staff/StaffDashboardLayout";

const StudentHistory = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  // Decode studentId if it was URL encoded
  const decodedId = studentId ? decodeURIComponent(studentId) : "Unknown ID";

  // Mock data for the student
  const student = {
    name: "Abebe Bikila",
    program: "BSc. Electrical Engineering, 3rd Year",
    id: decodedId,
    email: "abebe.b@astu.edu.et",
    phone: "+251 911 223 344",
    joinedDate: "Sept 2021",
    status: "Active",
  };

  // Mock data for history
  const history = [
    {
      id: "#TIC-8455",
      title: "Lab PC #14 Component Failure",
      date: "Oct 24, 2023",
      status: "In Progress",
      category: "Hardware",
    },
    {
      id: "#TIC-8120",
      title: "Network connectivity issue in Dorm Block 4",
      date: "Sep 12, 2023",
      status: "Resolved",
      category: "Network",
    },
    {
      id: "#TIC-7944",
      title: "Library portal access denied",
      date: "Aug 05, 2023",
      status: "Resolved",
      category: "Account Access",
    },
    {
      id: "#TIC-7501",
      title: "Class projector not turning on",
      date: "Jun 18, 2023",
      status: "Closed",
      category: "Hardware",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "In Progress":
        return <Clock className="w-5 h-5 text-amber-500" />;
      case "Closed":
        return <XCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-50 text-green-700 border-green-200";
      case "In Progress":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Closed":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <StaffDashboardLayout>
      <div className="p-8 max-w-[1200px] mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-gray-900 transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Student Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 text-center flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-md mb-4">
                <span className="text-blue-600 font-black text-3xl">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">
                {student.name}
              </h2>
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200 mb-4 inline-block">
                {student.status} Student
              </span>

              <div className="w-full pt-6 border-t border-gray-100 space-y-4 text-left">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                    ID Number
                  </label>
                  <p className="text-sm font-bold text-gray-900">
                    {student.id}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                    Program
                  </label>
                  <p className="text-sm font-bold text-gray-900">
                    {student.program}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                    Email
                  </label>
                  <p className="text-sm font-bold text-gray-900">
                    {student.email}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                    Phone
                  </label>
                  <p className="text-sm font-bold text-gray-900">
                    {student.phone}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                    Joined
                  </label>
                  <p className="text-sm font-bold text-gray-900">
                    {student.joinedDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] shadow-md p-8 text-white">
              <div className="flex items-center mb-4">
                <History className="w-8 h-8 text-blue-200 mr-4" />
                <div>
                  <h3 className="text-lg font-black">Total Tickets</h3>
                  <p className="text-3xl font-black">{history.length}</p>
                </div>
              </div>
              <p className="text-blue-100 text-sm font-medium">
                This student has submitted {history.length} tickets since
                joining.
              </p>
            </div>
          </div>

          {/* Right Column: Ticket History List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <div className="flex items-center">
                  <TicketIcon className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-black text-gray-900">
                    Complaint History
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {history.map((ticket, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      navigate(`/staff/tickets/${ticket.id.replace("#", "")}`)
                    }
                    className="p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer bg-gray-50 hover:bg-white group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          {getStatusIcon(ticket.status)}
                        </div>
                        <div>
                          <p className="text-sm font-black text-gray-500 mb-1">
                            {ticket.id}
                          </p>
                          <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {ticket.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-2 text-sm font-medium text-gray-500">
                            <span>{ticket.date}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>{ticket.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="self-start sm:self-center shrink-0">
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusBadge(ticket.status)}`}
                        >
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StaffDashboardLayout>
  );
};

export default StudentHistory;
