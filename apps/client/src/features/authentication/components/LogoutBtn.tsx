import { useAuth } from "../../../hooks";

export const LogoutBtn = () => {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="px-10 py-3 text-lg rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
