import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

function AuthSidebar({ onClose }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Lớp mờ nền */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="relative w-80 bg-white h-full shadow-xl border-l border-gray-100 p-8 animate-slideIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex flex-col h-full pt-12">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
            <p className="text-gray-500 text-sm">
              Sign in to your account or create a new one
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => {
                onClose();
                navigate("/signin");
              }}
              className="w-full bg-gray-900 text-white py-3.5 rounded-lg font-medium hover:bg-gray-800 active:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Go to Sign In
            </button>

            <button
              onClick={() => {
                onClose();
                navigate("/signup");
              }}
              className="w-full border-2 border-gray-300 text-gray-900 py-3.5 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              New Customer? Sign Up here
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Additional Info */}
          <div className="mt-auto pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">
              By continuing, you agree to our{" "}
              <a href="#" className="text-gray-600 hover:text-gray-800 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-gray-600 hover:text-gray-800 underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default AuthSidebar;