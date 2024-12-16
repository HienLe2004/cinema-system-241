import React, { createContext, useContext, useState, useEffect } from "react";

// Tạo ngữ cảnh người dùng
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Khởi tạo trạng thái admin từ localStorage
  const [isAdmin, setIsAdmin] = useState(() => {
    const storedIsAdmin = localStorage.getItem("isAdmin");
    return storedIsAdmin === "true"; // Chuyển chuỗi về boolean
  });

  // Hàm login (giả lập)
  const loginAsAdmin = () => {
    setIsAdmin(true);
    localStorage.setItem("isAdmin", "true"); // Lưu vào localStorage
  };

  // Hàm logout
  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin"); // Xóa khỏi localStorage
  };

  // Truyền giá trị qua context
  return (
    <UserContext.Provider value={{ isAdmin, loginAsAdmin, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook để dùng context
export const useUser = () => useContext(UserContext);
