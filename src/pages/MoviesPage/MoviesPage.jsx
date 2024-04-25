import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const query = searchParams.get("query") || "";
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

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
  }, [searchParams]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    if (query.trim() === "") {
      toast.error("Please, enter text to search for images");
      return;
    }
    setSearchParams({ query });
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
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            defaultValue={searchParams.get("query") || ""}
          />
          <button type="submit">Search</button>
          <Toaster />
        </form>
      </header>
      {loading ? (
        <Loader />
      ) : (
        <>
          {searchParams.get("query") && (
            <MovieList movies={movies} error={error} />
          )}
        </>
      )}
    </>
  );
}
