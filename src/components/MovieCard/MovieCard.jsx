import { Link } from "react-router-dom";
import { IMAGE_BASE_URL, IMAGE_SIZES } from "../../utils/constants";
import "./MovieCard.css";

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
    const posterUrl = movie.poster_path
        ? `${IMAGE_BASE_URL}/${IMAGE_SIZES.small}${movie.poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Image";

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleFavorite(movie);
    };

    return (
        <Link
            to={`/movie/${movie.id}`}
            className="movie-card">
            <div className="movie-card-inner">
                <div className="movie-poster">
                    <img
                        src={posterUrl}
                        alt={movie.title}
                    />
                    <button
                        className={`favorite-button ${
                            isFavorite ? "active" : ""
                        }`}
                        onClick={handleFavoriteClick}
                        aria-label={
                            isFavorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                        }>
                        {isFavorite ? "❤️" : "🤍"}
                    </button>
                    <div className="movie-rating">
                        ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                    </div>
                </div>
                <div className="movie-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="movie-release">
                        {new Date(movie.release_date).getFullYear() || "N/A"}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
