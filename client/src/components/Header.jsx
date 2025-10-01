import React, { useState } from "react";
import { Search, User, ShoppingCart } from "lucide-react";
import AuthSidebar from "./AuthSidebar";


function Header() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <header className="text-black p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/pawpulse.jpg" alt="PAWPULSE Logo" className="w-24 h-24" />
          </div>

          {/* Menu */}
          <nav className="flex space-x-8">
            <a href="#" className="hover:text-gray-700">Home</a>
            <a href="#" className="hover:text-gray-700">Products</a>
            <a href="#" className="hover:text-gray-700">Appointments</a>
            <a href="#" className="hover:text-gray-700">Pet Records</a>
            <a href="#" className="hover:text-gray-700">Contact</a>
          </nav>

          {/* Icons */}
          <div className="flex space-x-8">
            <a href="#" className="hover:text-gray-700"><Search className="w-7 h-7" /></a>
            <button onClick={() => setShowAuth(true)} className="hover:text-gray-700">
              <User className="w-7 h-7" />
            </button>
            <a href="#" className="hover:text-gray-700"><ShoppingCart className="w-7 h-7" /></a>
          </div>
        </div>
      </header>

      {/* Sidebar hiển thị khi bấm User */}
      {showAuth && <AuthSidebar onClose={() => setShowAuth(false)} />}
    </>
  );
}

export default Header;
