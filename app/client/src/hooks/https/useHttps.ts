import { useState, useEffect } from 'react';
import HTTPClient from '../../services/httpClient';

const REACT_APP_API_URL = "http://localhost:8000";

const client = new HTTPClient(REACT_APP_API_URL);

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type HookReturnType<T> = {
    data: T | null,
   loading: boolean,
    error: Error | null;
    execute: (data?: any) => Promise<void | T>
};

// Custom hook for making HTTP requests
const useHTTP = <T>(method: HttpMethod, endpoint: string): HookReturnType<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const execute = async (data?: any): Promise<void | T> => {
        setLoading(true);
        try {
            let response;
            switch (method) {
                case 'GET':
                    response = await client.get<T>(endpoint);
                    break;
                case 'POST':
                    response = await client.post<T>(endpoint, data);
                    break;
                case 'PUT':
                    response = await client.put<T>(endpoint, data);
                    break;
                case 'DELETE':
                    response = await client.delete<T>(endpoint, data);
                    break;
                default:
                    throw new Error(`Unsupported HTTP method: ${method}`);
            }
            setData(response);
            return response;
        } catch (error: any) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setData(null); // Reset data when endpoint changes
        setError(null); // Reset error when endpoint changes
    }, [endpoint]);

    return {data, loading, error, execute};
};

export const useGet = <T>(endpoint: string) => useHTTP<T>('GET', endpoint);
export const usePost = <T>(endpoint: string) => useHTTP<T>('POST', endpoint);
export const usePut = <T>(endpoint: string) => useHTTP<T>('PUT', endpoint);
export const useDelete = <T>(endpoint: string) => useHTTP<T>('DELETE', endpoint);