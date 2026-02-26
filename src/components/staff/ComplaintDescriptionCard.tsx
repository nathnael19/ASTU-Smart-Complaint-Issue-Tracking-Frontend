import { FileText, MapPin, Smartphone } from "lucide-react";

interface ComplaintDescriptionCardProps {
  description: string;
  location: string;
  reportedVia: string;
}

const ComplaintDescriptionCard = ({
  description,
  location,
  reportedVia,
}: ComplaintDescriptionCardProps) => {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
          <FileText size={20} />
        </div>
        <h3 className="text-xl font-black text-gray-900">Complaint Description</h3>
      </div>

      <p className="text-sm font-medium text-gray-700 leading-relaxed mb-6">
        {description}
      </p>

      <div className="space-y-3 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-gray-400 shrink-0" />
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Location
            </span>
            <p className="text-sm font-bold text-gray-900">{location}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Smartphone size={16} className="text-gray-400 shrink-0" />
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Reported Via
            </span>
            <p className="text-sm font-bold text-gray-900">{reportedVia}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDescriptionCard;
