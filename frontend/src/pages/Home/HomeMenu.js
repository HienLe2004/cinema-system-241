import React, { useState, useEffect } from 'react';
import { Menu, Avatar, Dropdown, Input } from 'antd';
import { UserOutlined, ShoppingOutlined, HomeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const HomeMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = [
          { id: 1, name: 'Rạp CGV Vincom' },
          { id: 2, name: 'Rạp CGV Landmark' },
          { id: 3, name: 'Rạp CGV Bitexco' },
        ];
        setBranches(response);
      } catch (error) {
        console.error('Lỗi khi tải danh sách chi nhánh:', error);
      }
    };

    fetchBranches();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleBranchSelect = (branch) => {
    navigate(`/moviesbybranch/${branch.id}`);
  };

  return (
    <div className="bg-brown-600 p-4">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-10 max-w-screen-xl w-full justify-center">
          {/* Avatar và chữ "Tài khoản" */}
          <div className="flex items-center" onClick={() => navigate('/crud-phim')} style={{ cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} className="mr-2" />
            <span className="text-white font-bold">Quản lí</span>
          </div>

          <div className="flex items-center">
            <Link to="/" className="flex items-center text-white font-bold">
              <HomeOutlined className="mr-2" />
              Trang chủ
            </Link>
          </div>

          <div className="flex items-center">
            <Dropdown overlay={
              <Menu>
                {branches.map((branch) => (
                  <Menu.Item key={branch.id} onClick={() => handleBranchSelect(branch)}>
                    {branch.name}
                  </Menu.Item>
                ))}
              </Menu>
            } trigger={['hover']}>
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