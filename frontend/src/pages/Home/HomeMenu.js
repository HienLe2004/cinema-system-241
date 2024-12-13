import React, { useState, useEffect } from 'react';
import { Menu, Avatar, Dropdown, Input } from 'antd';
import { UserOutlined, ShoppingOutlined, HomeOutlined, HolderOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const HomeMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const [searchTerm, setSearchTerm] = useState(''); // Tìm kiếm
  const [branches, setBranches] = useState([]); // Danh sách chi nhánh từ API
  const navigate = useNavigate();

  // Giả lập API load danh sách chi nhánh
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = [
          { id: 1, name: 'Rạp CGV Vincom' },
          { id: 2, name: 'Rạp CGV Landmark' },
          { id: 3, name: 'Rạp CGV Bitexco' },
        ]; // Dữ liệu giả lập
        setBranches(response);
      } catch (error) {
        console.error('Lỗi khi tải danh sách chi nhánh:', error);
      }
    };

    fetchBranches();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false); // Xử lý đăng xuất
  };

  const handleSearch = () => {
    console.log('Tìm kiếm:', searchTerm);
    navigate(`/search?query=${searchTerm}`);
  };

  const handleBranchSelect = (branch) => {
    navigate(`/moviesbybranch/${branch.id}`); // Chuyển đến trang danh sách phim theo chi nhánh
  };

  const menu = (
    <Menu>
      {isLoggedIn ? (
        <>
          <Menu.Item>
            <Link to="/profile">Thông tin tài khoản</Link>
          </Menu.Item>
          <Menu.Item onClick={handleLogout}>Đăng xuất</Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item>
            <Link to="/login">Đăng nhập</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/register">Đăng kí</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  const branchesMenu = (
    <Menu>
      {branches.map((branch) => (
        <Menu.Item key={branch.id} onClick={() => handleBranchSelect(branch)}>
          {branch.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="bg-brown-600 p-4">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-10 max-w-screen-xl w-full justify-center">
          <div className="flex items-center">
            <Dropdown overlay={menu} trigger={['hover']}>
              <span className="flex items-center text-white font-bold">
                <Avatar icon={<UserOutlined />} className="mr-2" />
                Tài khoản
              </span>
            </Dropdown>
          </div>

          <div className="flex items-center">
            <Link to="/" className="flex items-center text-white font-bold">
              <HomeOutlined className="mr-2" />
              Trang chủ
            </Link>
          </div>

          <div className="flex items-center">
            <Dropdown overlay={branchesMenu} trigger={['hover']}>
              <span className="flex items-center text-white font-bold">
              <ShoppingOutlined className="mr-2" />
              Đặt vé ngay
              </span>
            </Dropdown>
          </div>

          <div className="flex items-center">
            <Input.Search
              placeholder="Tìm kiếm phim..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={handleSearch}
              style={{ width: 400 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMenu;