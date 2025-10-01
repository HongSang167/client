import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function AuthSidebar({ onClose }) {
  // state quản lý popup Login và Signup
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  // Hàm chuyển từ Login -> Signup
  const goToSignup = () => {
    setOpenLogin(false);
    setOpenSignup(true);
  };

  // Hàm chuyển từ Signup -> Login
  const goToLogin = () => {
    setOpenSignup(false);
    setOpenLogin(true);
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Overlay đen mờ */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="relative w-96 bg-white h-full shadow-lg p-6 animate-slideIn">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          ✕
        </button>

        {/* Nội dung */}
        <h2 className="text-xl font-bold mb-6">Welcome</h2>
        <p className="font-semibold mb-4">
          Track orders, your shopping history & more!
        </p>

        {/* Nút Sign In */}
        <div>
          <button
            onClick={() => setOpenLogin(true)}
            className="w-full bg-black text-white py-3 rounded-md font-medium mb-6 hover:bg-gray-800"
          >
            Go to Sign In
          </button>

          {/* Dialog Login */}
          <Dialog open={openLogin} onOpenChange={setOpenLogin}>
            <DialogContent className="p-6 rounded-2xl max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">
                  Login
                </DialogTitle>
              </DialogHeader>

              <form className="space-y-4">
                <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
                <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
                <Button className="w-full">Sign in</Button>
              </form>

              <p className="text-sm text-center mt-2 cursor-pointer underline">
                Forgot your password?
              </p>
              <p
                onClick={goToSignup}
                className="text-sm text-center mt-2 cursor-pointer underline text-blue-600"
              >
                Create account
              </p>
            </DialogContent>
          </Dialog>
        </div>

        {/* Nút Sign Up */}
        <button
          onClick={() => setOpenSignup(true)}
          className="w-full border border-gray-400 py-3 rounded-md font-medium hover:bg-gray-100"
        >
          New Customer? Sign Up here
        </button>

        {/* Dialog Sign Up */}
        <Dialog open={openSignup} onOpenChange={setOpenSignup}>
          <DialogContent className="p-6 rounded-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">
                Sign Up
              </DialogTitle>
            </DialogHeader>

            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
              <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
              <input type="password" placeholder="Password" className="w-full border p-2 rounded" />
              <input type="password" placeholder="Confirm Password" className="w-full border p-2 rounded" />
              <Button className="w-full">Create Account</Button>
            </form>

            <p
              onClick={goToLogin}
              className="text-sm text-center mt-2 cursor-pointer underline text-blue-600"
            >
              Already have an account? Sign In
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default AuthSidebar;
