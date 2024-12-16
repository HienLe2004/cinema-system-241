import React from "react";
import { Menu, Avatar, Dropdown, Button } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../api/usercontext"; // Nhập useUser

const MenuBar = () => {
  const { isAdmin, logout } = useUser(); // Lấy trạng thái isAdmin và hàm logout từ context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Xóa trạng thái admin
    navigate("/"); // Điều hướng về trang chính sau khi đăng xuất
  };

  return (
    <div className="bg-brown-600 p-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {isAdmin && (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => navigate("/ad-crud-movie")}>Phim</Menu.Item>
                <Menu.Item onClick={() => navigate("/ad-crud-show-time")}>Suất chiếu</Menu.Item>
              </Menu>
            }
          >
            <div className="flex items-center cursor-pointer text-white font-bold">
              <Avatar icon={<UserOutlined />} className="mr-2" />
              <span>Quản lí</span>
            </div>
          </Dropdown>
        )}

        <Button
          icon={<LogoutOutlined />}
          type="link"
          className="font-bold text-white hover:bg-blue-500 hover:text-white transition duration-300"
          onClick={handleLogout}
          style={{ color: 'black' }}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );
};

export default MenuBar;
