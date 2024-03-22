import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

class HTTPClient {
    private baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    private async request<T>(method: string, endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.request({
                method,
                url: `${this.baseURL}${endpoint}`,
                ...config
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message);
        }
    }

    get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('GET', endpoint, config);
    }

    post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('POST', endpoint, { data, ...config });
    }

    put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('PUT', endpoint, { data, ...config });
    }

    delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('DELETE', endpoint, config);
    }
}

export default HTTPClient;
