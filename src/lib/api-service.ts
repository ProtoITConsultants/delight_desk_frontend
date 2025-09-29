// lib/api-service.ts
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

class ApiService {
  private api;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    });

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.log("error", error);

        // if (error.response?.status === 401) {
        //   if (typeof window !== "undefined") {
        //     window.location.href = "/login";
        //   }
        // }
        // Create a custom error with message
        const message =
          (error.response?.data as { message: string })?.message ||
          "Something went wrong";

        return Promise.reject(new Error(message));
      }
    );
  }

  // Generic request handler so you don’t write try/catch
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.request(config);
    return response.data;
  }

  // Shorthand methods
  public get<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ url, method: "GET", ...config });
  }

  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>({ url, method: "POST", data, ...config });
  }

  public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.request<T>({ url, method: "PUT", data, ...config });
  }

  public delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>({ url, method: "DELETE", ...config });
  }
}

export const apiService = new ApiService();
