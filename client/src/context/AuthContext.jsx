import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [users, setUsers] = useState([
    { name: "Admin", email: "admin@example.com", role: "admin" },
    { name: "John Doe", email: "john@example.com", role: "customer" },
    { name: "Jane Smith", email: "jane@example.com", role: "customer" },
    { name: "Employee A", email: "emp@example.com", role: "employee" },
  ]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const promoteUser = (email) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.email === email ? { ...u, role: "employee" } : u
      )
    );
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, users, promoteUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
