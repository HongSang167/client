import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

function AuthSidebar({ onClose }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [loginStep, setLoginStep] = useState("login");
  const { login, users } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const foundUser = users.find(u => u.email === email);
    if (foundUser && password === "123456") {
      login(foundUser);
      setOpenLogin(false);
      onClose();
    } else {
      alert("❌ Sai email hoặc mật khẩu!");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.fullname.value;
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const confirm = e.target.confirm.value;

    if (pass !== confirm) {
      alert("⚠️ Mật khẩu không khớp!");
      return;
    }

    alert(`🎉 Tạo tài khoản thành công cho ${name} (${email})`);
    setOpenSignup(false);
    setOpenLogin(true);
    setLoginStep("login");
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div className="relative w-96 bg-white h-full shadow-lg p-6 animate-slideIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-6">Welcome</h2>
        <p className="font-semibold mb-4">Track orders, your shopping history & more!</p>

        <button
          onClick={() => { setLoginStep("login"); setOpenLogin(true); }}
          className="w-full bg-black text-white py-3 rounded-md font-medium mb-6 hover:bg-gray-800"
        >
          Go to Sign In
        </button>

        <Dialog open={openLogin} onOpenChange={setOpenLogin}>
          <DialogContent className="p-6 rounded-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">Login</DialogTitle>
            </DialogHeader>

            {loginStep === "login" && (
              <form className="space-y-4" onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email" className="w-full border p-2 rounded" />
                <input type="password" name="password" placeholder="Password" className="w-full border p-2 rounded" />
                <Button type="submit" className="w-full">Sign in</Button>
                <p
                  className="text-sm text-center mt-2 cursor-pointer underline"
                  onClick={() => { setOpenLogin(false); setOpenSignup(true); }}
                >
                  Create account
                </p>
              </form>
            )}
          </DialogContent>
        </Dialog>

        <button
          onClick={() => setOpenSignup(true)}
          className="w-full border border-gray-400 py-3 rounded-md font-medium hover:bg-gray-100"
        >
          New Customer? Sign Up here
        </button>

        <Dialog open={openSignup} onOpenChange={setOpenSignup}>
          <DialogContent className="p-6 rounded-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">Sign Up</DialogTitle>
            </DialogHeader>

            <form className="space-y-4" onSubmit={handleSignup}>
              <input type="text" name="fullname" placeholder="Full Name" className="w-full border p-2 rounded" />
              <input type="email" name="email" placeholder="Email" className="w-full border p-2 rounded" />
              <input type="password" name="password" placeholder="Password" className="w-full border p-2 rounded" />
              <input type="password" name="confirm" placeholder="Confirm Password" className="w-full border p-2 rounded" />
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default AuthSidebar;
