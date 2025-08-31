import { Camera, UserCheck } from "lucide-react";

const AvatarSection = ({ user, avatarRef, uploadAvatar }) => {
  return (
    <section className="mt-6 flex items-center gap-4">
      <div className="relative">
        <div
          ref={avatarRef}
          className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center overflow-hidden"
          style={{
            boxShadow: "0 8px 20px rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
          }}
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-2xl font-semibold text-neutral-50">
              {user.name?.[0] ?? "U"}
            </div>
          )}
        </div>

        {/* camera overlay */}
        <label
          htmlFor="avatar-upload"
          className="absolute -bottom-1 -right-1 bg-[#43ff1d] p-2 rounded-full border border-white/10 shadow-sm"
          title="Upload avatar"
        >
          <Camera size={14} color="#05120a" />
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadAvatar(f);
            }}
          />
        </label>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">{user.name}</h2>
          {user.verified && (
            <span className="flex items-center gap-1 text-xs text-[#43ff1d]">
              <UserCheck size={14} /> Verified
            </span>
          )}
        </div>
        <p className="text-sm text-neutral-300 mt-1">{user.email}</p>
        <p className="text-sm text-neutral-300 mt-0.5">
          {user.phone ?? "XXX-XXX-XXXX"}
        </p>
      </div>
    </section>
  );
};

export default AvatarSection;
