import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/api", // Change to your API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to include Authorization token if available
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;