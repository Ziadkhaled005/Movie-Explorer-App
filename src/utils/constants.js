// Directly export environment variables
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
export const IMAGE_BASE_URL =
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";
export const IMAGE_SIZES = {
    small: "w300",
    medium: "w500",
    large: "w780",
    original: "original",
};

// Debug logging
console.log("Constants loaded:");
console.log("BASE_URL:", BASE_URL);
console.log("IMAGE_BASE_URL:", IMAGE_BASE_URL);
console.log("API_KEY exists:", !!API_KEY);
