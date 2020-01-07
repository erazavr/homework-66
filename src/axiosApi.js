import axios from 'axios'

const axiosPages = axios.create({
    baseURL: 'https://homework-ernur.firebaseio.com/',
});
export default axiosPages