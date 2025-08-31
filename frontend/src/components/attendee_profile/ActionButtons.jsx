const ActionButtons = ({
  editing,
  saveProfile,
  saving,
  setEditing,
  setForm,
  user,
  navigate,
}) => {
  return (
    <div className="mt-4 flex items-center gap-3">
      {editing ? (
        <>
          <button
            onClick={saveProfile}
            disabled={saving}
            className="flex-1 py-3 rounded-full font-semibold"
            style={{
              background: "linear-gradient(90deg,#43ff1d 0%,#36d115 100%)",
              color: "#05120a",
            }}
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setForm({
                name: user.name,
                email: user.email,
                phone: user.phone,
                city: user.city,
              });
            }}
            className="py-3 px-4 rounded-full bg-white/4"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setEditing(true)}
            className="flex-1 py-3 rounded-full font-semibold bg-white/5"
          >
            Edit profile
          </button>
          <button
            onClick={() => navigate("/attendee/bookings")}
            className="py-3 px-4 rounded-full bg-white/4"
          >
            My bookings
          </button>
        </>
      )}
    </div>
  );
};

export default ActionButtons;
