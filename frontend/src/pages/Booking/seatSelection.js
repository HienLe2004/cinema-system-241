import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Selection = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [selectedSeats, setSelectedSeats] = useState([]); // Ghế đã chọn
  const rows = Array.from({ length: 18 }, (_, i) =>
    String.fromCharCode(65 + i)
  ); // Tạo hàng từ A -> R
  const seatsPerRow = 15; // Số ghế mỗi hàng
  const coupleSeatsRow = "R"; // Hàng ghế đôi
  const coupleSeatsCount = 5; // Số ghế đôi ở hàng R
  const vipRows = ["H", "I", "J"]; // Ghế VIP ở giữa các hàng H, I, J
  const vipSeatRange = [6, 10]; // Khoảng ghế VIP ở giữa (từ ghế số 6 -> 10)
  const bookedSeats = ["B5", "H7", "I8", "J9", "R2"]; // Các ghế đã đặt sẵn

  const seatRefs = useRef({});
  const navigate = useNavigate();

  // Xử lý khi nhấn chọn ghế
  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return; // Không chọn được ghế đã đặt
    setSelectedSeats(
      (prevSelectedSeats) =>
        prevSelectedSeats.includes(seat)
          ? prevSelectedSeats.filter((s) => s !== seat) // Bỏ chọn ghế
          : [...prevSelectedSeats, seat] // Thêm ghế vào danh sách chọn
    );
  };

  // Lấy lớp CSS của từng ghế
  const getSeatClass = (row, seatNumber) => {
    const seatId = `${row}${seatNumber}`;
    if (bookedSeats.includes(seatId)) return "bg-red-500 cursor-not-allowed"; // Ghế đã đặt
    if (selectedSeats.includes(seatId)) return "bg-blue-500"; // Ghế đang chọn
    if (row === coupleSeatsRow && seatNumber <= coupleSeatsCount)
      return "bg-pink-400 hover:bg-blue-300"; // Ghế đôi
    if (
      vipRows.includes(row) &&
      seatNumber >= vipSeatRange[0] &&
      seatNumber <= vipSeatRange[1]
    )
      return "bg-yellow-400 hover:bg-blue-300"; // Ghế VIP
    return "bg-gray-300 hover:bg-blue-300"; // Ghế thường
  };

  // Xử lý đặt vé
  const handleBookTickets = () => {
    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế.");
      return;
    }

    // Thông tin phim và suất chiếu
    const movieTitle = "Tên Phim"; // Tên phim
    const theater = "Rạp ABC"; // Tên rạp
    const showTime = "19:00"; // Giờ chiếu

    // Chuyển tới trang Ticket và truyền thông tin
    navigate(`/ticket/${id}`, {
      state: {
        selectedSeats,
        movieTitle,
        theater,
        showTime,
      },
    });
  };

  return (
    <div className="p-12">
      {/* Sơ đồ màn hình và ghế */}
      <div className="relative w-full max-w-4xl mx-auto border rounded-3xl bg-Lime-100 mt-6 mb-6 pr-2 pl-2">
        <div className="text-center text-white py-2 rounded-3xl w-3/4 mx-auto mb-4 mt-4 font-bold text-3xl">
          SCREEN
        </div>
        <hr />
        <div className="flex flex-col items-center mt-4">
          {rows.map((row) => (
            <div key={row} className="flex items-center justify-center mb-2">
              <div className="w-8 text-center font-semibold text-black">
                {row}
              </div>
              <div className="flex">
                {Array(row === coupleSeatsRow ? coupleSeatsCount : seatsPerRow)
                  .fill()
                  .map((_, i) => {
                    const seatNumber = i + 1;
                    const seatId = `${row}${seatNumber}`;
                    return (
                      <div
                        key={seatId}
                        ref={(el) => {
                          seatRefs.current[seatId] = el; // Gán ref cho mỗi ghế
                        }}
                        className={`w-8 h-8 m-1 rounded ${getSeatClass(
                          row,
                          seatNumber
                        )}`}
                        onClick={() => handleSeatClick(seatId)}
                      ></div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chú giải */}
      <div className="mt-4 w-full max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Chú giải:</h3>
        <div className="flex justify-around">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded mr-2"></div>
            <span>Ghế Thường</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-400 rounded mr-2"></div>
            <span>Ghế VIP</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-pink-400 rounded mr-2"></div>
            <span>Ghế Đôi</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-500 rounded mr-2"></div>
            <span>Đã đặt</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded mr-2"></div>
            <span>Đang chọn</span>
          </div>
        </div>
      </div>

      {/* Ghế đã chọn */}
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold">Ghế bạn đã chọn:</h2>
        <p className="text-lg">
          {selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "Chưa chọn ghế nào."}
        </p>
      </div>

      {/* Nút Đặt vé và Nút Quay lại */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Quay lại
        </button>
        <button
          onClick={handleBookTickets}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Đặt vé
        </button>
      </div>
    </div>
  );
};

export default Selection;
