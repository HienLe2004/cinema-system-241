import { format, parse } from "date-fns";
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getGheByMaPCAndMaCN } from "../../api/ghe.api";
import { getGheDaDatByMaPCAndMaCN } from "../../api/getdadatcuasc";

const Selection = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const location = useLocation();
  const {suatChieu} = location.state;
  const [maxX, setMaxX] = useState(0);
  const [maxY, setMaxY] = useState(0);
  const [ghe, setGhe] = useState([]);
  const [gheDaDat, setGheDaDat] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]); // Ghế đã chọn

  const seatRefs = useRef({});
  const navigate = useNavigate();

  // Xử lý khi nhấn chọn ghế
  const handleSeatClick = (seat) => {
    if (gheDaDat.some(one => seat == one.MaG)) return; // Không chọn được ghế đã đặt
    setSelectedSeats(
      (prevSelectedSeats) =>
        prevSelectedSeats.includes(seat)
          ? prevSelectedSeats.filter((s) => s !== seat) // Bỏ chọn ghế
          : [...prevSelectedSeats, seat] // Thêm ghế vào danh sách chọn
    );
  };

  // Lấy lớp CSS của từng ghế
  const getSeatClass = (item) => {
    if (gheDaDat.some(one => item.MaG === one.MaG)) return "bg-red-500 cursor-not-allowed"; // Ghế đã đặt
    if (selectedSeats.includes(item.MaG)) return "bg-blue-500"; // Ghế đang chọn
    if (item.LoaiGhe == "VIP") 
      return "bg-yellow-400 hover:bg-blue-300"; // Ghế VIP
    return "bg-gray-300 hover:bg-blue-300"; // Ghế thường
  };

  // Xử lý đặt vé
  const handleBookTickets = () => {
    if (selectedSeats.length === 0) {
      alert("Vui lòng chọn ít nhất một ghế.");
      return;
    }

    // Chuyển tới trang Ticket và truyền thông tin
    navigate(`/ticket/${id}`, {
      state: {
        cacGheDaChon: (selectedSeats.map(one => {return ghe.find(item => item.MaG === one)})),
        suatChieu: suatChieu
      },
    });
  };
  useEffect(()=>{
    const fetchGhe = async () => {
      const {data} = await getGheByMaPCAndMaCN(suatChieu.MaPC, suatChieu.MaCN)
      console.log(data.data)
      setGhe(data.data)
      data.data.map(one => {
        setMaxX(Math.max(one.ToaDoX, maxX))
        setMaxY(Math.max(one.ToaDoY, maxY))
      })
    }
    const fetchGheDaDat = async () => {
      const {data} = await getGheDaDatByMaPCAndMaCN(suatChieu.MaSC, suatChieu.MaPC, suatChieu.MaCN)
      setGheDaDat(data.data)
    }
    fetchGhe()
    fetchGheDaDat()
  },[])
  return (
    <div className="p-12">
      <div className="text-center font-bold text-xl flex flex-col gap-y-5">
        <div className="text-4xl">
          {`${suatChieu.TenPhim}`}
        </div>
        <div>
          {`${suatChieu.TenChiNhanh} - ${suatChieu.PhongChieu}`}
        </div>
        <div>
          {`${format(parse(suatChieu.Gio, "kk:mm:ss", new Date()), "kk:mm")} - ${suatChieu.Thu} ${format(new Date(suatChieu.Ngay), "dd-MM-yyyy")}`}
        </div>
      </div>
      {/* Sơ đồ màn hình và ghế */}
      <div className="relative w-full max-w-4xl mx-auto border rounded-3xl bg-Lime-100 mt-6 mb-6 pr-2 pl-2">
        <div className="text-center text-white py-2 rounded-3xl w-3/4 mx-auto mb-4 mt-4 font-bold text-3xl">
          SCREEN
        </div>
        <hr />
        <div className="flex flex-col items-center mt-4">
          {Array(maxX).fill().map((row, x) => (
            <div key={x} className="flex items-center justify-center mb-2">
              <div className="w-8 text-center font-semibold text-black">
                {String.fromCharCode(65 + x)}
              </div>
              <div className="flex mr-10">
                {Array(maxY)
                  .fill()
                  .map((_, y) => {
                    const item = ghe.find(one => one.ToaDoX === x + 1 && one.ToaDoY === y + 1)
                    return (
                      <div
                        key={item.MaG}
                        ref={(el) => {
                          seatRefs.current[item.MaG] = el; // Gán ref cho mỗi ghế
                        }}
                        className={`w-8 h-8 m-1 rounded ${getSeatClass(item)}`}
                        onClick={() => handleSeatClick(item.MaG)}
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
