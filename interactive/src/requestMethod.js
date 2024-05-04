import axios from 'axios';

const BASE_URL = "https://api-interactive.vercel.app/api/messages/";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});