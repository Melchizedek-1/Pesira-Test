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

export const deleteUser = async ({ id }) => {
    const response = await usersApi.delete(`${usersUrlEndpoint}/${id}`);
    return response.data;
};

export const editUser = async ({ id, userData }) => {
    const response = await usersApi.put(`${usersUrlEndpoint}/${id}`, userData);
    return response.data;
};