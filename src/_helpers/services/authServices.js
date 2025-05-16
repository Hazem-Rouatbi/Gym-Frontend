import axios from "axios";
import { getLanguage, getTranslation } from "../Text/language";
import { BaseUrl } from "@_helpers/constants";

const authUrl = BaseUrl + "/authentication";

export const loginReq = async (username, password) => {
    const req = { login: username, password };
    return await axios
        .post(authUrl + "/log-in", req, {
            headers: { "accept-language": getLanguage() },
        })
        .then((res) => {
            return {
                success: true,
                message: res.message,
                data: res.data,
            };
        })
        .catch((err) => {
            const { response } = err;
            console.log(err);
            if (!response)
                return {
                    success: false,
                    message: getTranslation("server_error"),
                };
            return { message: getTranslation("server_error") };
        });
};

export const registerReq = async (
    email,
    firstName,
    lastName,
    login,
    password
) => {
    const req = {
        email,
        fullName: lastName + "." + firstName,
        login,
        password,
        code: "123",
    };
    console.log(req);
    return await axios
        .post(authUrl + "/register", req, {
            headers: { "accept-language": getLanguage() },
        })
        .then((res) => {
            return {
                success: true,
                message: res,
                data: res.data,
            };
        })
        .catch((err) => {
            const { response } = err;
            return {
                success: false,
                message: response.data.message,
            };
        });
};

export const validateToken = async () => {
    return await axios
        .get(authUrl)
        .then((res) => {
            return { data: res?.data };
        })
        .catch((err) => {
            const { response } = err;
            console.log(err);
            console.log(response?.data);
            if (response) return { message: response.data.message };
            else return { message: getTranslation("no_token") };
        });
};

export const logoutReq = async () => {
    return await axios
        .post(authUrl + "/log-out", { withCredentials: true })
        .then((res) => {
            return {
                message: res.message,
            };
        })
        .catch((err) => {
            const { response } = err;
            if (response) {
                return {
                    success: false,
                    message: response?.data?.message,
                };
            } else
                return {
                    message: getTranslation("server_error"),
                };
        });
};
