import axios from "axios";

const SERVER = `http://localhost:5000/`;
//const SERVER = `http://18.216.71.102:80/api`;

const HTTP = axios.create({
    baseURL: SERVER,
    headers: {
       'Content-Type': 'Access-Control-Allow-Headers',
       'Access-Control-Allow-Origin': '*'
    }
});

HTTP.interceptors.response.use(
    res => res,
    err => Promise.reject(err.response)
)

export default HTTP;