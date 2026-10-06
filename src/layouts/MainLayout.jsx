import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 border-b border-line">
        <Navbar />
      </header>

      <main className="md:mx-20 max-w-[1120px] px-5 pb-16 pt-9">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>2026 KiosBaca | Ni Putu Swastika Dewi Suryani | Version 1.0</p>
      </footer>
    </div>
  );
}
