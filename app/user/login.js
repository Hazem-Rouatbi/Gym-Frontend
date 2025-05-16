import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, Input, Layout, Text, useTheme } from "@ui-kitten/components";
import { ToggleEyeIcon } from "@components/icons";
import { loginReq } from "@helpers/services/authServices";
import { useTranslation } from "react-i18next";
import { showMessage } from "react-native-flash-message";
import { Link, router } from "expo-router";
import { setUser } from "@helpers/redux/userReducer";
import { useDispatch } from "react-redux";
import { SpecialText } from "@components/specialText";
import WigglyLine from "@assets/lines/wiggly.svg";

const Login = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPW, setShowPW] = useState(true);
    const dispatch = useDispatch();
    const handleLogin = () => {
        loginReq(username, password).then((res) => {
            if (res.success) {
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
                router.replace("home");
                router.replace("home");
            } else {
                showMessage({
                    message: res.message,
                    type: "danger",
                });
            }
        });
    };

    const ToggleShowPass = () => (
        <Button
            style={{ padding: 0, margin: 0 }}
            size="small"
            onPress={() => setShowPW(!showPW)}
            accessoryRight={ToggleEyeIcon(showPW)}
            appearance="ghost"
        ></Button>
    );
    return (
        <>
            <Layout level="1" style={{ ...styles.container }}>
                <View
                    style={{
                        position: "absolute",
                        left: 0,
                        top: -150,
                        zIndex: -10,
                        transform: [{ rotateZ: "120deg" }],
                    }}
                >
                    <WigglyLine
                        width={800}
                        style={{
                            top: 200,
                            right:-200,
                            opacity: 0.5,
                            color: theme["background-alternative-color-1"],
                            transform: [{ rotateZ: "45deg" }],
                        }}
                    />
                    <WigglyLine
                        style={{
                            top: -100,
                            opacity: 0.5,
                            color: theme["background-alternative-color-1"],
                            transform: [{ rotateZ: "90deg" }],
                        }}
                        width={800}
                    />
                </View>
                <Input
                    size="large"
                    label={t("username")}
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                ></Input>
                <Input
                    size="medium"
                    secureTextEntry={showPW}
                    textContentType="password"
                    label={t("password")}
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    accessoryRight={ToggleShowPass()}
                ></Input>
                <Button
                    size="large"
                    style={{ ...styles.touchable, width: "94%" }}
                    onPress={() => handleLogin()}
                >
                    <SpecialText FontSize={20} text={t("login")} />
                </Button>
                <Button style={styles.touchable} appearance="ghost">
                    <SpecialText FontSize={17} text={t("forgot_text")} />
                </Button>

                <View style={styles.signInDiv}>
                    <SpecialText FontSize={15} text={t("no_account") + " "} />
                    <Button
                        size="small"
                        activeOpacity={0.2}
                        style={{
                            ...styles.touchable,
                            backgroundColor: theme["background-basic-color-2"],
                            borderWidth: 1,
                        }}
                        onPress={() => {
                            router.push("/user/signup");
                        }}
                    >
                        <SpecialText
                            FontSize={17}
                            extStyle={{ padding: 10 }}
                            text={" " + t("signup")}
                        />
                    </Button>
                </View>
            </Layout>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
    },
    signInDiv: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    container: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        padding: 20,
    },
    touchable: { padding: 8, margin: 8, borderRadius: 5, borderWidth: 1 },
    text: { alignSelf: "center", fontSize: 20 },
});

export default Login;
