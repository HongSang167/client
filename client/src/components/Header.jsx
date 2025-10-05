import React, { useState, useEffect } from "react";
import { Search, User, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthSidebar from "./AuthSidebar";
import { useAuth } from "@/context/AuthContext";
import UserMenuModal from "./admin/UserMenuModal";

function Header() {
  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("customer");
  const navigate = useNavigate();

  // 🧭 Khi admin login → tự động điều hướng sang trang admin
  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <>
      <header className="text-black p-4 shadow-md bg-white">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src="/pawpulse.jpg" alt="PAWPULSE Logo" className="w-40 h-25" />
          </div>

          {/* Navigation */}
          <nav className="container mx-auto flex justify-center p-4">
            <div className="space-x-6">
              <Link to="/" className="hover:text-gray-700">Home</Link>
              <Link to="/products" className="hover:text-gray-700">Products</Link>
              <Link to="/appointments" className="hover:text-gray-700">Appointments</Link>
              <Link to="/records" className="hover:text-gray-700">Pet Records</Link>
              <Link to="/contact" className="hover:text-gray-700">Contact</Link>
            </div>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 relative">
            {/* Search */}
            <button className="hover:text-gray-700">
              <Search className="w-7 h-7" />
            </button>

            {/* User */}
            <div className="relative">
              <button
                onClick={() => {
                  if (user) setShowUserMenu(!showUserMenu);
                  else setShowAuth(true);
                }}
                className="hover:text-gray-700"
              >
                <User className="w-7 h-7" />
              </button>

              {/* Menu người dùng */}
              <UserMenuModal
                user={user}
                showUserMenu={showUserMenu}
                setShowUserMenu={setShowUserMenu}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                logout={logout}
              />
            </div>

            {/* Cart */}
            <button className="hover:text-gray-700">
              <ShoppingCart className="w-7 h-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar đăng nhập */}
      {showAuth && <AuthSidebar onClose={() => setShowAuth(false)} />}
    </>
  );
}

export default Header;
