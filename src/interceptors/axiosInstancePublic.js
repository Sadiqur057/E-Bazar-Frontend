import axios from "axios";
import { deleteCookie } from "cookies-next";

const apiPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiPublic.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      deleteCookie("ebazar");
    }
    return Promise.reject(error);
  }
);

export default apiPublic;
