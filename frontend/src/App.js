import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Booking from "./pages/Booking/booking";
import MovieDetails from "./pages/MovieDetails/movieDetail";
import Ticket from "./pages/Ticket/info_ticket";// Chỉnh sửa đường dẫn import cho Tickets
import MoviebyBranchs from "./pages/MoviesByBranch/movies";// Chỉnh sửa tên import cho MoviesByBranch
import Search from "./pages/Search/search";
import Crud from "./pages/Crud/crud";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/ticket/:id" element={<Ticket />} />
          <Route path="/moviesbybranch/:branchId" element={<MoviebyBranchs />} />
          <Route path="/crud-phim" element={<Crud />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;