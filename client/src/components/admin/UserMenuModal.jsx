import React from "react";
import { useNavigate } from "react-router-dom";

function UserMenuModal({
  user,
  showUserMenu,
  setShowUserMenu,
  logout,
}) {
  const navigate = useNavigate();

  if (!showUserMenu) return null;

  // ✅ Nếu chưa đăng nhập
  if (!user) {
    return (
      <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-50">
        <p className="text-sm text-gray-600 mb-3">Welcome!</p>
        <button
          onClick={() => {
            setShowUserMenu(false);
            navigate("/signin");
          }}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Go to Sign In
        </button>

        <button
          onClick={() => {
            setShowUserMenu(false);
            navigate("/signup");
          }}
          className="w-full mt-3 border border-gray-400 text-black py-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          New Customer? Sign Up here
        </button>
      </div>
    );
  }

  // ✅ Nếu đã đăng nhập
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 z-50">
      <div className="mb-3">
        <p className="font-semibold text-gray-900">{user.fullName}</p>
        <p className="text-sm text-gray-600">{user.gmail}</p>
        <p className="text-xs text-gray-500 mt-1">
          Role: <span className="font-medium">{user.role}</span>
        </p>
      </div>

      <div className="border-t border-gray-200 my-3"></div>

      {/* Nếu customer hoặc employee thì thêm các lựa chọn */}
      {user.role === "customer" && (
        <div className="space-y-2">
          <button
            onClick={() => {
              setShowUserMenu(false);
              navigate("/profile");
            }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            View Profile
          </button>
          <button
            onClick={() => {
              setShowUserMenu(false);
              navigate("/orders");
            }}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            My Orders
          </button>
        </div>
      )}

      {/* Nút Logout */}
      <button
        onClick={() => {
          logout();
          setShowUserMenu(false);
          navigate("/");
        }}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors mt-3"
      >
        Logout
      </button>
    </div>
  );
}

export default UserMenuModal;
