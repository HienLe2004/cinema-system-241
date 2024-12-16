import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from './api/usercontext'; // Nhập UserProvider
import Home from "./pages/Home/Home";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Booking from "./pages/Booking/booking";
import MovieDetails from "./pages/MovieDetails/movieDetail";
import Ticket from "./pages/Ticket/info_ticket";// Chỉnh sửa đường dẫn import cho Tickets
import MoviebyBranchs from "./pages/MoviesByBranch/movies";// Chỉnh sửa tên import cho MoviesByBranch
import Search from "./pages/Search/search";
import Crud_Movie from "./pages/Crud/movie";
import Crud_Show_Time from "./pages/Crud/showTime";
import Navigation from "./pages/Navigation/navigation";
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/ticket/:id" element={<Ticket />} />
          <Route path="/moviesbybranch/:branchId" element={<MoviebyBranchs />} />
          <Route path="/crud-phim" element={<Crud_Movie />} />
          <Route path="/crud-show-time" element={<Crud_Show_Time />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;