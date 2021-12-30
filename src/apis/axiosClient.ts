import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import queryString from 'query-string';
const axiosClient = axios.create({
    baseURL: 'http://18.139.217.68:3005',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
    (config: any) => {
        // const remembered = localStorage.getItem('remembered');
        const token = localStorage.getItem('token');
        // else token = sessionStorage.getItem('token');
        if (token) config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    (err) => {
        console.log(err.response);
        return Promise.reject(err);
    }
);
axiosClient.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res && res.data) return res.data;
        return res;
    },
    (err) => {
        console.log(err.response);
        if (err.response && err.response.data) return err.response.data;
        return Promise.reject(err);
    }
);

export default axiosClient;
