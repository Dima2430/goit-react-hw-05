// components/MovieReviews/MovieReviews.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=b2673ec2fc71df39b8b32567df19b6fa`
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();

    return () => {
      // Cleanup
    };
  }, [movieId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.content}</p>
              <p>Author: {review.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
