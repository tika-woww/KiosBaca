import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CardContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false); // State untuk mengontrol toggle menu mobile

  return (
    <div className="bg-[#F7F1E3] dark:bg-slate-900 text-[#3B2A0C] dark:text-slate-100">
      <nav className="px-6 md:px-12 py-4 flex justify-between items-center mx-auto max-w-[1120px] relative">
        <Link to="/" className="font-bold text-2xl font-bricolage">
          KiosBaca
        </Link>

        {/* // hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none p-1"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            {isOpen ? (
              // Icon Close
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              />
            ) : (
              // Icon Hamburger Bar
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            )}
          </svg>
        </button>
        <div
          className={`
            font-poppins text-sm
            absolute md:static top-full left-0 w-full md:w-auto
            bg-[#F7F1E3] dark:bg-slate-900 md:bg-transparent
            flex-col md:flex-row flex gap-4 md:gap-6 items-start md:items-center
            p-6 md:p-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out
            z-50
            /* Menyembunyikan/menampilkan di mobile berdasarkan state */
            ${isOpen ? "flex" : "hidden md:flex"}
          `}
        >
          <Link
            to="/"
            className="hover:opacity-75 w-full md:w-auto py-1"
          >
            Dashboard
          </Link>

          <Link
            to="/katalog"
            className="hover:opacity-75 w-full md:w-auto py-1"
          >
            Katalog
          </Link>

          <Link
            to="/cart"
            className="hover:opacity-75 w-full md:w-auto py-1 flex items-center justify-between md:justify-start"
          >
            <span>Keranjang</span>
            {totalItems > 0 && (
              <span className="ml-2 rounded-full bg-yellow-600 px-2 py-0.5 text-xs font-bold text-[#2a2000]">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
}
