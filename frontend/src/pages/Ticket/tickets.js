import React from "react";
import { useParams, useLocation } from "react-router-dom";

const Ticket = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const location = useLocation();
  console.log(location.state); // Kiểm tra dữ liệu nhận được
  const { selectedSeats, movieTitle, theater, showTime } = location.state || {};

  const handleFinish = () => {
    alert("Đặt vé hoàn tất!");
    // Có thể thêm logic khác khi đặt vé hoàn tất, như điều hướng về trang chính
  };

  return (
    <div className="container mx-auto p-6 bg-gray-200">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Thông tin vé</h2>
        
        {selectedSeats && selectedSeats.length > 0 ? (
          <>
            <p><strong>Tên phim:</strong> {movieTitle || "Không có thông tin"}</p>
            <p><strong>Ghế đã chọn:</strong> {selectedSeats.join(", ")}</p>
            <p><strong>Rạp:</strong> {theater || "Không có thông tin"}</p>
            <p><strong>Giờ chiếu:</strong> {showTime || "Không có thông tin"}</p>
            <p><strong>ID suất chiếu:</strong> {id}</p>
          </>
        ) : (
          <p className="text-red-600">Không có ghế đã chọn!</p>
        )}

        <button 
          onClick={handleFinish} 
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Hoàn tất đặt vé
        </button>
      </div>
    </div>
  );
};

export default Ticket;