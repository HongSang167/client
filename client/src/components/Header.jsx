import React, { useState } from "react";
import { Search, User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import AuthSidebar from "./AuthSidebar";
import { useAuth } from "@/context/AuthContext";
import UserMenuModal from "./admin/UserMenuModal";

function Header() {
  const { user, logout, users, promoteUser } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("customer");
  const [confirmUser, setConfirmUser] = useState(null); // user để confirm promote

  const handlePromoteConfirm = (email) => {
    promoteUser(email);
    setConfirmUser(null);
  };

  return (
    <>
      <header className="text-black p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/pawpulse.jpg" alt="PAWPULSE Logo" className="w-40 h-25" />
          </div>

          <nav className="container mx-auto flex justify-center p-4">
            <div className="space-x-6">
              <Link to="/" className="hover:text-gray-700">Home</Link>
              <Link to="/products" className="hover:text-gray-700">Products</Link>
              <Link to="/appointments" className="hover:text-gray-700">Appointments</Link>
              <Link to="/records" className="hover:text-gray-700">Pet Records</Link>
              <Link to="/contact" className="hover:text-gray-700">Contact</Link>
            </div>
          </nav>

          <div className="flex items-center space-x-4 relative">
            <a href="#" className="hover:text-gray-700"><Search className="w-7 h-7" /></a>

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

              <UserMenuModal
                user={user}
                users={users}
                showUserMenu={showUserMenu}
                setShowUserMenu={setShowUserMenu}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setConfirmUser={setConfirmUser}
                logout={logout}
              />
            </div>

            <a href="#" className="hover:text-gray-700"><ShoppingCart className="w-7 h-7" /></a>
          </div>
        </div>
      </header>

      {showAuth && <AuthSidebar onClose={() => setShowAuth(false)} />}

      {/* Confirm Promote */}
      {confirmUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <p className="mb-4">Are you sure you want to promote <strong>{confirmUser.name}</strong> to Employee?</p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setConfirmUser(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handlePromoteConfirm(confirmUser.email)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
