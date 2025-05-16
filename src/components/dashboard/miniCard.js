import { getRGBAColor } from "@_helpers/utils";
import { SpecialText } from "@components/specialText";
import { Card, Divider, useTheme } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import AnimatedNumber from "react-native-animated-numbers";

const MiniCard = ({
    text = "",
    number = 0,
    width = 45,
    unit = "Kg",
    opositeMinus = true,
    color = null,
}) => {
    const theme = useTheme();

    return (
        <>
            <Card
                style={{
                    ...styles.card,
                    maxWidth: width + "%",
                    minWidth: width + "%",
                }}
            >
                <LinearGradient
                    colors={[
                        getRGBAColor(color, 0.2).backgroundColor,
                        "transparent"
                    ]}
                    style={styles.background}
                />
                <SpecialText FontSize={15} text={text} />
                <Divider style={{ marginVertical: 4, maxWidth: "60%" }} />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    {number > 0 && opositeMinus && (
                        <SpecialText FontSize={23} text={"-"} />
                    )}
                    <AnimatedNumber
                        containerStyle={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        animationDuration={100}
                        animateToNumber={number}
                        fontStyle={{
                            fontSize: 20,
                            fontFamily: "PacificoRegular",
                            color: theme["text-basic-color"],
                        }}
                    />
                    <SpecialText
                        FontSize={15}
                        extStyle={{ marginTop: 10 }}
                        FontFamily={"PacificoRegular"}
                        text={unit}
                    />
                </View>
            </Card>
        </>
    );
};
export default MiniCard;

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 1,
        shadowRadius: 16.0,
        elevation: 6,
        zIndex: 10,
    },
    background: {
        position: "absolute",
        right: -20,
        top: -20,
        height: "120%",
        width:'200%',
        zIndex: -20,
    },
});
