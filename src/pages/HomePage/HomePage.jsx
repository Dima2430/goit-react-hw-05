import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import axios from "axios";
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url =
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

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
  }, []);

  return (
    <div>
      <h2>Popular Movies</h2>
      <MovieList movies={movies} loading={loading} error={error} />
    </div>
  );
};

export default HomePage;
