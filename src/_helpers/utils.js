import { getTranslation } from "./Text/language";

export const hexToRgb = (hex) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const rgb = { r: r, g: g, b: b };
    return rgb;
};

export const getFormattedTime = (time) => {
    const splitTimeText = time.split(":");
    if (splitTimeText.length > 2) {
        return splitTimeText[0] + ":" + splitTimeText[1];
    }
    return time;
};

export const getTimeInSecFromDuration = (duration) => {
    const splitDuration = duration.split(":");
    const seconds = parseInt(splitDuration[2]);
    const minuresToSec = parseInt(splitDuration[1]) * 60;
    const hoursToSec = parseInt(splitDuration[0]) * 60 * 60;
    return seconds + minuresToSec + hoursToSec;
};
export const getFullLanguageName = (value) => {
    switch (value) {
        case "en":
            return getTranslation("english");
        case "es":
            return "Spanish";
        case "fr":
            return getTranslation("french");
        default:
            return "English";
    }
};

export const getRGBAColor = (color, alpha = 0.8) => {
    const rgbVal = color ? hexToRgb(color) : null;

    const backdrop = rgbVal
        ? {
              backgroundColor: `rgba(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b}, ${alpha})`,
          }
        : { backgroundColor: "rgba(0, 0, 0, 0.5)" };
    return backdrop;
};

export const getCurrentTime = () => {
    const date = new Date();
    return `${date.getHours}: ${date.getMinutes}`;
};
export const getCurrentDate = () => {
    const date = new Date();
    return new Date().toISOString().split("T")[0];
};

export const getFormatedDuration = (val) => {
    if (val.includes("00h")) {
        val = val.replace("00h", "").trim();
    }
    if (val.includes("00m")) {
        val = val.replace("00m", "").trim();
    }
    return val;
};

export const urlToBase64 = (url) => {
    return fetch(url)
        .then((response) => response.arrayBuffer())
        .then((buffer) => Buffer.from(buffer).toString("base64"));
};
