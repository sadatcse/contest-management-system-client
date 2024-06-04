import axios from 'axios';
export const axiosSecure = axios.create({
    baseURL: 'https://contest-management-system-server-side-59zud4peg.vercel.app/'
})
const UseAxioSecure = () => {
    return axiosSecure;

};

export default UseAxioSecure;