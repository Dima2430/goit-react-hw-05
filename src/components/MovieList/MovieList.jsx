import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
import { useState } from "react";
import { useRef } from "react";

const MovieList = ({ loading, error, movies }) => {
  const location = useLocation();
  const [newImg, setNewImg] = useState(null);
  const [scrollPos, setScrollPos] = useState(0);
  const listRef = useRef(null);

  const scrollImagesRight = () => {
    const maxScrollPos = Math.max(0, (movies.length - 1) * 150 - 700);
    if (scrollPos < maxScrollPos) {
      setScrollPos((prevScrollPos) => {
        const newPos = prevScrollPos + 700;
        return newPos > maxScrollPos ? maxScrollPos : newPos;
      });
    }
  };

  const scrollImagesLeft = () => {
    if (scrollPos > 0) {
      setScrollPos((prevScrollPos) => prevScrollPos - 700);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={css.container}>
      {movies.length > 0 ? (
        <ul
          ref={listRef}
          className={css.list}
          style={{ transform: `translateX(-${scrollPos}px)` }}
        >
          {movies.map((movie) => (
            <Link
              to={{
                pathname: `/movies/${movie.id}`,
                state: { from: location.pathname },
              }}
              key={movie.id}
            >
              <li
                className={newImg === movie.id ? css.focusItem : css.listItem}
                onMouseEnter={() => setNewImg(movie.id)}
                onMouseLeave={() => setNewImg(null)}
              >
                <img
                  className={newImg === movie.id ? css.focusImg : css.img}
                  src={`https://image.tmdb.org/t/p/w300${
                    newImg === movie.id
                      ? movie.backdrop_path
                      : movie.poster_path
                  }`}
                  width="150"
                  alt={movie.title}
                />
                {newImg === movie.id && (
                  <>
                    <p className={css.title}>
                      {movie.title} • {movie.release_date}
                    </p>
                  </>
                )}
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No movies found.</p>
      )}
      {movies.length > 0 && (
        <>
          <button
            className={css.btnLeft}
            onClick={scrollImagesLeft}
            disabled={scrollPos === 0}
          >
            ←
          </button>
          <button
            className={css.btnRight}
            onClick={scrollImagesRight}
            disabled={scrollPos >= Math.max(0, (movies.length - 1) * 150 - 700)}
          >
            →
          </button>
        </>
      )}
    </div>
  );
};

export default MovieList;
