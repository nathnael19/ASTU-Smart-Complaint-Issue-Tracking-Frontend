import { IdCard, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RequesterInfoCardProps {
  name: string;
  program?: string | null;
  id: string;
  email: string;
  phone?: string | null;
  avatar?: string;
}

const RequesterInfoCard = ({
  name,
  program,
  id,
  email,
  phone,
  avatar,
}: RequesterInfoCardProps) => {
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
      <h3 className="text-xl font-black text-gray-900 mb-6">
        Requester Information
      </h3>

      <div className="flex flex-col items-center mb-6">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-md">
            <span className="text-blue-600 font-black text-2xl">
              {getInitials(name)}
            </span>
          </div>
        )}
        <h4 className="text-lg font-black text-gray-900 mt-4">{name}</h4>
        <p className="text-sm font-bold text-gray-500">{program || "—"}</p>
      </div>

      <div className="space-y-3 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
            <IdCard size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
              ID
            </span>
            <p className="text-sm font-bold text-gray-900 truncate">{id}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
            <Mail size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
              Email
            </span>
            <p className="text-sm font-bold text-gray-900 truncate">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
            <Phone size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
              Phone
            </span>
            <p className="text-sm font-bold text-gray-900 truncate">{phone || "—"}</p>
          </div>
        </div>
      </div>

      <button
        onClick={() =>
          navigate(`/staff/students/${encodeURIComponent(id)}/history`)
        }
        className="w-full mt-6 py-3 px-4 rounded-xl text-sm font-bold text-[#1e3a8a] bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200"
      >
        View Student History
      </button>
    </div>
  );
};

export default RequesterInfoCard;
