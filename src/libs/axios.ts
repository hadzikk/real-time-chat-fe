import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://real-time-chat-be.vercel.app/api', // later please use vite env
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default axiosInstance