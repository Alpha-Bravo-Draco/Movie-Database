import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/base.css";
import "./css/navbar.css";
import "./css/home.css";
import "./css/movieCard.css";
import Home from "./pages/Home";
import Favorites from "./pages/favorites";
import Navbar from "./components/navbar";
import MovieDetails from "./pages/movieDetails";
import { MovieProvider } from "./context/movieContext";

function App() {
  return (
    <MovieProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/movie/:id" element={<MovieDetails />}></Route>
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
