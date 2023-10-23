import axios, { AxiosRequestConfig } from "axios";

interface FilterModel {
  page: number,
  limit: number,
  [key: string]: string | number,
}

// const axiosInstance = axios.create({
//   baseURL: "https://api.kinopoisk.dev",
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//     "X-API-KEY": apiKey,
//   }
// });

const apiKey = import.meta.env.VITE_API_KEY;

class FilmServices {
  getFilmsByText(filter: FilterModel, opts?: AxiosRequestConfig) {
    return axios.get(`https://api.kinopoisk.dev/v1.2/movie/search?page=${filter.page}&limit=${filter.limit}&query=${filter.text}`, {
      ...opts,
      headers: {
        "X-API-KEY": apiKey,
      }
    });
  }

  getFilmById(id: string, opts?: AxiosRequestConfig) {
    return axios.get(`https://api.kinopoisk.dev/v1.3/movie/${id}`, {
      ...opts,
      headers: {
        "X-API-KEY": apiKey,
      }
    });
  }
}

const instance = new FilmServices();
export {instance as FilmService};