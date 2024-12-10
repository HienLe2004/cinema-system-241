import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import MovieDetails from "./pages/MovieDetails";
import Tickets from "./pages/Ticket"; // Chỉnh sửa đường dẫn import cho Tickets
import MoviesByBranch from "./pages/MoviesByBranch"; // Chỉnh sửa tên import cho MoviesByBranch

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
          <Route path="/ticket/:id" element={<Tickets />} />
          <Route path="/moviesbybranch/:branchId" element={<MoviesByBranch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;