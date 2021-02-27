import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    },
    timeout: 3000,
    auth: {
        username: 'admin',
        password: 'teste1'
    }
});

export default api;