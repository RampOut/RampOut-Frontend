import axios from "axios";

export default axios.create({
    baseURL: 'https://rampout-backend.onrender.com',
    headers: {"Content-Type": "application/json"},
});