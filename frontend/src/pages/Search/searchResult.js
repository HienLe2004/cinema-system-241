import { getAllPhim } from "../../api/phim.api"; // Giả sử đây là API lấy tất cả phim
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "antd"; // Nút thông tin phim

const SearchResults = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);
  const query = searchQuery.get("query")?.trim();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getAllPhim(); // Gọi API để lấy tất cả phim
        const moviesData = response?.data?.data?.[0]; // Dữ liệu lấy được từ API
        // Lọc phim theo tiêu chí tìm kiếm
        const filteredMovies = moviesData?.filter((movie) =>
          movie.Ten.toLowerCase().includes(query.toLowerCase())
        );

        setMovies(filteredMovies);
      } catch (err) {
        setError("Không thể tải danh sách phim. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchMovies();
    }
  }, [query]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error)
    return <div className="text-center text-xl text-red-600">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Kết quả tìm kiếm cho: "
        <span className="font-bold text-blue-500">{query}</span>"
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie?.MaP}
              className="relative group overflow-hidden rounded-lg shadow-lg bg-Lime-100 transition-transform duration-300 transform hover:scale-102"
            >
              <a
                href={`./info.html?id=${movie?.MaP}`}
                className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-blue-300"
              >
                <img
                  src={movie?.Poster}
                  alt={movie?.Ten}
                  className="pt-6 w-full h-72 object-contain  transition-transform duration-300 transform group-hover:scale-105"
                  style={{ objectPosition: "center" }}
                />
                <div className="mt-3 pb-4 rounded-b-lg">
                  <p className="text-center font-bold text-xl text-brown-900 truncate">
                    {movie?.Ten}
                  </p>
                </div>
              </a>

              {/* Overlay (Hiện nút khi hover) */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link to={`/movie/${movie?.MaP}`} state={{ movie }}>
                  <Button
                    type="primary"
                    className="rounded-2 px-6 py-2 text-lg font-semibold transform transition-transform duration-300 hover:scale-105"
                  >
                    Thông tin phim
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-xl text-gray-600">
            Không tìm thấy phim nào.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
