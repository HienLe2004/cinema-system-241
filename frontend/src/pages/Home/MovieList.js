import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import movies from "./movieData"; // Nhập dữ liệu phim từ file moviesData.js
import { getAllPhim } from "../../api/phim.api";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [currnentIndex, setCurrentIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);

  // // Hàm chọn ngẫu nhiên 3 phim
  // const getRandomMovies = () => {
  //   const shuffled = [...movies].sort(() => Math.random() - 0.5);
  //   return shuffled.slice(0, 3);
  // };

  // // Cập nhật danh sách phim ngẫu nhiên ban đầu
  // useEffect(() => {
  //   setCurrentMovies(getRandomMovies());
  // }, []);

  // Tự động chuyển phim sau 3 giây nếu không bị dừng
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [isPaused]);

  // // Hàm chuyển phim sang trái
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex == 0 ? movies.length - 1 : prevIndex - 1));
  };

  // // Hàm chuyển phim sang phải
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex == movies.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(()=>{
    const fetchMovieList = async () => {
      const {data} = await getAllPhim();
      setMovies(data.data[0]);
      setCurrentIndex(0);
    }
    fetchMovieList()
  },[])
  useEffect(()=>{
    let newCurrentMovies = []
    for (let i = 0; i < 3; i++) {
      newCurrentMovies.push(movies[(i + currnentIndex) % movies.length])
    }
    setCurrentMovies(newCurrentMovies)
  },[currnentIndex])
  return (
    <div className="py-10 px-4 ">
      <h2 className="m-auto w-7/12 text-2xl font-bold text-center mb-6 p-3 bg-gray-100  border-gray-950 rounded-xl">Danh sách phim</h2>
      <div className="relative">
        {/* Nút mũi tên trái */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        >
          <LeftOutlined />
        </button>

        {/* Các tấm hình phim */}
        <div className="flex justify-center space-x-4 max-w-screen-xl mx-auto">
          {currentMovies.map((movie) => (
            <div
              key={movie?.MaP}
              className="relative group overflow-hidden rounded-lg shadow-lg bg-white"
              onMouseEnter={() => setIsPaused(true)} // Dừng tua khi di chuột vào
              onMouseLeave={() => setIsPaused(false)} // Tiếp tục tua khi rời chuột
            >
              {/* Poster */}
              <img
                src={movie?.Poster}
                alt={movie?.Ten}
                className="w-64 h-96 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Overlay (Hiện nút khi hover) */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="space-x-4">
                  <Link to={`/movie/${movie?.MaP}`} state={{ movie }}>
                    <Button type="primary">Thông tin phim</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút mũi tên phải */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
};

export default MovieList;