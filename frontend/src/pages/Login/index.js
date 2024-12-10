import React from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import Button from "../../component/Button";
function Login() {
  const onFinish = (values) => {
    console.log("Success: ", values);
  };
  return (
    <div className="bg-brown-50 flex justify-center h-screen items-center bg-primary">
      <div className="p-4 w-[300px] bg-Lime-50 rounded-2xl border">
        <h1 className="text-xl mb-1 text-center ">LOGIN</h1>
        <hr />
        <Form layout="vertical" className="mt-2" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input type="text" placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <div className="flex flex-col mt-2 gap-2">
            <Button fullwidth title="LOGIN" type="submit" />
            <Link to="/Register" className="text-primary">
              {" "}
              Don't have an account? Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
export default Login;
