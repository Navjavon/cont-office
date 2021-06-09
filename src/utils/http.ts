import axios from 'axios';
import {BASE_URL} from '@/store/api-constants';

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});
