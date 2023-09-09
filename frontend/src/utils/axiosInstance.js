import axios  from "axios";
const API_SERVER = process.env.REACT_APP_API_SERVER;

const instance = axios.create({
    baseURL: `${API_SERVER}`, // The base URL for your API
    timeout: 10000, // Request timeout in milliseconds
    withCredentials: true, // Include credentials in cross-origin requests
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;