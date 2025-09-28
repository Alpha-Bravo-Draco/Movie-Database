import MovieCard from "../components/movieCard";
import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPopularMovies = async () => {
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setError("");
    } catch (err) {
      setError("Failed to load movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load popular movies on component mount
  useEffect(() => {
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      loadPopularMovies();
      return;
    }

    setLoading(true);
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setError("");
    } catch (err) {
      setError("Failed to search movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      loadPopularMovies();
      return;
    }

    setLoading(true);
    try {
      const results = await searchMovies(value);
      setMovies(results);
      setError("");
    } catch (err) {
      setError("Failed to search movies");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={handleChange}
            placeholder="enter the movie name"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        {error && <p>{error}</p>}
        {loading ? (
          <div>loadingggg....</div>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </div>
        )}
      </div>
    </>
  );
}
export default Home;
