import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

const api = {
  getTasks: () => axiosInstance.get("/upload"),
  uploadTask: (taskData: FormData) => axiosInstance.post("/upload", taskData),
  deleteTask: (taskId: number) => axiosInstance.delete(`/upload/${taskId}`),
};

export default api;
