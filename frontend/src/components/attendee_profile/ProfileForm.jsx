const ProfileForm = ({ form, onChangeField, editing }) => {
  return (
    <section className="mt-6">
      <div className="rounded-2xl bg-neutral-800/40 p-4">
        <label className="text-xs text-neutral-300">Full name</label>
        <input
          value={form.name}
          onChange={(e) => onChangeField("name", e.target.value)}
          disabled={!editing}
          className={`w-full mt-2 p-3 rounded-lg bg-transparent text-white placeholder:text-neutral-400 outline-none border ${
            editing ? "border-white/10" : "border-transparent"
          }`}
        />

        <label className="text-xs text-neutral-300 mt-3 block">Email</label>
        <input
          value={form.email}
          onChange={(e) => onChangeField("email", e.target.value)}
          disabled={!editing}
          className={`w-full mt-2 p-3 rounded-lg bg-transparent text-white placeholder:text-neutral-400 outline-none border ${
            editing ? "border-white/10" : "border-transparent"
          }`}
        />

        <div className="flex gap-3 mt-3">
          <div className="flex-1">
            <label className="text-xs text-neutral-300">Phone</label>
            <input
              value={form.phone ?? "XXX-XXX-XXXX"}
              onChange={(e) => onChangeField("phone", e.target.value)}
              disabled={!editing}
              className={`w-full mt-2 p-3 rounded-lg bg-transparent text-white placeholder:text-neutral-400 outline-none border ${
                editing ? "border-white/10" : "border-transparent"
              }`}
            />
          </div>
          <div className="w-28">
            <label className="text-xs text-neutral-300">City</label>
            <input
              value={form.city ?? "Anywhere"}
              onChange={(e) => onChangeField("city", e.target.value)}
              disabled={!editing}
              className={`w-full mt-2 p-3 rounded-lg bg-transparent text-white placeholder:text-neutral-400 outline-none border ${
                editing ? "border-white/10" : "border-transparent"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileForm;
