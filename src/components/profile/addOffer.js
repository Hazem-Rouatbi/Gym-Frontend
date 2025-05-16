import React, { useEffect, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Input, Layout, Modal, useTheme } from "@ui-kitten/components";
import {
    DownArrow,
    PlusSquareIcon,
    ToggleEyeIcon,
    UpArrow,
} from "@components/icons";
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
    subscribeToMembership,
} from "@_helpers/services/membershipService";
import SelectDropdown from "react-native-select-dropdown";
import { getRGBAColor } from "@_helpers/utils";
const AddOffer = ({ availableOffers }) => {
    const [offerPrices, setOfferPrices] = useState(null);
    const [visible, setVisible] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const theme = useTheme();
    const { t, i18n } = useTranslation();
    const getPricesForOffer = (offerId) => {
        getMembershipPrices(offerId).then((res) => {
            console.log(res);
            setOfferPrices(res);
        });
    };
    const Subscribe = () => {
        console.log(selectedOffer, selectedPrice);
        subscribeToMembership(selectedOffer.id, selectedPrice.id).then(
            (res) => {
                console.log(res);
                router.navigate('/user/profile')
            }
        );
    };
    return (
        <>
            <Button
                style={{ justifyContent: "center" }}
                accessoryRight={PlusSquareIcon({
                    fill: theme["text-basic-color"],
                })}
                onPress={() => {
                    setVisible(!visible);
                }}
            >
                <SpecialText
                    FontSize={15}
                    text={t("add_or_extend_subscription")}
                />
            </Button>
            <Modal
                backdropStyle={getRGBAColor(
                    theme["background-basic-color-1"],
                    0.8
                )}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                visible={visible}
                onBackdropPress={() => setVisible(!visible)}
            >
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
                                            theme["background-basic-color-2"],
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
                                            theme["background-basic-color-2"],
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
                                            } ${t("day_short")} ${t("for")}  ${
                                                selectedItem.price
                                            } dt`}
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
                )}

                {selectedPrice && (
                    <Button
                        style={{ marginTop: 5 }}
                        onPress={() => {
                            Subscribe();
                        }}
                    >
                        <SpecialText
                            FontSize={20}
                            text={t("add_subscription")}
                        />
                    </Button>
                )}
            </Modal>
        </>
    );
};
export default AddOffer;
const styles = StyleSheet.create({
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
