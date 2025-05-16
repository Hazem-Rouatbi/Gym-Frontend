import { reg } from "./constants";

export const validateEmail = (text, t) => {
    if (!text) {
        return { msg: "", status: "basic" };
    }
    if (reg.test(text) === false) {
        return { msg: t("email_invalid"), status: "danger" };
    }
    return { msg: "", status: "primary" };
};

export const validatePW = (text, t) => {
    if (!text) {
        return { msg: "", status: "basic" };
    }
    if (text.length < 8) {
        return { msg: t("password_length_short"), status: "danger" };
    }
    return { msg: "", status: "primary" };
};

export const validateUsername = (text, t) => {
    if (!text) {
        return { msg: t("username_length_short"), status: "danger" };
    }
    if (text.length < 3) {
        console.log('here');
        return { msg: t("username_length_short"), status: "danger" };
    }
    if (text.length > 30) {
        return { msg: t("username_length_long"), status: "danger" };
    }
    return { msg: "", status: "primary" };
};
