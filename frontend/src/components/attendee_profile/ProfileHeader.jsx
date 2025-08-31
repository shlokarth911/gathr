import { ArrowLeft, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({ onEdit }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3">
      <button
        aria-label="Back"
        onClick={() => navigate(-1)}
        className="p-2 rounded-lg bg-white/4"
        style={{ backdropFilter: "blur(6px)" }}
      >
        <ArrowLeft size={18} />
      </button>

      <div className="flex-1">
        <h1 className="text-lg font-semibold">Profile</h1>
        <p className="text-xs text-neutral-400">
          Manage your account & settings
        </p>
      </div>

      <button
        aria-label="Edit profile"
        onClick={onEdit}
        className="p-2 rounded-lg bg-white/4"
        title="Edit"
      >
        <Edit3 size={16} />
      </button>
    </div>
  );
};

export default ProfileHeader;
