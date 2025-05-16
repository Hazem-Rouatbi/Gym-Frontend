import "@helpers/Text/i18n";
import { initLang } from "@helpers/Text/language";
import { useEffect, useState } from "react";
import { validateToken } from "@helpers/services/authServices";
import { router } from "expo-router";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUser } from "@helpers/redux/userReducer";
import { initNotifications } from "@helpers/services/notifServices";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ..."]);
import { initAxios } from "@_helpers/axios/axios";

export default function index() {
    const dispatch = useDispatch();
    useEffect(() => {
        // initNotifications();
        initLang();
        initAxios();
        validateToken().then((res) => {
            if (res?.data) {
                const data = res.data;
                console.log(res.data);
                dispatch(
                    setUser({
                        id: data.id,
                        login: data.login,
                        email: data.email,
                        role: data.role,
                        height: data?.height,
                        weight: data?.weight?.[0]?.value,
                    })
                );
                router.replace("/home");
            } else {
                // showMessage({
                //     message: res?.message,
                //     type: "danger",
                // });
                router.replace("/landingPage");
            }
        });
    }, []);
}
