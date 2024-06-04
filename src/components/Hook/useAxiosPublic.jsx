import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://contest-management-system-server-side-59zud4peg.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;