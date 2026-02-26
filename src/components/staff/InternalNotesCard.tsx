import { Lock, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

interface Note {
  id: string;
  author: string;
  role: string;
  timestamp: string;
  content: string;
  isHighlighted?: boolean;
}

interface InternalNotesCardProps {
  notes: Note[];
}

const InternalNotesCard = ({ notes }: InternalNotesCardProps) => {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <Lock size={20} />
          </div>
          <h3 className="text-xl font-black text-gray-900">Internal Notes</h3>
        </div>
        <button className="inline-flex items-center gap-2 text-sm font-bold text-[#1e3a8a] hover:underline underline-offset-4">
          <Plus size={16} />
          Add Note
        </button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={cn(
              "p-4 rounded-xl border",
              note.isHighlighted
                ? "bg-yellow-50 border-yellow-200"
                : "bg-gray-50 border-gray-200",
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-black text-gray-900">{note.author}</p>
                <p className="text-xs font-bold text-gray-400">{note.role}</p>
              </div>
              <span className="text-xs font-bold text-gray-400">{note.timestamp}</span>
            </div>
            <p className="text-sm font-medium text-gray-700 leading-relaxed">
              {note.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternalNotesCard;
