import axios from "axios";
import { getLanguage, getTranslation } from "../Text/language";
import environment from "../environment";
import store from "../../store";
import { BaseUrl } from "@_helpers/constants";

const userUrl = BaseUrl + "/users";

export const getUserImage = async (userId) => {
    return await axios
        .get(`${userUrl}/${userId}/photo`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            const { response } = err;
            console.log(err.request._response);
            return {
                success: false,
                message: response?.message
                    ? response?.message?.data
                    : getTranslation("error_updating_user"),
            };
        });
};
export const setUserImage = async (photo) => {
    if (!photo) return null;
    const formData = new FormData();
    const { uri, mimeType, fileName } = photo;
    console.log(uri, mimeType, fileName);
    formData.append("file", { uri: uri, name: fileName, type: mimeType });
    return await axios
        .post(userUrl + "/photo", formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
                "accept-language": getLanguage(),
            },
        })
        .then((res) => {
            return {
                success: true,
                data: res.data,
            };
        })
        .catch((err) => {
            const { response } = err;
            console.log(err.request._response);
            return {
                success: false,
                message: response?.message
                    ? response?.message?.data
                    : getTranslation("error_updating_user"),
            };
        });
};
export const updateUser = async () => {
    const user = store.getState().user;
    console.log(user);
    return await axios
        .put(userUrl, {
            login: user.login,
            email: user.email,
            height: user.height,
            weight: user.weight,
        })
        .catch((err) => {
            console.log(err.request._response);
        });
};


export const updatePW = async (password) => {
    if (!password) return { msg: "server_error", status: "danger" };
    return await axios.put(userUrl, { password: password }).then(() => {
        return { msg: "success", status: "success" };
    });
};

export const getStats = async () => {
    return await axios
        .get(userUrl + "/statistics")
        .then((res) => {
            return { data: res?.data, status: true };
        })
        .catch((err) => {
            console.log(err.request._response);
            return { status: false };
        });
};

export const getMemberships = async () => {
    return await axios
        .get(userUrl + "/memberships")
        .then((res) => {
            return { data: res?.data, status: true };
        })
        .catch((err) => {
            console.log(err.request._response);
            return { status: false };
        });
};
