import { useMovieContext } from "../context/movieContext";
import MovieCard from "../components/movieCard";
function Favorites() {
  const { favorites } = useMovieContext();
  if (favorites) {
    return (
      <div>
        <h2>Your Favorites</h2>
        <div className="movie-grid">
          {favorites.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="favorites">
          <h1>Favorites</h1>
        </div>
      </>
    );
  }
}
export default Favorites;
