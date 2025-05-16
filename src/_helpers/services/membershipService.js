import { getLanguage } from "@_helpers/Text/language";
import { BaseUrl } from "@_helpers/constants";
import axios from "axios";

const membershipUrl = BaseUrl;

export const getMembershipTypes = async () => {
    return await axios
        .get(`${membershipUrl}/membership-types`, {
            headers: { "accepted-langage": getLanguage() },
        })
        .then((res) => {
            console.log(res.data[0].nameEn);
            return { data: res.data };
        })
        .catch((err) => {
            const { response } = err;
            console.log(err);
            if (response) return { message: response.data.message };
            else return err;
        });
};

export const getMembershipTypesWithoutImages = async () => {
    return await axios
        .get(`${membershipUrl}/membership-types/without-images`, {
            headers: { "accepted-langage": getLanguage() },
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            const { response } = err;
            console.log(err);
            if (response) return { message: response.data.message };
            else return err;
        });
};
export const getMembershipPrices = async (id) => {
    return await axios
        .get(`${membershipUrl}/membership-types/${id}/prices`, {
            headers: { "accepted-langage": getLanguage() },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            const { response } = err;
            if (response) return { message: response.data.message };
            else return err;
        });
};

export const getMembershipPhoto = async (id) => {
    return await axios
        .get(`${membershipUrl}/membership-types/${id}/photo`)
        .then((res) => {
            return { data: res?.data, status: true };
        })
        .catch((err) => {
            console.log(err.request._response);
            return { status: false };
        });
};
export const subscribeToMembership = async (offerId, priceId) => {
    const data = {
        membershipPriceId: parseInt(priceId),
        membershipTypeId: parseInt(offerId),
        enable: true,
    };
    console.log(data);
    return await axios
        .post(BaseUrl + "/memberships", data)
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err.request._response);
            return { status: false };
        });
};
