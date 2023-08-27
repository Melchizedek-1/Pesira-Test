import axios from "axios";
const usersApi = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com`,
});

export const usersUrlEndpoint = "/users";

export const getUsers = async () => {
    const response = await usersApi.get(usersUrlEndpoint);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await usersApi.post(usersUrlEndpoint, userData);
    return response.data;
};