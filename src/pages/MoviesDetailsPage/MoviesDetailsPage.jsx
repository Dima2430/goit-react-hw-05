import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import css from "./MoviesDetailsPage.module.css";
const MovieDetailsPage = () => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { movieId } = useParams();
  const location = useLocation();
  const goBackPath = location.state ? location.state.pathname : "/movies";
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjY3M2VjMmZjNzFkZjM5YjhiMzI1NjdkZjE5YjZmYSIsInN1YiI6IjY2MWQyYzEzY2I2ZGI1MDE2MjA5NTE2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.q05H961gS_ywJC0_FNkMA5olb2VoMVIDlpDzDEJ73nA",
      },
    };

    const fetchData = async () => {
      try {
        const res = await axios(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );
        setResponse(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div>
      <Link to={goBackPath}>Go back</Link>
      <br />
      <Suspense fallback={<div>Loading...</div>}>
        {isLoading ? <Loader /> : null}
        {response.length === 0 ? (
          <p>Error...</p>
        ) : (
          <div className={css.flexContainer}>
            <div>
              <h2>Movie Details</h2>
              {response.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${response.poster_path}`}
                  alt=""
                />
              ) : (
                <p>There is no image available</p>
              )}
            </div>

            <div className={css.movieDetails}>
              <h3>{response.title}</h3>
              <p>User Score: {response.vote_average}</p>
              <p>{response.overview}</p>
              <p>
                Genres:{" "}
                {response.genres &&
                  response.genres.map((genre) => genre.name).join(", ")}
              </p>
              <Link
                className={css.link}
                to={`/movies/${movieId}/cast`}
                state={location}
              >
                Cast
              </Link>

              <Link to={`/movies/${movieId}/reviews`} state={location}>
                Reviews
              </Link>
            </div>
          </div>
        )}

        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
