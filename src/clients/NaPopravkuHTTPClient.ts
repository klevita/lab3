import axios, { AxiosResponse } from "axios"
import store from "@/store";

export async function proccesRequest(func: Promise<AxiosResponse<any, any>>) {
    try {
        let resp = await func
        return resp.data
    } catch (err: any) {
        return err.response
    }
}

const instance = axios.create({
    baseURL: 'http://45.131.41.20/api/v1/'
});
instance.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${store.state.user.token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance