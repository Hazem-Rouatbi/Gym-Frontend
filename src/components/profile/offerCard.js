import {
    Button,
    Card,
    Divider,
    Modal,
    useTheme,
} from "@ui-kitten/components";
import {
    StyleSheet,
    View,
    useWindowDimensions,
} from "react-native";
import { SpecialText } from "@components/specialText";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getRGBAColor } from "@helpers/utils";
import { AlertTriangleIcon, CheckMarkIcon } from "@components/icons";
const OfferCard = ({ membership }) => {
    const { daysLeft, membershipType, photo } = membership;
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const [visible, setVisible] = useState(false);
    const [backgroundStyle, setBackgroundStyle] = useState(false);
    useEffect(() => {
        if (theme) {
            if (daysLeft > 14) {
                setBackgroundStyle(
                    getRGBAColor(theme["color-primary-500"], 0.5)
                );
            } else if (daysLeft > 7) {
                setBackgroundStyle(
                    getRGBAColor(theme["color-warning-500"], 0.5)
                );
            } else {
                setBackgroundStyle(
                    getRGBAColor(theme["color-danger-500"], 0.5)
                );
            }
        }
    }, [, daysLeft]);
    return (
        <>
            <Card
                onPress={() => {
                    // setVisible(true);
                }}
                activeOpacity={0.5}
                style={{ ...styles.container, ...backgroundStyle }}
            >
                <View>
                    <SpecialText
                        FontSize={30}
                        text={
                            i18n.language === "fr"
                                ? membershipType.nameFr
                                : membershipType.nameEn
                        }
                    />
                </View>
                <Divider />
                <SpecialText FontSize={20} text={t("days_left") + " : "} />
                <SpecialText FontSize={20} text={daysLeft.toString()} />
                {/* <Image
                    source={photo}
                    style={{
                        ...styles.image,
                        width: width,
                        position: "absolute",
                        bottom: -30,
                        right: -5,
                        zIndex: -10,
                        opacity: 0.8,
                    }}
                /> */}
            </Card>
            <Modal
                visible={visible}
                onBackdropPress={() => setVisible(false)}
                style={styles.modal}
                backdropStyle={getRGBAColor(
                    theme["background-basic-color-1"],
                    0.8
                )}
            >
                <View style={styles.subButtons}>
                    <Button
                        style={{
                            ...styles.subButton,
                            backgroundColor: theme["color-primary-700"],
                        }}
                        accessoryRight={CheckMarkIcon({
                            fill: theme["text-basic-color"],
                        })}
                    >
                        <SpecialText
                            FontSize={19}
                            text={t("renew_subscription")}
                        />
                    </Button>
                    <Button
                        style={styles.subButton}
                        appearance="outline"
                        accessoryRight={AlertTriangleIcon({
                            fill: theme["text-basic-color"],
                        })}
                        status="danger"
                    >
                        <SpecialText
                            FontSize={19}
                            text={t("cancel_subscription")}
                        />
                    </Button>
                </View>
            </Modal>
        </>
    );
};
export default OfferCard;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 10,
        borderWidth: 0,
        margin: 0,
        padding: 0,
        height: 200,
        width: "80%",
    },
    row: {
        padding: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    subButtons: {
        flex: 1,
        minHeight: "20%",
        flexWrap: "wrap",
        flexDirection: "col",
        justifyContent: "space-around",
        alignItems: "center",
        margin: 0,
    },
    subButton: {
        borderRadius: 20,
        borderWidth: 0,
    },
    image: {
        height: 200,
        borderRadius: 20,
        marginHorizontal: "auto",
    },
});
