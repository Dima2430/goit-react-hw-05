import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=b2673ec2fc71df39b8b32567df19b6fa`
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchCast();

    return () => {
      // Cleanup
    };
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      <ul className={css.actorList}>
        {cast.map((actor) => (
          <li className={css.actorContainer} key={actor.id}>
            {actor.profile_path ? null : (
              <p className={css.noImageText}>There is no image available</p>
            )}
            <img
              className={css.img}
              width={150}
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt=""
            />
            {actor.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
