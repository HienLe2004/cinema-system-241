import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movies from "../Home/movieData"; // Nhập dữ liệu phim từ file đã tạo

const MoviesByBranch = () => {
  const { branchId } = useParams(); // Lấy branchId từ URL
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    // Lọc phim theo branchId
    const moviesInBranch = movies.filter(movie =>
      movie.showtimes.some(showtime => showtime.branch === branchId) // Kiểm tra branch khớp
    );
    setFilteredMovies(moviesInBranch);
  }, [branchId]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách phim tại chi nhánh {branchId}</h2>
      {filteredMovies.length > 0 ? (
        <ul>
          {filteredMovies.map(movie => (
            <li key={movie.id} className="mb-4">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p><strong>Thể loại:</strong> {movie.genre}</p>
              <p><strong>Đạo diễn:</strong> {movie.director}</p>
              <p><strong>Diễn viên:</strong> {movie.actors}</p>
              <img src={movie.poster} alt={movie.title} className="w-32 h-48 object-cover" />
              <h4 className="font-bold">Thời gian chiếu:</h4>
              <ul>
                {movie.showtimes
                  .filter(showtime => showtime.branch === branchId) // Lọc showtimes theo branchId
                  .map((showtime, index) => (
                    <li key={index}>
                      {showtime.date} - {showtime.time} tại {showtime.theater}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-600">Không có phim nào đang chiếu tại rạp này!</p>
      )}
    </div>
  );
};

export default MoviesByBranch;