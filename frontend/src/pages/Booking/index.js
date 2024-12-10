import React from 'react';
import HomeMenu from '../Home/HomeMenu'; // Thanh menu
import Footer from '../Home/Footer'; // Footer
import Selection from './seatSelection';
const Booking = () => {
  return (
    <div className="flex flex-col min-h-screen bg-brown-100">
      {/* Header */}
      <header>
        <HomeMenu />
      </header>
      {/* Nội dung chính */}
      <main className="flex-grow">
        <Selection />
      </main>
      {/* Footer */}
      <footer>
        <Footer />
      </footer>
      {/* Lót dưới cùng của trang */}
      <div className="bg-brown-500 text-center text-sm text-gray-400 p-4 font-bold">
        &copy; 2024 Công ty Phim ABC. All rights reserved.
      </div>
    </div>
  );
};

export default Booking;
