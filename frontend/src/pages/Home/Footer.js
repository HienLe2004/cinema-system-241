import React from "react";
import {
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="text-white bg-Lime-50 py-6 mt-8 border-gray-600">
      <div className="container mx-auto flex justify-between items-start flex-wrap text-left ">
        {/* Block 1: Điều khoản dịch vụ */}
        <div className="flex-1 ml-48">
          <p className="font-semibold mb-2 font-bold">Điều khoản dịch vụ</p>
          <div className="space-y-2 pl-4">
            <p>
              <Link to="/terms/terms-general" className="text-blue-400 hover:text-blue-500">
                Điều Khoản chung
              </Link>
            </p>
            <p>
              <Link to="/terms/terms-transaction" className="text-blue-400 hover:text-blue-500">
                Điều khoản giao dịch
              </Link>
            </p>
          </div>
        </div>

        {/* Block 2: Kênh kết nối */}
        <div className="flex-1">
          <p className="font-semibold mb-2 font-bold">Kênh kết nối</p>
          <ul className="space-x-4 pl-4 flex">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookOutlined className="text-2xl hover:text-blue-500" />
              </a>
            </li>
            <li>
              <a href="mailto:support@example.com">
                <MailOutlined className="text-2xl hover:text-red-500" />
              </a>
            </li>
          </ul>
        </div>

        {/* Block 3: Chăm sóc khách hàng */}
        <div className="flex-1">
          <p className="font-semibold mb-2 font-bold">Chăm sóc khách hàng</p>
          <ul className="space-y-2 pl-4">
            <li>
              <PhoneOutlined /> Hotline: 123-456-789
            </li>
            <li>
              <FieldTimeOutlined /> 8:00-23:00 hàng ngày
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
