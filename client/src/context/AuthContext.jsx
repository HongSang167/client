import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [users, setUsers] = useState([
    { id: "U001", gmail: "admin@example.com", password: "123456", fullName: "Admin", gender: "Nam", dateOfBirth: "1985-01-10", phoneNumber: "0909000001", address: "TP. Hồ Chí Minh", role: "admin" },
    { id: "U002", gmail: "emp@example.com", password: "emp123", fullName: "Nguyễn Văn Nhân", gender: "Nam", dateOfBirth: "1992-05-14", phoneNumber: "0909123456", address: "Đà Nẵng", role: "employee" },
    { id: "U003", gmail: "employee2@example.com", password: "emp123", fullName: "Trần Thị Mai", gender: "Nữ", dateOfBirth: "1996-09-22", phoneNumber: "0909456123", address: "Huế", role: "employee" },
    { id: "U004", gmail: "employee3@example.com", password: "emp123", fullName: "Phạm Hồng Dũng", gender: "Nam", dateOfBirth: "1994-12-08", phoneNumber: "0909876543", address: "Cần Thơ", role: "employee" },
    { id: "U005", gmail: "john@example.com", password: "123456", fullName: "John Doe", gender: "Nam", dateOfBirth: "1990-07-15", phoneNumber: "0901112233", address: "TP. Hồ Chí Minh", role: "customer" },
    { id: "U006", gmail: "jane@example.com", password: "123456", fullName: "Jane Smith", gender: "Nữ", dateOfBirth: "1993-03-21", phoneNumber: "0902223344", address: "Hà Nội", role: "customer" },
    { id: "U007", gmail: "sang@example.com", password: "123456", fullName: "Mỹ Thị Hồng Sang", gender: "Nữ", dateOfBirth: "2000-04-10", phoneNumber: "0903334455", address: "TP. Hồ Chí Minh", role: "customer" },
    { id: "U008", gmail: "linh@example.com", password: "123456", fullName: "Nguyễn Hoài Linh", gender: "Nữ", dateOfBirth: "1998-10-05", phoneNumber: "0904445566", address: "Nha Trang", role: "customer" },
    { id: "U009", gmail: "hoang@example.com", password: "123456", fullName: "Lê Quốc Hoàng", gender: "Nam", dateOfBirth: "1995-02-18", phoneNumber: "0905556677", address: "Bình Dương", role: "customer" },
    { id: "U010", gmail: "thanh@example.com", password: "123456", fullName: "Phan Thanh Tùng", gender: "Nam", dateOfBirth: "1997-11-02", phoneNumber: "0906667788", address: "Đà Lạt", role: "customer" },
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
