import { RefreshCw } from "lucide-react";

interface LogEntry {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

interface CommunicationLogCardProps {
  entries: LogEntry[];
}

const CommunicationLogCard = ({ entries }: CommunicationLogCardProps) => {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
          <RefreshCw size={20} />
        </div>
        <h3 className="text-xl font-black text-gray-900">Communication Log</h3>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-gray-900 uppercase">
                  {entry.type}
                </span>
                <span className="text-xs font-bold text-gray-400">{entry.timestamp}</span>
              </div>
              <p className="text-sm font-medium text-gray-600">{entry.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationLogCard;
