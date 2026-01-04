import { API_KEY, BASE_URL } from "./constants";

console.log("Testing API Configuration:");
console.log("API Key exists:", !!API_KEY);
console.log("API Key length:", API_KEY?.length);
console.log("API Key starts with:", API_KEY?.substring(0, 10) + "...");
console.log("Base URL:", BASE_URL);
