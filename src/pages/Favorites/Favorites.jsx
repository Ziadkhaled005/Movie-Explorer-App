import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import useFavorites from "../../hooks/useFavorites";
import "./Favorites.css";

const Favorites = () => {
    const { favorites, toggleFavorite, isFavorite } = useFavorites();
    const [localFavorites, setLocalFavorites] = useState([]);

    useEffect(() => {
        setLocalFavorites(favorites);
    }, [favorites]);

    if (localFavorites.length === 0) {
        return (
            <div className="favorites">
                <div className="container">
                    <h1 className="page-title">My Favorites</h1>
                    <div className="no-favorites">
                        <p>You haven't added any movies to favorites yet.</p>
                        <p>
                            Browse movies and click the heart icon to add them
                            here!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites">
            <div className="container">
                <h1 className="page-title">
                    My Favorites ({localFavorites.length})
                </h1>

                <div className="movies-grid">
                    {localFavorites.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isFavorite={isFavorite(movie.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Favorites;
