import { FileText, Image as ImageIcon } from "lucide-react";

interface Attachment {
  id: string;
  file_name: string;
  storage_path: string;
  mime_type: string;
}

interface ComplaintDescriptionProps {
  description: string;
  attachments?: Attachment[];
}

const ComplaintDescription = ({
  description,
  attachments = [],
}: ComplaintDescriptionProps) => {
  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText size={20} className="text-[#1e3a8a]" />
        <h3 className="text-xl font-black text-gray-900">
          Complaint Description
        </h3>
      </div>

      <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
        <p>{description}</p>
      </div>

      {attachments.length > 0 && (
        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
            Attachments
          </p>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {attachments.map((file) => (
              <div
                key={file.id}
                className="w-48 h-32 rounded-xl bg-slate-50 border border-gray-200 flex flex-col items-center justify-center shrink-0 group hover:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => {
                  // In a real app, this would trigger a download or open a preview
                  window.open(
                    `http://localhost:8000/api/v1/storage/view/${file.storage_path}`,
                    "_blank",
                  );
                }}
              >
                {file.mime_type.startsWith("image/") ? (
                  <img
                    src={`http://localhost:8000/api/v1/storage/view/${file.storage_path}`}
                    alt={file.file_name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <>
                    <ImageIcon
                      size={24}
                      className="text-gray-400 mb-2 group-hover:text-blue-500 transition-colors"
                    />
                    <span className="text-xs font-bold text-gray-500 truncate w-full px-4 text-center">
                      {file.file_name}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintDescription;
