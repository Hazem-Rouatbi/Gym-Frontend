import { Button, Modal, useTheme } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { SpecialText } from "@components/specialText";
import Collapsible from "react-native-collapsible";
import { useEffect, useState } from "react";
import { getRGBAColor } from "@_helpers/utils";
import { ArrowDownIconSvg } from "@_helpers/constants";
import { SvgXml } from "react-native-svg";
import { getMemberships } from "@_helpers/services/userService";
import OfferCard from "./offerCard";
import { plusOutline, PlusSquareIcon } from "@components/icons";
import AddOffer from "./addOffer";
import {
    getMembershipTypes,
    getMembershipTypesWithoutImages,
} from "@_helpers/services/membershipService";
const ArrowDownIcon = (props) => (
    <SvgXml xml={ArrowDownIconSvg} width={25} height={25} {...props} />
);

const UserOffers = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [offerSettingsCollapsed, setOfferSettingsCollapsed] = useState(true);
    const [offerSettingsRotation, setOfferSettingsRotation] = useState(0);
    const [userMemberships, setUserMemberships] = useState(null);
    const [availableOffers, setAvailableOffers] = useState([]);
    useEffect(() => {
        !offerSettingsCollapsed
            ? setOfferSettingsRotation(180)
            : setOfferSettingsRotation(0);
    }, [offerSettingsCollapsed]);
    useEffect(() => {
        getMemberships().then((res) => {
            setUserMemberships(res.data);
        });
    }, []);

    return (
        <View style={{ ...styles.itemsContainer, marginVertical: 10 }}>
            <Button
                accessoryRight={ArrowDownIcon({
                    rotation: offerSettingsRotation,
                    fill: theme["text-basic-color"],
                })}
                style={{
                    ...styles.basicBtn,
                    ...getRGBAColor(theme["background-basic-color-1"], 0.5),
                }}
                onPress={() => {
                    setOfferSettingsCollapsed(!offerSettingsCollapsed);
                    if (!availableOffers || availableOffers?.length < 1)
                        getMembershipTypesWithoutImages().then((res) => {
                            if (res.data && res.data?.length > 0)
                                setAvailableOffers(res.data);
                        });
                }}
            >
                <SpecialText FontSize={17} text={t("offer_settings")} />
            </Button>

            <Collapsible
                style={styles.itemsContainer}
                collapsed={offerSettingsCollapsed}
            >
                <AddOffer availableOffers={availableOffers} />
                {!userMemberships && (
                    <View style={{ margin: 10 }}>
                        <SpecialText
                            FontSize={16}
                            text={t("no_subscriptions")}
                        />
                    </View>
                )}
                {userMemberships &&
                    userMemberships?.length > 0 &&
                    userMemberships.map((membership) => (
                        <View style={{ flex: 1, marginVertical: 8 }}>
                            <OfferCard membership={membership} />
                        </View>
                    ))}
            </Collapsible>
        </View>
    );
};
export default UserOffers;

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
});
