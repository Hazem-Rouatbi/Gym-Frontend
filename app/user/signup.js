import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Input, Layout, useTheme } from "@ui-kitten/components";
import { DownArrow, ToggleEyeIcon, UpArrow } from "@components/icons";
import { registerReq } from "@helpers/services/authServices";
import { validateEmail, validatePW } from "@helpers/authValidators";
import { useTranslation } from "react-i18next";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch } from "react-redux";
import { setUser } from "@helpers/redux/userReducer";
import { showMessage } from "react-native-flash-message";
import { SpecialText } from "@components/specialText";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import {
    getMembershipPrices,
    getMembershipTypesWithoutImages,
} from "@_helpers/services/membershipService";
import SelectDropdown from "react-native-select-dropdown";
import WigglyLine from "@assets/lines/wiggly.svg";

const Signup = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailState, setEmailState] = useState("basic");
    const [passwordState, setPasswordState] = useState("basic");
    const [showPW, setShowPW] = useState(true);
    const [availableOffers, setAvailableOffers] = useState([]);
    const [offerPrices, setOfferPrices] = useState(null);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [login, setLogin] = useState();

    useEffect(() => {
        getMembershipTypesWithoutImages().then((res) => {
            if (res?.data && res?.data.length > 0) {
                setAvailableOffers(res.data);
            } else {
                showMessage({
                    type: "danger",
                    message: res?.message,
                });
            }
        });
    }, []);

    const getPricesForOffer = (offerId) => {
        getMembershipPrices(offerId).then((res) => {
            console.log(res);
            setOfferPrices(res);
        });
    };

    const handleRegister = () => {
        if (password === confirmPassword) {
            registerReq(email, firstName, lastName, login, password).then(
                (res) => {
                    if (res.success) {
                        dispatch(
                            setUser({
                                id: res.data.id,
                                username: res.data.username,
                                email: res.data.email,
                                token: res.token,
                            })
                        );
                        router.replace("home");
                        router.replace("home");
                    } else {
                        showMessage({
                            message: res.message,
                            type: "danger",
                            duration: 3000,
                        });
                    }
                }
            );
        } else {
            showMessage({
                type: "danger",
                message: t("password_confirm_passowrd_no_match"),
            });
        }
    };

    useEffect(() => {
        setEmailState(validateEmail(email, t).status);
    }, [email]);

    useEffect(() => {
        setPasswordState(validatePW(password, t).status);
    }, [password]);

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
            <ScrollView
                contentContainerStyle={{
                    ...styles.container,
                    minHeight: "100%",
                }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Layout level="1" style={{ ...styles.viewContainer }}>
                        <View
                            style={{
                                position: "absolute",
                                left: 0,
                                top: -40,
                                zIndex: -10,
                            }}
                        >
                            <WigglyLine
                                width={800}
                                style={{
                                    opacity: 0.6,
                                    color: theme[
                                        "background-alternative-color-1"
                                    ],
                                }}
                            />

                            <WigglyLine
                                style={{
                                    right: 200,
                                    opacity: 0.6,
                                    color: theme[
                                        "background-alternative-color-1"
                                    ],
                                    transform: [{ rotateZ: "160deg" }],
                                }}
                                width={800}
                            />
                        </View>
                        <View style={styles.nameView}>
                            <Input
                                size="large"
                                label={t("first_name")}
                                style={styles.nameInput}
                                textContentType="username"
                                value={firstName}
                                onChangeText={(text) => {
                                    setFirstName(text);
                                }}
                            />
                            <Input
                                size="large"
                                label={t("last_name")}
                                style={styles.nameInput}
                                textContentType="username"
                                value={lastName}
                                onChangeText={(text) => {
                                    setLastName(text);
                                }}
                            />
                        </View>
                        <Input
                            size="large"
                            label={t("username")}
                            style={styles.input}
                            textContentType="username"
                            value={login}
                            onChangeText={(text) => {
                                setLogin(text);
                            }}
                        />
                        <Input
                            size="large"
                            label={t("email")}
                            style={styles.input}
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            status={emailState}
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                            }}
                        ></Input>
                        <Input
                            size="medium"
                            secureTextEntry={showPW}
                            textContentType="password"
                            label={t("password")}
                            style={styles.input}
                            status={passwordState}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                            }}
                            accessoryRight={ToggleShowPass()}
                        />
                        <Input
                            size="medium"
                            secureTextEntry={showPW}
                            textContentType="password"
                            label={t("confirm_password")}
                            style={styles.input}
                            status={passwordState}
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                            }}
                            accessoryRight={ToggleShowPass()}
                        />
                        {/*** OFFER CHOICE  ***/}
                        {/* <SpecialText
                        FontSize={17}
                        text={t("choose_offer") + " : "}
                    />
                    {availableOffers && availableOffers.length > 0 && (
                        <SelectDropdown
                            data={availableOffers}
                            onSelect={(selectedItem, index) => {
                                setSelectedOffer(selectedItem);
                                getPricesForOffer(selectedItem.id);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <Layout
                                        style={{
                                            ...styles.dropdownButtonStyle,
                                            backgroundColor:
                                                theme[
                                                    "background-basic-color-2"
                                                ],
                                            borderWidth: 1,
                                        }}
                                    >
                                        {!selectedItem && (
                                            <SpecialText
                                                FontSize={19}
                                                text={t("select_offer")}
                                            />
                                        )}
                                        {selectedItem && (
                                            <SpecialText
                                                FontSize={19}
                                                text={
                                                    i18n.language === "fr"
                                                        ? selectedItem.nameFr
                                                        : selectedItem.nameEn
                                                }
                                            />
                                        )}

                                        {isOpened ? <DownArrow /> : <UpArrow />}
                                    </Layout>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View
                                        style={{
                                            ...styles.dropdownItemStyle,
                                            ...(isSelected && {
                                                backgroundColor: "#D2D9DF",
                                            }),
                                        }}
                                    >
                                        <SpecialText
                                            FontSize={17}
                                            text={
                                                i18n.language === "fr"
                                                    ? item.nameFr
                                                    : item.nameEn
                                            }
                                        />
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                    )}
                    {offerPrices && offerPrices.length > 0 && (
                        <SelectDropdown
                            data={offerPrices}
                            onSelect={(selectedItem, index) => {
                                setSelectedPrice(selectedItem);
                            }}
                            renderButton={(selectedItem, isOpened) => {
                                return (
                                    <Layout
                                        style={{
                                            ...styles.dropdownButtonStyle,
                                            backgroundColor:
                                                theme[
                                                    "background-basic-color-2"
                                                ],
                                            borderWidth: 1,
                                        }}
                                    >
                                        {!selectedItem && (
                                            <SpecialText
                                                FontSize={19}
                                                text={t("select_price")}
                                            />
                                        )}
                                        {selectedItem && (
                                            <SpecialText
                                                FontSize={19}
                                                text={`${
                                                    selectedItem["length"]
                                                } ${t("day_short")} ${t(
                                                    "for"
                                                )}  ${selectedItem.price} dt`}
                                            />
                                        )}

                                        {isOpened ? <DownArrow /> : <UpArrow />}
                                    </Layout>
                                );
                            }}
                            renderItem={(item, index, isSelected) => {
                                return (
                                    <View
                                        style={{
                                            ...styles.dropdownItemStyle,
                                            ...(isSelected && {
                                                backgroundColor: "#D2D9DF",
                                            }),
                                        }}
                                    >
                                        <SpecialText
                                            FontSize={17}
                                            text={`${item["length"]} ${t(
                                                "day_short"
                                            )} ${t("for")}  ${item.price} dt`}
                                        />
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={styles.dropdownMenuStyle}
                        />
                    )} */}
                        <Button
                            size="large"
                            style={{ ...styles.touchable, width: "94%" }}
                            onPress={() => {
                                handleRegister();
                            }}
                        >
                            <SpecialText FontSize={20} text={t("signup")} />
                        </Button>

                        <View style={styles.signInDiv}>
                            <SpecialText
                                FontSize={17}
                                text={t("have_account")}
                            />
                            <Button
                                size="small"
                                activeOpacity={0.2}
                                style={{
                                    ...styles.touchable,
                                    backgroundColor:
                                        theme["background-basic-color-2"],
                                    borderWidth: 1,
                                }}
                                onPress={() => {
                                    router.push("/user/login");
                                }}
                            >
                                <SpecialText
                                    FontWeight="500"
                                    extStyle={{ padding: 10 }}
                                    FontSize={17}
                                    text={t("login")}
                                />
                            </Button>
                        </View>
                    </Layout>
                </TouchableWithoutFeedback>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
    },
    nameView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    nameInput: {
        width: "50%",
        padding: 10,
    },
    signInDiv: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 8,
    },
    viewContainer: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        padding: 20,
    },

    touchable: { padding: 8, margin: 8, borderRadius: 5, borderWidth: 1 },
    text: { alignSelf: "center", fontSize: 20 },
    dropdownButtonStyle: {
        width: "80%",
        height: 60,
        borderRadius: 5,
        borderColor: "lightgrey",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        margin: 10,
    },

    dropdownMenuStyle: {
        backgroundColor: "#E9ECEF",
        borderRadius: 5,
    },
    dropdownItemStyle: {
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: "500",
        color: "#151E26",
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});

export default Signup;
