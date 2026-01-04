import axios from "axios";

// Hardcode the values for now
const API_KEY = "7d4cd378bd0c2009e6722d7942ae7a31"; // This is a fake key - replace with your real one
const BASE_URL = "https://api.themoviedb.org/3";

console.log("Using hardcoded API configuration");
console.log("API Key present:", !!API_KEY);

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        console.log(`Making request to: ${config.baseURL}${config.url}`);

        // Add API key to all requests
        config.params = {
            ...config.params,
            api_key: API_KEY,
            language: "en-US",
        };

        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response) => {
        console.log(`Response received from: ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error("Response error:", {
            message: error.message,
            status: error.response?.status,
            url: error.config?.url,
        });
        return Promise.reject(error);
    }
);

export const movieAPI = {
    getTrending: (timeWindow = "day") =>
        api.get(`/trending/movie/${timeWindow}`),

    getPopular: (page = 1) => api.get("/movie/popular", { params: { page } }),

    getTopRated: (page = 1) =>
        api.get("/movie/top_rated", { params: { page } }),

    searchMovies: (query, page = 1) =>
        api.get("/search/movie", { params: { query, page } }),

    getMovieDetails: (movieId) =>
        api.get(`/movie/${movieId}`, {
            params: { append_to_response: "videos,credits" },
        }),
};
