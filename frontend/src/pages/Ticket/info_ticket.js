import { format, parse } from "date-fns";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getPhimByID } from "../../api/phim.api";
import { createVe } from "../../api/ve.api";

const Ticket = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const location = useLocation();
  const { cacGheDaChon, suatChieu } = location.state || {};
  const [tongTien, setTongTien] = useState(0)
  
  useEffect(()=>{
    const fetchPhim = async () => {
      let count = 0;
      for (let ghe of cacGheDaChon) {
        console.log(ghe)
        count += ghe.GiaGhe
      }
      const {data} = await getPhimByID(suatChieu.MaP)
      count += data.data[0][0].GiaGoc
      setTongTien(count)
    }
    fetchPhim()
  },[])
  const handleFinish = async () => {
    let danhSachGhe = []
    for (let ghe of cacGheDaChon) {
      danhSachGhe.push(ghe.MaG)
    }
    console.log(danhSachGhe)
    const {data} = await createVe({
      PhuongThucThanhToan: "Momo",
      TrangThaiThanhToan: true,
      GiaVe: tongTien,
      MaHD: null,
      MaKH: null,
      MaSC: suatChieu.MaSC,
      MaPC: suatChieu.MaPC,
      MaCN: suatChieu.MaCN,
      MaNV: null,
      DanhSachGhe: danhSachGhe
    })
    alert("Mã vé của bạn là: " + data.id)

    // Có thể thêm logic khác khi đặt vé hoàn tất, như điều hướng về trang chính
  };
  return (
    <div className="container mx-auto p-6 bg-gray-200">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Thông tin vé</h2>
        
        {cacGheDaChon && cacGheDaChon.length > 0 ? (
          <>
            <p><strong>Tên phim:</strong> {suatChieu.TenPhim || "Không có thông tin"}</p>
            <p><strong>Ghế đã chọn:</strong> {cacGheDaChon.map(one => {return one.MaG}).join(", ")}</p>
            <p><strong>Rạp:</strong> {suatChieu.PhongChieu || "Không có thông tin"}</p>
            <p><strong>Giờ chiếu:</strong> {`${format(parse(suatChieu.Gio, "kk:mm:ss", new Date()), "kk:mm")} - ${suatChieu.Thu} ${format(new Date(suatChieu.Ngay), "dd-MM-yyyy")}` || "Không có thông tin"}</p>
            <p><strong>ID suất chiếu:</strong> {suatChieu.MaSC}</p>
            <p><strong>Tổng tiền: </strong> {tongTien}</p>
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