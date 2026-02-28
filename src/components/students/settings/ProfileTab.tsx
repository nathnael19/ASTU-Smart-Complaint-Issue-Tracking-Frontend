import { useState, useRef } from "react";
import {
  Camera,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { updateUserProfile } from "../../../api/users";
import { supabase } from "../../../lib/supabase";

interface ProfileTabProps {
  profile: any;
  onUpdate: (updatedProfile: any) => void;
}

const ProfileTab = ({ profile, onUpdate }: ProfileTabProps) => {
  const [formData, setFormData] = useState({
    first_name: profile?.first_name || "",
    last_name: profile?.last_name || "",
    phone: profile?.phone || "",
    program: profile?.program || "",
    // bio is not in our schema but let's keep it for UI if we want to add later
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 800K as per UI text)
    if (file.size > 800 * 1024) {
      setError("File size exceeds 800KB limit.");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to supabase storage
      const { error: uploadError } = await supabase.storage
        .from("complaint-attachments")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("complaint-attachments").getPublicUrl(filePath);

      // Update user profile with new avatar_url
      const updated = await updateUserProfile(profile.id, {
        avatar_url: publicUrl,
      });

      onUpdate(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSaveSuccess(false);

      const updated = await updateUserProfile(profile.id, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        program: formData.program,
      });

      onUpdate(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Information Card */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-10">
        <h2 className="text-xl font-black text-gray-900">
          Profile Information
        </h2>

        {/* Profile Photo Section */}
        <div className="flex flex-col sm:flex-row items-center gap-8 pb-4">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner relative">
              {isUploading && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
                  <Loader2 className="text-white animate-spin" size={24} />
                </div>
              )}
              <img
                src={
                  profile?.avatar_url ||
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2.5 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform disabled:opacity-50"
            >
              <Camera size={16} />
            </button>
          </div>
          <div className="space-y-4 text-center sm:text-left">
            <div>
              <h3 className="text-base font-black text-gray-900 mb-1">
                Profile Photo
              </h3>
              <p className="text-xs font-medium text-gray-400">
                JPG, GIF or PNG. Max size of 800K
              </p>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="bg-slate-50 hover:bg-slate-100 text-gray-700 px-6 py-2.5 rounded-xl font-bold text-xs transition-colors border border-gray-100 disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Upload New"}
              </button>
              <button
                onClick={async () => {
                  try {
                    setError(null);
                    const updated = await updateUserProfile(profile.id, {
                      avatar_url: null,
                    });
                    // Update localStorage
                    const existingUser = JSON.parse(
                      localStorage.getItem("user") || "{}",
                    );
                    localStorage.setItem(
                      "user",
                      JSON.stringify({
                        ...existingUser,
                        avatar_url: null,
                      }),
                    );
                    window.dispatchEvent(new Event("user-profile-updated"));

                    onUpdate(updated);
                  } catch (err: any) {
                    setError(err.message || "Failed to remove photo.");
                  }
                }}
                className="text-gray-400 hover:text-red-500 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              First Name
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({ ...formData, first_name: e.target.value })
              }
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              Last Name
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({ ...formData, last_name: e.target.value })
              }
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              ID Number
            </label>
            <input
              type="text"
              defaultValue={profile?.student_id_number || "N/A"}
              disabled
              className="w-full bg-slate-50/50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-400 cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              University Email
            </label>
            <input
              type="email"
              defaultValue={profile?.email}
              disabled
              className="w-full bg-slate-50/50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-400 cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              Program / Major
            </label>
            <input
              type="text"
              value={formData.program}
              onChange={(e) =>
                setFormData({ ...formData, program: e.target.value })
              }
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              Bio (Optional)
            </label>
            <textarea
              rows={4}
              placeholder="A short description about yourself..."
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-10">
          {error && (
            <p className="text-red-500 text-xs font-bold mr-auto">{error}</p>
          )}
          {saveSuccess && (
            <div className="flex items-center gap-2 text-green-600 font-bold text-xs mr-auto animate-in fade-in zoom-in duration-300">
              <CheckCircle2 size={16} />
              Profile updated successfully!
            </div>
          )}
          <button
            disabled={isSaving}
            className="text-gray-500 hover:text-gray-900 px-8 py-4 rounded-2xl font-black text-sm transition-colors border border-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all hover:translate-y-[-2px] disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving && <Loader2 size={16} className="animate-spin" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Bottom Cards Info Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Account Status */}
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex items-start gap-5">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
            <ShieldCheck size={24} />
          </div>
          <div className="space-y-3">
            <h4 className="text-base font-black text-gray-900">
              Account Status
            </h4>
            <p className="text-xs font-medium text-gray-400 leading-relaxed">
              Your account is currently active and verified as a student of
              ASTU.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-black uppercase tracking-wider">
                Verified Member
              </span>
            </div>
          </div>
        </div>

        {/* Need Help */}
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex items-start gap-5">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
            <HelpCircle size={24} />
          </div>
          <div className="space-y-3">
            <h4 className="text-base font-black text-gray-900">Need Help?</h4>
            <p className="text-xs font-medium text-gray-400 leading-relaxed">
              Contact the registrar office for data correction if your ID or
              department is incorrect.
            </p>
            <button className="text-blue-600 font-black text-xs flex items-center gap-1 hover:gap-2 transition-all">
              Contact Registrar Office <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
