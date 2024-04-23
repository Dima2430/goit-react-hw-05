import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>
        Oops! The page you are looking for does not exist.{" "}
        <Link to="/">Go back to Home</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
