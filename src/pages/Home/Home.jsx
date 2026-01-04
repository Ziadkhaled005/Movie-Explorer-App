import { useState, useEffect } from "react";
import { movieAPI } from "../../services/api";
import MovieCard from "../../components/MovieCard/MovieCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import TestAPI from "../../components/TestAPI/TestAPI";
import useFavorites from "../../hooks/useFavorites";
import "./Home.css";

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("trending");
    const { toggleFavorite, isFavorite } = useFavorites();
    const [apiDebug, setApiDebug] = useState("");

    useEffect(() => {
        fetchMovies();
    }, [activeTab]);

    const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        setApiDebug("Fetching...");
        try {
            let response;
            let apiCall;

            switch (activeTab) {
                case "trending":
                    apiCall = movieAPI.getTrending();
                    break;
                case "popular":
                    apiCall = movieAPI.getPopular();
                    break;
                case "top-rated":
                    apiCall = movieAPI.getTopRated();
                    break;
                default:
                    apiCall = movieAPI.getTrending();
            }

            console.log("Making API call...");
            response = await apiCall;
            console.log("API Response received:", response);

            // Check if response is HTML (which indicates an error)
            if (
                typeof response.data === "string" &&
                response.data.includes("<!doctype html>")
            ) {
                throw new Error(
                    "Received HTML instead of JSON. Check API configuration."
                );
            }

            const moviesData = response?.data?.results || [];
            setMovies(moviesData);
            setApiDebug(`Success: Got ${moviesData.length} movies`);
        } catch (error) {
            console.error("Error fetching movies:", error);
            console.error("Error details:", error.response || error.message);
            setError(`Failed to load movies: ${error.message}`);
            setMovies([]);
            setApiDebug(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query) => {
        if (!query.trim()) {
            setSearchQuery("");
            setActiveTab("trending");
            return;
        }

        setSearchQuery(query);
        setLoading(true);
        setError(null);
        try {
            const response = await movieAPI.searchMovies(query);
            const moviesData = response?.data?.results || [];
            setMovies(moviesData);
            setActiveTab("search");
        } catch (error) {
            console.error("Error searching movies:", error);
            setError("Failed to search movies. Please try again.");
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setSearchQuery("");
        setError(null);
    };

    return (
        <div className="home">
            <div className="container">
                <h1 className="page-title">Discover Movies</h1>

                {/* Add TestAPI component for debugging */}
                {/* <TestAPI /> */}

                {/* <div className="debug-info">
                    <p>Active Tab: {activeTab}</p>
                    <p>API Debug: {apiDebug}</p>
                    <p>Movies Count: {movies.length}</p>
                </div> */}

                <SearchBar onSearch={handleSearch} />

                <div className="tabs">
                    <button
                        className={`tab ${
                            activeTab === "trending" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("trending")}>
                        Trending
                    </button>
                    <button
                        className={`tab ${
                            activeTab === "popular" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("popular")}>
                        Popular
                    </button>
                    <button
                        className={`tab ${
                            activeTab === "top-rated" ? "active" : ""
                        }`}
                        onClick={() => handleTabClick("top-rated")}>
                        Top Rated
                    </button>
                </div>

                {searchQuery && activeTab === "search" && (
                    <div className="search-results-header">
                        <h2>Search Results for "{searchQuery}"</h2>
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                        <button
                            onClick={fetchMovies}
                            className="retry-button">
                            Retry
                        </button>
                    </div>
                )}

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {!movies || movies.length === 0 ? (
                            <div className="no-results">
                                <p>
                                    No movies found.{" "}
                                    {searchQuery
                                        ? "Try a different search."
                                        : "Please try again."}
                                </p>
                            </div>
                        ) : (
                            <div className="movies-grid">
                                {movies.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        isFavorite={isFavorite(movie.id)}
                                        onToggleFavorite={toggleFavorite}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
