import { Button, Card, Divider, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { SpecialText } from "../specialText";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { getFormattedTime } from "@_helpers/utils";
import { useSelector } from "react-redux";
import { TrashIcon } from "@components/icons";
import { deleteSubActivity } from "@_helpers/services/activityServices";
const FullWorkout = ({ item }) => {
    const hasAccess =
        useSelector((state) => state.user.role) === "ADMIN" ||
        useSelector((state) => state.user.role) === "ROOT";
    // const hasAccess = false
    const [visible, setVisible] = useState(true);
    const buttonPressed = (id) => {
        deleteSubActivity(id);
        setVisible(false)
    };
    const { t } = useTranslation();
    console.log(item.title);
    return (
        <>
            {visible && (
                <Card style={styles.container}>
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <View style={{ minWidth: "40%" }}>
                            <SpecialText FontSize={20} text={item.title} />
                        </View>
                        <View style={styles.timeDurContainer}>
                            <SpecialText
                                FontSize={15}
                                text={
                                    t("duration") +
                                    " : " +
                                    item.duration
                                }
                            />
                        </View>

                        {hasAccess && (
                            <View style={styles.itemButtonContainer}>
                                <Button
                                    status="danger"
                                    onPress={() => {
                                        buttonPressed(item.id);
                                    }}
                                    accessoryLeft={TrashIcon}
                                ></Button>
                            </View>
                        )}
                    </View>
                </Card>
            )}
        </>
    );
};
export default React.memo(FullWorkout);

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0,
        minWidth: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
    },
    timeDurContainer: {
        flexDirection: "col",
        borderLeftWidth: 0.5,
        marginLeft: 10,
        paddingLeft: 10,
        minWidth: "40%",
        justifyContent: "flex",
    },
});
