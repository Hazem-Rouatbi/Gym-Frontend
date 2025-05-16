import { Card } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { SpecialText } from "../specialText";
import { useTranslation } from "react-i18next";
import { getFormattedTime } from "@_helpers/utils";
const Activity = ({
    hour = "10:00:00",
    endHour = "10:05:00",
    weightLoss = "10",
    title = "title",
    duration = "00:10:00",
}) => {
    const { t } = useTranslation();
    return (
        <Card style={{ ...styles.container }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ minWidth: "40%" }}>
                    <SpecialText FontSize={20} text={title} />
                </View>
                <View style={styles.timeDurContainer}>
                    <SpecialText
                        FontSize={15}
                        text={
                            getFormattedTime(hour) +
                            " - " +
                            getFormattedTime(endHour)
                        }
                    />
                </View>
            </View>
            <SpecialText
                FontSize={15}
                text={t("weight_loss") + " : " + weightLoss}
            />
        </Card>
    );
};
export default Activity;
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
