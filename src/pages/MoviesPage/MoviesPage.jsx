import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;

        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjY3M2VjMmZjNzFkZjM5YjhiMzI1NjdkZjE5YjZmYSIsInN1YiI6IjY2MWQyYzEzY2I2ZGI1MDE2MjA5NTE2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q05H961gS_ywJC0_FNkMA5olb2VoMVIDlpDzDEJ73nA",
          },
        };

        const response = await axios.get(url, options);
        setMovies(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("Please, enter text to search for images");
      return;
    }
    setSearchQuery(query);
    setQuery("");
  };

  return (
    <>
      <header
        style={{
          position: "absolute",
          top: "10px",
          left: "250px",
        }}
      >
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
          <Toaster />
        </form>
      </header>
      {loading ? (
        <Loader />
      ) : (
        <>{searchQuery && <MovieList movies={movies} error={error} />}</>
      )}
    </>
  );
}
