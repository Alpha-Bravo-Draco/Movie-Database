import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/movieContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const navigate = useNavigate();

  const onfavoriteclicked = (e) => {
    e.stopPropagation(); // prevent triggering card click
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const goToDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  const title = movie?.title || "Untitled";
  const releaseDate = movie?.release_date || "Unknown";

  return (
    <div className="movie-card" onClick={goToDetails}>
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn${favorite ? " active" : ""}`}
            onClick={onfavoriteclicked}
            title={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            {favorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{title}</h3>
        <p>{releaseDate}</p>
      </div>
    </div>
  );
}

export default MovieCard;
