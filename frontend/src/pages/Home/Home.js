import React from 'react';
import { useLocation } from 'react-router-dom';
import HomeMenu from './HomeMenu'; // Thanh menu
import MovieList from './MovieList'; // Danh sách phim
import Footer from './Footer'; // Footer

const Home = () => {
  const location = useLocation();
  const isAdmin = location.state?.isAdmin || false; // Nhận isAdmin từ state

  return (
    <div className="flex flex-col min-h-screen bg-brown-100">
      <header>
        <HomeMenu isAdmin={isAdmin} /> {/* Truyền isAdmin vào HomeMenu */}
      </header>
      <main className="flex-grow">
        <MovieList />
      </main>
      <footer>
        <Footer />
      </footer>
      <div className="bg-brown-500 text-center text-sm text-gray-400 p-4 font-bold">
        &copy; 2024 ASSIGNMENT2 - 241 - DATABASE.
      </div>
    </div>
  );
};
export default Home;