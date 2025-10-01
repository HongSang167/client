import React, { useState } from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function AuthSidebar({ onClose }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [loginStep, setLoginStep] = useState("login"); 

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Overlay */}
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

        <h2 className="text-xl font-bold mb-6">Welcome</h2>
        <p className="font-semibold mb-4">
          Track orders, your shopping history & more!
        </p>

        {/* Sign In */}
        <button
          onClick={() => {
            setLoginStep("login"); 
            setOpenLogin(true);
          }}
          className="w-full bg-black text-white py-3 rounded-md font-medium mb-6 hover:bg-gray-800"
        >
          Go to Sign In
        </button>

        {/* Dialog Login */}
        <Dialog open={openLogin} onOpenChange={setOpenLogin}>
          <DialogContent className="p-6 rounded-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">
                {loginStep === "login" && "Login"}
                {loginStep === "forgot" && "Forgot Password"}
                {loginStep === "otp" && "Enter OTP"}
              </DialogTitle>
            </DialogHeader>

            {/* Step: Login */}
            {loginStep === "login" && (
              <>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                  />
                  <Button className="w-full">Sign in</Button>
                </form>

                <p
                  className="text-sm text-center mt-2 cursor-pointer underline"
                  onClick={() => setLoginStep("forgot")}
                >
                  Forgot your password?
                </p>
                <p
                  className="text-sm text-center mt-2 cursor-pointer underline"
                  onClick={() => {
                    setOpenLogin(false);
                    setOpenSignup(true);
                  }}
                >
                  Create account
                </p>
              </>
            )}

            {/* Step: Forgot Password */}
            {loginStep === "forgot" && (
              <>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border p-2 rounded"
                  />
                  <Button
                    className="w-full"
                    type="button"
                    onClick={() => setLoginStep("otp")}
                  >
                    Send OTP
                  </Button>
                </form>
                <p
                  className="text-sm text-center mt-2 cursor-pointer underline"
                  onClick={() => setLoginStep("login")}
                >
                  Back to Sign In
                </p>
              </>
            )}

            {/* Step: OTP */}
            {loginStep === "otp" && (
              <>
                <form className="space-y-4">
                  <div className="flex justify-between space-x-2">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          className="w-10 h-10 border text-center text-lg rounded"
                        />
                      ))}
                  </div>
                  <Button className="w-full">Verify OTP</Button>
                </form>
                <p
                  className="text-sm text-center mt-2 cursor-pointer underline"
                  onClick={() => setLoginStep("forgot")}
                >
                  Resend OTP
                </p>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Sign Up */}
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
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border p-2 rounded"
              />
              <Button className="w-full">Create Account</Button>
            </form>

            <p
              className="text-sm text-center mt-2 cursor-pointer underline"
              onClick={() => {
                setOpenSignup(false);
                setOpenLogin(true);
                setLoginStep("login");
              }}
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
