import { useState, useEffect, useCallback } from "react";

const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("movieFavorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const saveFavorites = useCallback((newFavorites) => {
        localStorage.setItem("movieFavorites", JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    }, []);

    const toggleFavorite = useCallback(
        (movie) => {
            const isAlreadyFavorite = favorites.some(
                (fav) => fav.id === movie.id
            );

            let newFavorites;
            if (isAlreadyFavorite) {
                newFavorites = favorites.filter((fav) => fav.id !== movie.id);
            } else {
                newFavorites = [...favorites, movie];
            }

            saveFavorites(newFavorites);
        },
        [favorites, saveFavorites]
    );

    const isFavorite = useCallback(
        (movieId) => {
            return favorites.some((fav) => fav.id === movieId);
        },
        [favorites]
    );

    return {
        favorites,
        toggleFavorite,
        isFavorite,
    };
};

export default useFavorites;
