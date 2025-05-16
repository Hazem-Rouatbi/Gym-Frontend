import { Layout, Button, useTheme, Divider } from "@ui-kitten/components";
import { useNavigation } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@helpers/redux/userReducer";
import { logoutReq } from "@helpers/services/authServices";
import ProfileImage from "@components/profile/profileImage";
import { useTranslation } from "react-i18next";
import { SpecialText } from "@components/specialText";
import { LogOutIcon } from "../../src/components/icons";
import OfferCard from "@components/profile/offerCard";
import Settings from "@components/profile/settings";
import Collapsible from "react-native-collapsible";
import { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import { ArrowDownIconSvg } from "@_helpers/constants";
import UserSettings from "@components/profile/userSettings";
import { getRGBAColor } from "@_helpers/utils";
import { validateToken } from "@_helpers/services/authServices";
import UserOffers from "@components/profile/userOffers";
import { LinearGradient } from "expo-linear-gradient";
import WigglyLine from "@assets/lines/wiggly.svg";

const ArrowDownIcon = (props) => (
    <SvgXml xml={ArrowDownIconSvg} width={25} height={25} {...props} />
);

const Profile = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [appSettingsCollapsed, setAppSettingsCollapsed] = useState(true);
    const [appSettingsRotation, setAppSettingsRotation] = useState(0);
    const [userSettingsCollapsed, setUserSettingsCollapsed] = useState(true);
    const [userSettingsRotation, setUserSettingsRotation] = useState(0);

    useEffect(() => {
        !appSettingsCollapsed
            ? setAppSettingsRotation(180)
            : setAppSettingsRotation(0);
        !userSettingsCollapsed
            ? setUserSettingsRotation(180)
            : setUserSettingsRotation(0);
    }, [appSettingsCollapsed, userSettingsCollapsed]);

    const handleLogout = () => {
        dispatch(setLogout());
        logoutReq();
        navigation.reset({ index: 0, routes: [{ name: "user/login" }] });
    };
    return (
        <>
            <LinearGradient
                colors={[
                    getRGBAColor(theme["color-primary-500"], 0.2)
                        .backgroundColor,
                    getRGBAColor(theme["color-primary-100"], 0.1)
                        .backgroundColor,
                ]}
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: "120%",
                    zIndex: -20,
                }}
            />
            <View
                style={{
                    position: "absolute",
                    left: 0,
                    top: -150,
                    zIndex: -10,
                }}
            >
                <WigglyLine
                    width={800}
                    style={{
                        opacity: 0.6,
                        color: theme["background-alternative-color-1"],
                    }}
                />

                <WigglyLine
                    style={{
                        right: 200,
                        opacity: 0.6,
                        color: theme["background-alternative-color-1"],
                        transform: [{ rotateZ: "160deg" }],
                    }}
                    width={800}
                />
            </View>
            <View
                style={{
                    position: "absolute",
                    left: 0,
                    top: -150,
                    zIndex: -10,
                }}
            >
                <WigglyLine
                    style={{
                        right: 50,
                        top: 820,
                        opacity: 0.6,
                        color: theme["background-alternative-color-1"],
                        transform: [{ rotateZ: "100deg" }],
                    }}
                    width={800}
                />
            </View>
            <ScrollView
                contentContainerStyle={{
                    ...styles.container,
                    minHeight: "100%",
                }}
            >
                <Layout
                    style={{
                        marginVertical: 10,
                        borderRadius: 100,
                        justifyContent: "center",
                        alignContent: "center",
                        ...getRGBAColor(theme["background-basic-color-1"], 0.5),
                    }}
                >
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SpecialText FontSize={30} style={styles.title} text={user.username} />
                        <Button appearance="ghost"
                        size="large" activeOpacity={0.5}
                        style={{ borderWidth: 0, backgroundColor: null }}
                            accessoryRight={EditIcon({ fill: theme['text-basic-color'] })}></Button>
                    </View> */}
                    <ProfileImage />
                </Layout>
                <View style={{ margin: 10, width: "100%" }}>
                    <UserOffers />
                    <Button
                        accessoryRight={ArrowDownIcon({
                            rotation: userSettingsRotation,
                            fill: theme["text-basic-color"],
                        })}
                        style={{
                            ...styles.basicBtn,
                            ...getRGBAColor(
                                theme["background-basic-color-1"],
                                0.5
                            ),
                        }}
                        onPress={() => {
                            setUserSettingsCollapsed(!userSettingsCollapsed);
                        }}
                    >
                        <SpecialText
                            extStyle={{}}
                            FontSize={17}
                            text={t("user_settings")}
                        />
                    </Button>

                    <Collapsible
                        style={styles.itemsContainer}
                        collapsed={userSettingsCollapsed}
                    >
                        <UserSettings />
                    </Collapsible>
                </View>
                <Button
                    accessoryRight={ArrowDownIcon({
                        rotation: appSettingsRotation,
                        fill: theme["text-basic-color"],
                    })}
                    style={{
                        ...styles.basicBtn,
                        flexWrap: "wrap",
                        ...getRGBAColor(theme["background-basic-color-1"], 0.5),
                    }}
                    onPress={() => {
                        setAppSettingsCollapsed(!appSettingsCollapsed);
                    }}
                >
                    <SpecialText
                        extStyle={{ textAlign: "center" }}
                        FontSize={17}
                        text={t("app_settings")}
                    />
                </Button>

                <Collapsible
                    collapsed={appSettingsCollapsed}
                    style={{...styles.itemsContainer,paddingHorizontal:20}}
                >
                    <Settings />
                </Collapsible>
                <Button
                    style={styles.logoutBtn}
                    status="danger"
                    accessoryRight={LogOutIcon({
                        fill: theme["text-basic-color"],
                    })}
                    onPress={() => {
                        handleLogout();
                    }}
                >
                    <SpecialText FontSize={17} text={t("logout")} />
                </Button>
            </ScrollView>
        </>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        alignItems: "center",
        width: "100%",
        flexDirection: "col",
        FontFamily: "Comfortaa",
        FontWeight: "500",
        padding: 0,
    },
    logoutBtn: {
        position: "relative",
        alignSelf: "center",
        marginVertical: 20,
    },

    title: {
        borderRadius: 10,
        margin: 20,
        fontSize: 40,
        fontWeight: "bold",
    },
    row: {
        borderRadius: 10,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    basicBtn: {
        borderRadius: 10,
        borderWidth: 0,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: "auto",
    },
    itemsContainer: {
        borderRadius: 10,
        marginTop: 10,
        minWidth: "100%",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "120%",
        zIndex: -20,
    },
});
