import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../services/api";
import "../css/movieDetails.css";

function MovieDetails() {
  const { id } = useParams(); // movie id from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading">Loading movie details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  const {
    title,
    release_date,
    runtime,
    overview,
    poster_path,
    vote_average,
    genres,
  } = movie;

  return (
    <div className="movie-details">
      <div className="movie-header">
        <h1>{title}</h1>
        {vote_average && (
          <span className="rating">★ {vote_average.toFixed(1)}/10</span>
        )}
      </div>

      <div className="movie-content">
        <div className="movie-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/500x750?text=No+Image+Available";
            }}
          />
        </div>

        <div className="movie-info">
          {genres && genres.length > 0 && (
            <div className="genres">
              {genres.map((g) => (
                <span key={g.id}>{g.name}</span>
              ))}
            </div>
          )}
          <p>
            <strong>Release Date:</strong> {release_date || "Not available"}
          </p>
          <p>
            <strong>Runtime:</strong>{" "}
            {runtime ? `${runtime} min` : "Not available"}
          </p>
          <p className="overview">
            <strong>Overview</strong>
            <br />
            {overview || "No overview available"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
