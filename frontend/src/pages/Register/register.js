import React from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import Button from "../../component/Button";

function Register() {
  const onFinish = (values) => {
    console.log("Success: ", values);
  };

  return (
    <div className="bg-brown-50 pt-3 pb-3 " style={{minHeight: '100vh'}}>
      <div className="flex justify-center items-center">
        <div className="p-4 w-[300px] bg-Lime-50 rounded-2xl border">
          <h1 className="text-xl text-center pd-1">REGISTER</h1>
          <hr />
          <Form layout="vertical" className="mt-1" onFinish={onFinish}>
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input type="tel" placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item
              label="CCCD Number"
              name="cccd"
              rules={[
                { required: true, message: "Please input your CCCD number!" },
              ]}
            >
              <Input placeholder="Enter your CCCD number" />
            </Form.Item>
            
            <div className="flex flex-col mt-1 gap-1">
              <Button fullwidth title="REGISTER" type="submit" />
              <Link to="/Login" className="text-primary">
                Already have an account? Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
