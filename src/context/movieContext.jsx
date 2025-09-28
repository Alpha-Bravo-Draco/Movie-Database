import { createContext, useContext, useEffect, useState } from "react";

// Shape of a movie expected: { id: number|string, title: string, ... }

// export const MovieContext = createContext({
//   favorites: [],
//   addToFavorites: () => {},
//   removeFromFavorites: () => {},
//   toggleFavorite: () => {},
//   isFavorite: () => false,
// });

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

export function MovieProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {
      // ignore persistence errors
    }
  }, [favorites]);

  const addToFavorites = (movie) => {
    if (!movie || movie.id == null) return;
    setFavorites((prev) => {
      const exists = prev.some((m) => String(m.id) === String(movie.id));
      if (exists) return prev;
      return [...prev, movie];
    });
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) =>
      prev.filter((m) => String(m.id) !== String(movieId))
    );
  };

  const toggleFavorite = (movie) => {
    if (!movie || movie.id == null) return;
    setFavorites((prev) => {
      const exists = prev.some((m) => String(m.id) === String(movie.id));
      if (exists) {
        return prev.filter((m) => String(m.id) !== String(movie.id));
      }
      return [...prev, movie];
    });
  };

  const isFavorite = (movieId) => {
    return favorites.some((m) => String(m.id) === String(movieId));
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

export function useMovie() {
  return useContext(MovieContext);
}
