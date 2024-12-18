import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import HCMUTLogo from './Logo/HCMUT.png';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brown-200">
      <div className="flex flex-col items-center mb-6">
        <img src={HCMUTLogo} alt="Logo" className="h-40 mb-4" />
        <h1 className="text-white text-3xl font-bold">Hệ thống Rạp chiếu phim</h1>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button
          type="primary"
          onClick={() => navigate('/customer-login')}
          className="w-40 h-12 text-lg text-red-500 font-semibold bg-Lime-50 hove:b"
        >
          Khách hàng
        </Button>
        <Button
          type="primary"
          onClick={() => navigate('/login')}
          className="w-40 h-12 text-lg text-red-500 font-semibold bg-Lime-50"
        >
          Quản lí
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
