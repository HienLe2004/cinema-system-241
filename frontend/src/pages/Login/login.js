import React from "react";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import { useUser } from "../../api/usercontext";

function Login() {
  const navigate = useNavigate();
  const { loginAsAdmin } = useUser(); // Lấy hàm login từ context

  const onFinish = (values) => {
    if (values.name === "admin" && values.password === "123456789") {
      loginAsAdmin(); // Đặt trạng thái admin
      navigate("/ad-crud-movie");
    } else {
      alert("Thông tin đăng nhập không chính xác");
    }
  };

  return (
    <div className="bg-brown-100 flex justify-center items-center h-screen">
      <div className="p-6 w-[350px] bg-Lime-50 rounded-3xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-500 mb-6">
          <strong>Please login to your account admin</strong>
        </p>
        <hr />
        <Form layout="vertical" className="mt-2" onFinish={onFinish}>
          <Form.Item
            label={<span className="font-semibold text-gray-600">Name</span>}
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              type="text"
              placeholder="Enter your name"
              className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              style={{ fontWeight: '600', color: '#1E3A8A' }} // Đặt độ đậm và màu sắc
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="font-semibold text-gray-600">Password</span>
            }
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              style={{ fontWeight: '600', color: '#1E3A8A' }} // Đặt độ đậm và màu sắc
            />
          </Form.Item>
          <div className="flex flex-col mt-4 gap-4">
            <Button
              fullwidth
              title="LOGIN"
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            />
          </div>
        </Form>
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-500 hover:underline text-sm">
            Back to Navigation page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;