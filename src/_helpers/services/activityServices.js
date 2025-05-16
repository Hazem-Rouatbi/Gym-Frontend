import axios from "axios";
import { BaseUrl } from "@_helpers/constants";
import { getLanguage } from "@_helpers/Text/language";

const activityUrl = BaseUrl + "/activities";

export const renameKey = async (oldKey, newKey, data) => {
    if (!data) return null;
    const tmpData = [];
    for (let obj of data) {
        const { [oldKey]: oldKeyVal, ...rest } = obj;
        const newVal = oldKeyVal;
        obj = { [newKey]: newVal, ...rest };
        tmpData.push(obj);
    }

    return tmpData;
};

export const addActivityReq = async (activity) => {
    console.log(activity, activityUrl, {
        headers: { "accepted-langage": getLanguage() },
    });
    return axios
        .post(activityUrl, activity)
        .then((res) => {
            return {
                message: res.data.message,
                success: true,
            };
        })
        .catch((err) => {
            console.log(err.request._response);
            const { response } = err;
            return {
                success: false,
                message: response.data.message,
            };
        });
};

export const getActivities = async () => {
    return await axios
        .get(activityUrl + "/getAll", { "accepted-langage": getLanguage() })
        .then((res) => {
            console.log(res);
            console.log(`\n \n \n \n \n \n \n`);
            return {
                data: res.data,
                success: true,
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
export const getPlans = async () => {
    return await axios
        .get(activityUrl + "/all", { "accepted-langage": getLanguage() })
        .then((res) => {
            return {
                success: true,
                data: res.data,
            };
        })
        .catch((err) => {
            console.log(err.request._response);
            const { response } = err;
            return {
                success: false,
                message: response?.data?.message,
            };
        });
};

export const deleteActivity = async (id) => {
    const intId = parseInt(id);
    return await axios
        .post(
            activityUrl + "/delete",
            { id: intId },
            { "accepted-langage": getLanguage() }
        )
        .then((res) => {
            return {
                message: res.message,
                success: true,
            };
        })
        .catch((err) => {
            const { response } = err;
            console.log(err.request._response);
            return {
                success: false,
                message: response.data.message,
            };
        });
};

export const addSubActivityReq = async ({ title, duration, activityId }) => {
    const data = {
        title: title,
        duration: duration,
        activityId: parseInt(activityId),
    };
    console.log(data);
    return await axios
        .post(BaseUrl + "/sub-activities", data, {
            "accepted-langage": getLanguage(),
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            console.log(err.request._response);

            const { response } = err;
            return { message: response.data.message };
        });
};
export const getSubActivitiesReq = async (id) => {
    return await axios
        .get(activityUrl + "/sub-activities/" + id, {
            "accepted-langage": getLanguage(),
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            console.log(err.request._response);

            const { response } = err;
            return { message: response.data.message };
        });
};

export const deleteSubActivity = (id) => {
    axios
        .delete(BaseUrl + "/sub-activities/delete/" + id, {
            "accepted-langage": getLanguage(),
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err.request._response);

            const { response } = err;
            return { message: response.data.message };
        });
};

export const joinActivity = (id) => {
    return axios
        .post(activityUrl + "/join/" + id, {
            "accepted-langage": getLanguage(),
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err.request._response);

            const { response } = err;
            return { message: response.data.message };
        });
};
