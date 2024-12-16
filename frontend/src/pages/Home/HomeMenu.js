// import React, { useState, useEffect } from "react"; // Đảm bảo useState và useEffect được import
// import { Menu, Avatar, Dropdown, Input, Button } from "antd";
// import { UserOutlined, ShoppingOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
// import { Link, useNavigate } from "react-router-dom";
// import { useUser } from '../../api/usercontext'; // Nhập useUser

// const HomeMenu = () => {
//   const { isAdmin, logout } = useUser(); // Lấy trạng thái isAdmin và hàm logout từ context
//   const [searchTerm, setSearchTerm] = useState("");
//   const [branches, setBranches] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBranches = async () => {
//       try {
//         const response = [
//           { id: 1, name: "Rạp CGV Vincom" },
//           { id: 2, name: "Rạp CGV Landmark" },
//           { id: 3, name: "Rạp CGV Bitexco" },
//         ];
//         setBranches(response);
//       } catch (error) {
//         console.error("Lỗi khi tải danh sách chi nhánh:", error);
//       }
//     };

//     fetchBranches();
//   }, []);

//   const handleSearch = () => {
//     if (searchTerm.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
//     }
//   };

//   const handleBranchSelect = (branch) => {
//     navigate(`/moviesbybranch/${branch.id}`);
//   };

//   const handleLogout = () => {
//     logout(); // Đặt trạng thái không phải admin
//     navigate("/"); // Điều hướng về trang điều hướng sau khi đăng xuất
//   };

//   return (
//     <div className="bg-brown-600 p-4">
//       <div className="flex items-center justify-center">
//         <div className="flex items-center gap-10 max-w-screen-xl w-full justify-center">
//           {/* Avatar và chữ "Quản lí" chỉ hiển thị nếu là admin */}
//           {isAdmin && (
//             <Dropdown
//               overlay={
//                 <Menu>
//                   <Menu.Item onClick={() => navigate("/crud-phim")}>Phim</Menu.Item>
//                   <Menu.Item onClick={() => navigate("/crud-show-time")}>Suất chiếu</Menu.Item>
//                 </Menu>
//               }
//             >
//               <div className="flex items-center" style={{ cursor: "pointer" }}>
//                 <Avatar icon={<UserOutlined />} className="mr-2" />
//                 <span className="text-white font-bold">Quản lí</span>
//               </div>
//             </Dropdown>
//           )}

//           <div className="flex items-center">
//             <Link to="/home" className="flex items-center text-white font-bold">
//               <HomeOutlined className="mr-2" />
//               Trang chủ
//             </Link>
//           </div>

//           <div className="flex items-center">
//             <Dropdown
//               overlay={
//                 <Menu>
//                   {branches.map((branch) => (
//                     <Menu.Item
//                       key={branch.id}
//                       onClick={() => handleBranchSelect(branch)}
//                     >
//                       {branch.name}
//                     </Menu.Item>
//                   ))}
//                 </Menu>
//               }
//               trigger={["hover"]}
//             >
//               <span className="flex items-center text-white font-bold">
//                 <ShoppingOutlined className="mr-2" />
//                 Đặt vé ngay
//               </span>
//             </Dropdown>
//           </div>

//           <div className="flex items-center">
//             <Input.Search
//               placeholder="Tìm kiếm phim..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onSearch={handleSearch}
//               style={{ width: 400 }}
//             />
//           </div>

//           {/* Nút Đăng xuất */}
//           <div className="flex items-center bg-Lime-50 text-white rounded">
//             <Button
//               icon={<LogoutOutlined />}
//               type="link"
//               className="font-bold"
//               onClick={handleLogout}
//               style={{ color: 'black' }}
//             >
//               Đăng xuất
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomeMenu;
import React, { useState, useEffect } from "react"; // Đảm bảo useState và useEffect được import
import { Menu, Avatar, Dropdown, Input, Button } from "antd";
import { UserOutlined, ShoppingOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../../api/usercontext'; // Nhập useUser

const HomeMenu = () => {
  const { isAdmin, logout } = useUser(); // Lấy trạng thái isAdmin và hàm logout từ context
  const [searchTerm, setSearchTerm] = useState("");
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = [
          { id: 1, name: "Rạp CGV Vincom" },
          { id: 2, name: "Rạp CGV Landmark" },
          { id: 3, name: "Rạp CGV Bitexco" },
        ];
        setBranches(response);
      } catch (error) {
        console.error("Lỗi khi tải danh sách chi nhánh:", error);
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

  const handleLogout = () => {
    logout(); // Đặt trạng thái không phải admin
    navigate("/"); // Điều hướng về trang điều hướng sau khi đăng xuất
  };

  return (
    <div className="bg-brown-600 p-4">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-10 max-w-screen-xl w-full justify-center">
          {/* Avatar và chữ "Quản lí" chỉ hiển thị nếu là admin */}
          {isAdmin && (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item onClick={() => navigate("/crud-phim")}>Phim</Menu.Item>
                  <Menu.Item onClick={() => navigate("/crud-show-time")}>Suất chiếu</Menu.Item>
                </Menu>
              }
            >
              <div className="flex items-center" style={{ cursor: "pointer" }}>
                <Avatar icon={<UserOutlined />} className="mr-2" />
                <span className="text-white font-bold">Quản lí</span>
              </div>
            </Dropdown>
          )}

          <div className="flex items-center">
            <Link to="/home" className="flex items-center text-white font-bold">
              <HomeOutlined className="mr-2" />
              Trang chủ
            </Link>
          </div>

          <div className="flex items-center">
            <Dropdown
              overlay={
                <Menu>
                  {branches.map((branch) => (
                    <Menu.Item
                      key={branch.id}
                      onClick={() => handleBranchSelect(branch)}
                    >
                      {branch.name}
                    </Menu.Item>
                  ))}
                </Menu>
              }
              trigger={["hover"]}
            >
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

          {/* Nút Đăng xuất */}
          <div className="flex items-center bg-Lime-50 text-white rounded">
            <Button
              icon={<LogoutOutlined />}
              type="link"
              className="font-bold"
              onClick={handleLogout}
              style={{ color: 'black' }}
            >
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMenu;