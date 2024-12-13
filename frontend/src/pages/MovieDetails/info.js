// import React, { useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { FaMapMarkerAlt } from 'react-icons/fa';

// const MovieDetail = () => {
//   const location = useLocation();
//   const { movie } = location.state || {};
//   const [selectedShowtime, setSelectedShowtime] = useState(null);
//   const [selectedBranch, setSelectedBranch] = useState('');
//   const navigate = useNavigate();

//   // Hàm thay đổi chi nhánh
//   const handleBranchChange = (branch) => {
//     setSelectedBranch(branch);
//     setSelectedShowtime(null); // Reset selected showtime khi thay đổi chi nhánh
//   };

//   // Hàm chọn suất chiếu
//   const handleShowtimeSelection = (showtime, time) => {
//     setSelectedShowtime({ ...showtime, time });
//   };

//   // Hàm điều hướng đến trang booking
//   const handleBookingRedirect = () => {
//     if (selectedShowtime) {
//       navigate(`/booking/${selectedShowtime.id}`, { state: { showtime: selectedShowtime } });
//     } else {
//       alert('Vui lòng chọn một suất chiếu!');
//     }
//   };

//   // Đảm bảo rằng movie.showtimes luôn là mảng
//   const showtimes = Array.isArray(movie?.showtimes) ? movie.showtimes : [];
  
//   // Lọc các chi nhánh duy nhất
//   const uniqueBranches = [...new Set(showtimes.map(showtime => showtime.branch))];
  
//   // Lọc các suất chiếu theo chi nhánh đã chọn
//   const filteredShowtimes = showtimes.filter(showtime => showtime.branch === selectedBranch);

//   return (
//     <div className="container mx-auto p-4 bg-gray-100">
//       {/* Hiển thị thông tin phim */}
//       {movie ? (
//         <div className="flex flex-col md:flex-row justify-center items-center bg-white rounded-lg shadow-lg p-6 space-y-6 md:space-y-0 md:space-x-8 border border-gray-300">
//           <div className="md:w-1/2 flex justify-center">
//             <img src={movie.poster} alt={movie.title} className="rounded-lg shadow-lg w-full h-auto max-w-xs object-cover border border-gray-300" />
//           </div>
//           <div className="md:w-1/2 text-center md:text-left">
//             <h2 className="text-3xl font-bold text-gray-800">{movie.title}</h2>
//             <p className="text-gray-600 mt-2"><strong>Giới hạn tuổi:</strong> {movie.ageLimit}+</p>
//             <p className="text-gray-600 mt-2"><strong>Thời gian:</strong> {movie.duration} phút</p>
//             <p className="text-gray-600 mt-2"><strong>Thể loại:</strong> {movie.genre}</p>
//             <p className="text-gray-600 mt-2"><strong>Đạo diễn:</strong> {movie.director}</p>
//             <p className="text-gray-600 mt-2"><strong>Diễn viên:</strong> {movie.actors}</p>
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-red-600">Không tìm thấy thông tin phim!</p>
//       )}

//       {/* Chọn chi nhánh */}
//       {movie && (
//         <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//           <h3 className="text-2xl font-semibold text-gray-800 mb-4">Chọn chi nhánh rạp</h3>
//           <div className="flex items-center space-x-4 mb-6">
//             <FaMapMarkerAlt className="text-xl text-gray-700" />
//             <select 
//               onChange={(e) => handleBranchChange(e.target.value)}
//               className="py-2 px-4 rounded-md border border-gray-300 bg-white"
//             >
//               <option value="">Chọn chi nhánh</option>
//               {uniqueBranches.length > 0 ? (
//                 uniqueBranches.map((branch, index) => (
//                   <option key={index} value={branch}>{branch}</option>
//                 ))
//               ) : (
//                 <option value="">Không có chi nhánh nào</option>
//               )}
//             </select>
//           </div>

//           {/* Suất chiếu */}
//           {selectedBranch && filteredShowtimes.length > 0 ? (
//             <div className="space-y-4">
//               {filteredShowtimes.map((showtime) => (
//                 <div key={showtime.id} className="border p-4 rounded-lg shadow-md">
//                   <p className="text-lg font-medium mb-2">{showtime.date} - {showtime.branch}</p>
//                   <p className="text-gray-600 mb-4">Phòng chiếu: {showtime.theater}</p>
//                   <div className="flex space-x-4">
//                     {showtime.times && Array.isArray(showtime.times) && showtime.times.length > 0 ? (
//                       showtime.times.map((time, index) => (
//                         <button
//                           key={index}
//                           onClick={() => handleShowtimeSelection(showtime, time)}
//                           className={`py-2 px-4 rounded-md border font-medium 
//                             ${selectedShowtime?.time === time ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
//                         >
//                           {time}
//                         </button>
//                       ))
//                     ) : (
//                       <p className="text-gray-600">Không có thời gian chiếu cho suất này.</p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : selectedBranch ? (
//             <p className="text-gray-600">Không có suất chiếu nào tại chi nhánh này.</p>
//           ) : null}
//         </div>
//       )}

//       {/* Nút đặt vé */}
//       <div className="mt-8">
//         <button
//           onClick={handleBookingRedirect}
//           className="w-full py-3 bg-green-500 text-white font-semibold text-xl rounded-lg hover:bg-green-600 transition-all"
//         >
//           Xác nhận suất chiếu và đặt vé
//         </button>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const MovieDetail = () => {
  const location = useLocation();
  const { movie } = location.state || {};
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const navigate = useNavigate();

  const handleShowtimeSelection = (showtime) => {
    setSelectedShowtime(showtime);
  };

  const handleBookingRedirect = () => {
    if (selectedShowtime) {
      navigate(`/booking/${movie.MaP}`, { state: { showtime: selectedShowtime } });
    } else {
      alert('Vui lòng chọn một suất chiếu!');
    }
  };

  // Kiểm tra xem movie có tồn tại và có showtimes không
  // if (!movie || !movie.showtimes) {
  //   return <p className="text-center text-red-600">Không tìm thấy thông tin phim!</p>;
  // }

  // Nhóm suất chiếu theo chi nhánh
  const groupedShowtimes = {}
  // const groupedShowtimes = movie.showtimes.reduce((acc, showtime) => {
  //   acc[showtime.branch] = acc[showtime.branch] || [];
  //   acc[showtime.branch].push(showtime);
  //   return acc;
  // }, {});

  return (
    <div className="container mx-auto p-24 ">
      <div className="flex flex-col md:flex-row justify-center items-center bg-white rounded-lg shadow-lg p-6 space-y-6 md:space-y-0 md:space-x-8 border border-gray-100 bg-gray-200">
        <div className="md:w-1/2 flex justify-center">
          <img src={movie.Poster} alt={movie.Ten} className="rounded-lg shadow-lg max-w-md object-cover " />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-red-600 mb-2">{movie.Ten}</h2>
          <p className="text-gray-900"><strong>Giới hạn tuổi:</strong> {movie.GioiHanDoTuoi}+</p>
          <p className="text-gray-900"><strong>Thời gian:</strong> {movie.ThoiLuong} phút</p>
          <p className="text-gray-900"><strong>Thể loại:</strong> {movie.genre}</p>
          <p className="text-gray-900"><strong>Mô tả:</strong> {movie.MoTa}</p>
          <p className="text-gray-900"><strong>Đạo diễn:</strong> {movie.director}</p>
          <p className="text-gray-900"><strong>Diễn viên:</strong> {movie.actors}</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6 bg-gray-200">
        <h3 className="text-2xl font-semibold text-red-600 mb-4"><strong>Chọn suất chiếu</strong></h3>
        {Object.keys(groupedShowtimes).length > 0 ? (
          Object.keys(groupedShowtimes).map((branch) => (
            <div key={branch} className="mb-6">
              <h4 className="text-xl font-semibold text-gray-700 mb-2">{branch}</h4>
              <div className="space-y-2">
                {groupedShowtimes[branch].map((showtime, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleShowtimeSelection(showtime)} 
                    className={`w-full text-left p-4 border rounded-lg transition duration-200 
                      ${selectedShowtime === showtime ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800 hover:border-yellow-400 border-2'}`}
                  >
                    {showtime.date} - {showtime.time}
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