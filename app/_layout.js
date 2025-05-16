
import { Slot, usePathname } from "expo-router";
import { useTranslation } from "react-i18next";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../src/store";
import * as Notifications from 'expo-notifications';
import BottomBar from "@components/navigation/bottomBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeWrapper } from "@helpers/theme/theme";
import {  Layout, useTheme } from "@ui-kitten/components";
import { useEffect, useRef } from "react";
import { registerForPushNotificationsAsync } from "@helpers/services/notifServices";
import { setExpoToken, setNotif } from "@helpers/redux/notificationReducer";
import FlashMessage from "react-native-flash-message";
import { useFonts } from 'expo-font';
import { useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen';
import { View } from "react-native";
import Header from "@components/navigation/header";




const TopLayout = () => {
    SplashScreen.preventAutoHideAsync()

    const dispatch = useDispatch()
    const { t } = useTranslation()
    const theme = useTheme()
    const pathName = usePathname().split('/').pop().replace('/', '')
    const login = useSelector(state => state.user.state)
    const height = login ? '92%' : '100%'

    const notificationListener = useRef();
    const responseListener = useRef();

    // useEffect(() => {
    //     registerForPushNotificationsAsync()
    //         .then((token) => dispatch(setExpoToken(token)))
    //         .catch((error) => console.log(`error setting expoToken ${error}`));

    //     notificationListener.current =
    //         Notifications.addNotificationReceivedListener((notification) => {
    //             dispatch(setNotif(notification.request.content));
    //         });

    //     responseListener.current =
    //         Notifications.addNotificationResponseReceivedListener((response) => {
    //             console.log(response);
    //         });

    //     return () => {
    //         notificationListener.current &&
    //             Notifications.removeNotificationSubscription(
    //                 notificationListener.current,
    //             );
    //         responseListener.current &&
    //             Notifications.removeNotificationSubscription(responseListener.current);
    //     };
    // }, []);

    if (!login ) return (<>
        <Header title={t(pathName)} iconProps={{fill:theme['text-basic -color']}}/>
        <Layout style={{ flex: 1 }}>
            <Slot />
        </Layout>
    </>)
    return (
        <>
            <SafeAreaView style={{ flex: 1, height: { height }, backgroundColor: theme['background-basic-color-3'] }}>
                <Slot />
            </SafeAreaView>

            {login && <BottomBar />}
        </>
    );
}

const RootLayout = ({ children }) => {
    SplashScreen.preventAutoHideAsync()
    const [fontsLoaded, fontError] = useFonts({
        'Comfortaa': require('../assets/fonts/Comfortaa.ttf'),
        "PacificoRegular": require("../assets/fonts/Pacifico-Regular.ttf")
    });

    const onLayoutLoaded = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);
    if (!fontsLoaded && !fontError) {
        return (<></>);
    }
    return (
        <Provider store={store}>
            <ThemeWrapper >
                <TopLayout>
                    <View onLayout={onLayoutLoaded} style={{ flex: 1 }}>
                        {children}
                    </View>
                </TopLayout>
                <FlashMessage position='bottom' />
            </ThemeWrapper>
        </Provider>
    );
};

export default RootLayout;