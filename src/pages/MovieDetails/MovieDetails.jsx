import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieAPI } from "../../services/api";
import { IMAGE_BASE_URL, IMAGE_SIZES } from "../../utils/constants";
import Loader from "../../components/Loader/Loader";
import useFavorites from "../../hooks/useFavorites";
import "./MovieDetails.css";

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trailerKey, setTrailerKey] = useState(null);
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    const fetchMovieDetails = async () => {
        setLoading(true);
        try {
            const response = await movieAPI.getMovieDetails(id);
            setMovie(response.data);

            // Find trailer
            const trailer = response.data.videos?.results?.find(
                (video) => video.type === "Trailer" && video.site === "YouTube"
            );
            if (trailer) {
                setTrailerKey(trailer.key);
            }
        } catch (error) {
            console.error("Error fetching movie details:", error);
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;
    if (!movie) return null;

    const backdropUrl = movie.backdrop_path
        ? `${IMAGE_BASE_URL}/${IMAGE_SIZES.large}${movie.backdrop_path}`
        : "https://via.placeholder.com/1280x720?text=No+Image";

    const posterUrl = movie.poster_path
        ? `${IMAGE_BASE_URL}/${IMAGE_SIZES.medium}${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

    return (
        <div className="movie-details">
            <div
                className="movie-backdrop"
                style={{ backgroundImage: `url(${backdropUrl})` }}>
                <div className="backdrop-overlay"></div>
            </div>

            <div className="container">
                <div className="movie-content">
                    <div className="movie-poster-section">
                        <img
                            src={posterUrl}
                            alt={movie.title}
                            className="movie-poster-large"
                        />
                        <button
                            className={`favorite-button-large ${
                                isFavorite(movie.id) ? "active" : ""
                            }`}
                            onClick={() => toggleFavorite(movie)}>
                            {isFavorite(movie.id)
                                ? "❤️ Remove from Favorites"
                                : "🤍 Add to Favorites"}
                        </button>
                    </div>

                    <div className="movie-info-section">
                        <h1 className="movie-title">{movie.title}</h1>

                        <div className="movie-meta">
                            <span className="movie-rating-large">
                                ⭐ {movie.vote_average?.toFixed(1)}/10
                            </span>
                            <span className="movie-year">
                                📅 {new Date(movie.release_date).getFullYear()}
                            </span>
                            <span className="movie-runtime">
                                ⏱️ {movie.runtime} min
                            </span>
                        </div>

                        <div className="movie-genres">
                            {movie.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="genre-tag">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div className="movie-overview">
                            <h2>Overview</h2>
                            <p>{movie.overview}</p>
                        </div>

                        {trailerKey && (
                            <div className="movie-trailer">
                                <h2>Trailer</h2>
                                <div className="trailer-container">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${trailerKey}`}
                                        title={`${movie.title} Trailer`}
                                        frameBorder="0"
                                        allowFullScreen></iframe>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
