import axios from 'axios';

const URL = 'http://localhost:4000';

export class RequestService {
    static getConfig() {
        const token = localStorage.getItem('token');
        const config = { headers: { token } };
        return token ? config: null;
    }

    static get(subUrl) {
        return axios.get(`${URL}${subUrl}`, RequestService.getConfig())
        .then(res => res.data.result)
        .catch(error => { throw new Error(error.response.data.message); })
    }

    static post(subUrl, data) {
        return axios.post(`${URL}${subUrl}`, data, RequestService.getConfig())
        .then(res => res.data.result)
        .catch(error => { throw new Error(error.response.data.message); })
    }

    static uploadFiles(files) {
        return axios.post(`${URL}/upload`, files)
        .then(res => res)
        .catch(error => { throw new Error(error.response.data.message); })
    }
}