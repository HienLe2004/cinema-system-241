import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTheLoaiByMaP } from '../../api/theloai.api';
import { getDaoDienByPhimID } from '../../api/daodien.api';
import { getDienVienByPhimID } from '../../api/dienvien.api';
import { getPhimCoHTCByMaP } from '../../api/phim_co_htc';
import { getSuatChieuByMaP } from '../../api/suatchieu.api';
import { format, parse } from "date-fns";
import CommentAndRate from '../../component/CommentAndRate';
import CommentAndRateForm from '../../component/CommentAndRateForm';
import { getDanhGiaByMaP } from '../../api/danhgia.api';

const MovieDetail = () => {
  const location = useLocation();
  const { movie } = location.state || {};
  const [theLoai, setTheLoai] = useState([]);
  const [daoDien, setDaodien] = useState([]);
  const [dienVien, setDienVien] = useState([]);
  const [loaiPhienDich, setLoaiPhienDich] = useState([]);
  const [congNgheChieu, setCongNgheChieu] = useState([]);
  const [danhGia, setDanhGia] = useState([]);
  const [suatChieu, setSuatChieu] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const navigate = useNavigate();

  const handleShowtimeSelection = (showtime) => {
    setSelectedShowtime(showtime);
  };

  const handleBookingRedirect = () => {
    if (selectedShowtime) {
      navigate(`/booking/${movie.MaP}`, { state: { suatChieu: selectedShowtime } });
    } else {
      alert('Vui lòng chọn một suất chiếu!');
    }
  };

  useEffect(()=>{
    const fetchTheLoaiPhim = async () => {
      const {data} = await getTheLoaiByMaP(movie.MaP)
      setTheLoai(data.data[0].map(one => one.TenTheLoai))
    }
    const fetchDaoDienPhim = async () => {
      const {data} = await getDaoDienByPhimID(movie.MaP)
      setDaodien(data.data[0].map(one => one.Ten))
    }
    const fetchDienVienPhim = async () => {
      const {data} = await getDienVienByPhimID(movie.MaP)
      setDienVien(data.data.map(one => (one.Ten + ` (${one.VaiDien})`)))
    }
    const fetchHinhThucChieuPhim = async () => {
      const {data} = await getPhimCoHTCByMaP(movie.MaP)
      const uniqueLoaiCongNgheChieu = data.data[0].reduce((unique, item) => {
        if (!unique.includes(item.LoaiCongNgheChieu)) {
          unique.push(item.LoaiCongNgheChieu);
        }
        return unique;
      },[])
      setCongNgheChieu(uniqueLoaiCongNgheChieu)

      const uniqueLoaiPhienDich = data.data[0].reduce((unique, item) => {
        if (!unique.includes(item.LoaiPhienDich)) {
          unique.push(item.LoaiPhienDich);
        }
        return unique;
      },[])

      let loaiPhienDichWithTenNgonNgu = uniqueLoaiPhienDich.map(one => {
        const uniqueTenNgonNgu = data.data[0].reduce((unique, item) => {
          if (!unique.includes(item.TenNgonNgu) && item.LoaiPhienDich == one) {
            unique.push(item.TenNgonNgu);
          }
          return unique;
        },[])
        return one = `${one} (${uniqueTenNgonNgu.join(', ')})`
      })
      setLoaiPhienDich(loaiPhienDichWithTenNgonNgu)
    }
    const fetchDanhGiaPhim = async () => {
      const {data} = await getDanhGiaByMaP(movie.MaP)
      console.log(data.data[0])
      setDanhGia(data.data[0])  
    }
    const fetchSuatChieuPhim = async () => {
      const {data} = await getSuatChieuByMaP(movie.MaP)
      let formatedSuatChieu = data?.data?.reduce((list, suat) => {
        list[suat.TenChiNhanh] = list[suat.TenChiNhanh] || []
        list[suat.TenChiNhanh].push(suat)
        return list
      },{})
      setSuatChieu(formatedSuatChieu || {})
    }
    fetchTheLoaiPhim()
    fetchDaoDienPhim()
    fetchDienVienPhim()
    fetchHinhThucChieuPhim()
    fetchDanhGiaPhim()
    fetchSuatChieuPhim()
  },[])

  return (
    <div className="container mx-auto p-24 ">
      <div className="flex flex-col md:flex-row justify-center items-center bg-white rounded-lg shadow-lg p-6 space-y-6 md:space-y-0 md:space-x-8 border border-gray-100 bg-gray-200">
        <div className="md:w-1/2 flex justify-center">
          <img src={movie.Poster} alt={movie.Ten} className="rounded-lg shadow-lg max-w-md object-cover " />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-red-600 mb-2">{movie.Ten}</h2>
          <p className="text-gray-900"><strong>Nhãn:</strong> {movie.Nhan + " (" + movie.GioiHanDoTuoi + "+)"}</p>
          <p className="text-gray-900"><strong>Thời gian:</strong> {movie.ThoiLuong} phút</p>
          <p className="text-gray-900"><strong>Thể loại:</strong> {theLoai.join(", ")}</p>
          <p className="text-gray-900"><strong>Mô tả:</strong> {movie.MoTa}</p>
          <p className="text-gray-900"><strong>Đạo diễn:</strong> {daoDien.join(", ")}</p>
          <p className="text-gray-900"><strong>Diễn viên:</strong> {dienVien.join(", ")}</p>
          <p className="text-gray-900"><strong>Trailer: </strong>
            <a href={movie.Trailer} target="_blank" rel="noopener noreferrer">
              Link
            </a>
          </p>
          <p className="text-gray-900"><strong>Hình thức chiếu:</strong> {loaiPhienDich.join(", ")}</p>
          <p className="text-gray-900"><strong>Công nghệ chiếu:</strong> {congNgheChieu.join(", ")}</p>
        </div>
      </div>
      <div className='bg-gray-200 rounded-lg shadow-lg mt-8 flex flex-col p-6 gap-y-2'>
        <p className='flex justify-center text-2xl text-red-600 font-bold'>Đánh giá</p>
        <div className='flex flex-col gap-y-2 text-gray-700'>
          {danhGia.length === 0 && <p className='italic text-center'>Chưa có đánh giá nào</p>}
          {danhGia.map((item, index) => {
            return <CommentAndRate name={item.MaKH} comment={item.BinhLuan} rate={item.DiemSo} date={item.Ngay}/>
          })}
        </div>
        {showRatingForm && <CommentAndRateForm closeForm={()=>setShowRatingForm(false)}/>}
        <button className={`${showRatingForm ? "hidden":"flex"} justify-center items-center bg-green-600 py-2 font-semibold text-xl rounded-lg hover:bg-green-700 transition-all`}
          onClick={()=>setShowRatingForm(true)}>
          Viết đánh giá
        </button>
      </div>
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6 bg-gray-200">
        <h3 className="text-2xl font-semibold text-red-600 mb-4"><strong>Chọn suất chiếu</strong></h3>
        {Object.keys(suatChieu)?.length > 0 ? (
          Object.keys(suatChieu).map((branch) => (
            <div key={branch} className="mb-6">
              <h4 className="text-xl font-semibold text-gray-700 mb-2">{branch}</h4>
              <div className="space-y-2">
                {suatChieu[branch]?.map((showtime, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleShowtimeSelection(showtime)} 
                    className={`w-full text-left p-4 border rounded-lg transition duration-200 
                      ${selectedShowtime === showtime ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800 hover:border-yellow-400 border-2'}`}
                  >
                    {format(new Date(showtime.Ngay), "dd-MM-yyyy")} - {format(parse(showtime.Gio, "kk:mm:ss", new Date()), "kk:mm")}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Không có suất chiếu nào.</p>
        )}
      </div>

      <div className="mt-8">
        <button 
          onClick={handleBookingRedirect} 
          className="w-full py-3 bg-green-600 text-white font-semibold text-xl rounded-lg hover:bg-green-700 transition-all"
        >
          Đặt suất chiếu
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;