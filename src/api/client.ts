import axios from 'axios';

export const BACKEND_URL = 'https://shift-backend.onrender.com';

export const axiosClient = axios.create({
	baseURL: BACKEND_URL,
});
