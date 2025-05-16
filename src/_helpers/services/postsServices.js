import { getLanguage, getTranslation } from "@_helpers/Text/language";
import { BaseUrl } from "@_helpers/constants";
import { err } from "react-native-svg";

const { default: axios } = require("axios");

const postsUrl = BaseUrl + "/posts";
export const getPosts = async ({ page = 0 }) => {
    return await axios
        .get(postsUrl + "?page=" + page)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            const { response } = err;
            if (response) {
                return response;
            }
            return { message: getTranslation("error_fetching") };
        });
};
export const likePost = async (postId) => {
    if (!postId) return { message: getTranslation("server_error") };
    const req = { postId: parseInt(postId) };
    console.log(req);
    return await axios
        .post(postsUrl + "/like", req)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            const { response } = err;
            console.log(response.data);
            if (response) {
                return { message: response.data.message };
            }
            return { message: getTranslation("server_error") };
        });
};
export const unlikePost = async (likeId) => {
    if (!likeId) return { message: getTranslation("server_error") };
    return await axios
        .post(postsUrl + "/unlike", { likeId: parseInt(likeId) })
        .then((res) => {})
        .catch((err) => {
            const { response } = err;
            console.log(err.status);
            if (response) {
                return response;
            }
            return { message: getTranslation("server_error") };
        });
};

export const addPost = async (post, file) => {
    const formData = new FormData();
    const { uri, mimeType, fileName } = file;
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("file", { uri: uri, name: fileName, type: mimeType });
    console.log(formData._parts);

    return await axios
        .post(postsUrl, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
                "accept-language": getLanguage(),
            },
        })
        .then((res) => console.log(res))
        .catch((err) => {
            console.log(err.request._response);
        });
};

export const addComment = async (comment, postId) => {
    return await axios
        .post(postsUrl + "/createComment", {
            content: comment,
            postId: parseInt(postId),
        })
        .then((res) => console.log(res))
        .catch((err) => {
            console.log(err.request._response);
        });
};
export const editComment = async (comment, commentId) => {
    return await axios
        .post(postsUrl + "/editComment", {
            content: comment,
            commentId: parseInt(commentId),
        })
        .then((res) => console.log(res))
        .catch((err) => {
            console.log(err.request._response);
        });
};
export const deleteComment = async (commentId) => {
    return await axios
        .post(postsUrl + "/deleteComment", { commentId: parseInt(commentId) })
        .catch((err) => {
            console.log(err.request._response);
        });
};
