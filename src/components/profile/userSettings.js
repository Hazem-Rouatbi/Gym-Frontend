import {
    validateEmail,
    validatePW,
    validateUsername,
} from "@_helpers/authValidators";
import { setUser } from "@_helpers/redux/userReducer";
import { updatePW, updateUser } from "@_helpers/services/userService";
import { getRGBAColor } from "@_helpers/utils";
import { ToggleEyeIcon } from "@components/icons";
import { SpecialText } from "@components/specialText";
import { Button, Input, Modal, useTheme } from "@ui-kitten/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";

const UserSettings = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const theme = useTheme();
    const { t } = useTranslation();
    const [username, setUsername] = useState(user?.login);
    const [email, setEmail] = useState(user?.email);
    const [height, setHeight] = useState(user?.height);
    const [weight, setWeight] = useState(user?.Weight);

    const [password, setPassword] = useState(null);
    const [confPassword, setConfPassword] = useState(null);
    const [visible, setVisible] = useState(false);
    const [showPW, setShowPW] = useState(true);

    const validUsername = () => {
        const { msg, status } = validateUsername(username, t);
        if (status === "danger") {
            showMessage({
                type: status,
                message: msg,
            });
            return false;
        }
        return true;
    };

    const validEmail = () => {
        const { msg, status } = validateEmail(email, t);
        if (status === "danger") {
            showMessage({
                type: status,
                message: msg,
            });
            return false;
        }
        return true;
    };

    const validateAndSend = () => {
        if (validEmail() && validUsername()) {
            dispatch(
                setUser({
                    login: username,
                    email: email,
                    height: height,
                    weight: weight,
                })
            );
            updateUser();
        }
    };

    const validatePWAndSend = () => {
        const { msg, status } = validatePW(password, t);
        if (status === "danger") {
            showMessage({
                type: status,
                message: msg,
            });
            return;
        }
        if (password !== confPassword) {
            showMessage({
                type: "danger",
                message: t("password_confirm_passowrd_no_match"),
            });
            return;
        }
        updatePW(password).then((res) => {
            if (res?.status === "success") {
                showMessage({
                    type: res?.status,
                    message: t(res?.msg),
                });
                setPassword(null);
                setConfPassword(null);
                setVisible(false);
            } else {
                showMessage({
                    type: res?.status,
                    message: t(res?.msg),
                });
                setVisible(false);
            }
        });
    };

    const parseHeightWeightVal = (val, mode) => {
        try {
            const floatVal = parseFloat(val);
            if (mode === "height") setHeight(floatVal);
            else if (mode === "weight") setWeight(floatVal);
            else
                showMessage({
                    message: t("server_error"),
                    type: "danger",
                });
        } catch {
            showMessage({
                message: t("cant_parse_float"),
                type: "danger",
            });
        }
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
        <View style={styles.container}>
            <Input
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={{
                    ...styles.Input,
                    marginHorizontal: 0,
                    paddingHorizontal: 0,
                }}
                textStyle={{ height: 40 }}
                label={t("username")}
                placeholder={user?.login}
            />
            <Input
                onChangeText={(text) => setEmail(text)}
                value={email}
                textStyle={{ height: 40 }}
                keyboardType="email-address"
                style={{
                    ...styles.Input,
                    marginHorizontal: 0,
                    paddingHorizontal: 0,
                }}
                label={t("email")}
                placeholder={user?.email}
            />
            <Input
                onChangeText={(text) => parseHeightWeightVal(text, "height")}
                value={height}
                textStyle={{ height: 40 }}
                keyboardType="numeric"
                style={{
                    ...styles.Input,
                    marginHorizontal: 0,
                    paddingHorizontal: 0,
                }}
                label={t("height")}
                placeholder={user?.height?.toString()}
            />
            <Input
                onChangeText={(text) => parseHeightWeightVal(text, "weight")}
                value={weight}
                textStyle={{ height: 40 }}
                keyboardType="numeric"
                style={{
                    ...styles.Input,
                    marginHorizontal: 0,
                    paddingHorizontal: 0,
                }}
                label={t("weight")}
                placeholder={user?.weight?.toString()}
            />
            <Button
                onPress={() => {
                    validateAndSend();
                }}
                style={styles.Input}
            >
                <SpecialText FontSize={17} text={t("save")} />
            </Button>
            <Button style={styles.Input} onPress={() => setVisible(true)}>
                <SpecialText FontSize={17} text={t("change_password")} />
            </Button>
            <Modal
                visible={visible}
                onBackdropPress={() => setVisible(false)}
                backdropStyle={getRGBAColor(
                    theme["background-basic-color-1"],
                    0.7
                )}
                style={{
                    width: "70%",
                    padding: 20,
                    borderRadius: 20,
                    backgroundColor: theme["background-basic-color-1"],
                    borderWidth: 1,
                    borderColor: theme["border-primary-color-1"],
                }}
            >
                <Input
                    style={styles.Input}
                    size="medium"
                    secureTextEntry={showPW}
                    textContentType="password"
                    label={t("password")}
                    value={password}
                    onChangeText={setPassword}
                    accessoryRight={ToggleShowPass}
                ></Input>
                <Input
                    style={styles.Input}
                    size="medium"
                    secureTextEntry={showPW}
                    textContentType="password"
                    label={t("confirm_password")}
                    value={confPassword}
                    onChangeText={setConfPassword}
                    accessoryRight={ToggleShowPass}
                ></Input>
                <Button
                    onPress={() => validatePWAndSend()}
                    style={styles.Input}
                >
                    <SpecialText FontSize={16} text={t("save")} />
                </Button>
            </Modal>
        </View>
    );
};
export default UserSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "80%",
        borderRadius: 10,
    },
    Input: {
        borderRadius: 10,
        justifyContent: "center",
        marginVertical: 6,
    },
});
