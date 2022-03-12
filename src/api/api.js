import axios from 'axios';

const api = "";

const instance = axios.create({
    baseURL: api,
});

export default instance;