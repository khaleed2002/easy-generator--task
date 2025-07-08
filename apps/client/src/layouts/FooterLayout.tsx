import { Outlet } from "react-router-dom";

export const FooterLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-indigo-100">
      <main className="flex-1 flex flex-col justify-center items-center">
        <Outlet />
      </main>
      <footer className="w-full py-4 text-center text-gray-500 text-sm border-t bg-white/80">
        <span className="p-1 mr-1 bg-green-500 text-white rounded-md">
          Easy Generator task
        </span>
        created by Khaled Abdelrahman
      </footer>
    </div>
  );
};
