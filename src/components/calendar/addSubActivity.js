import { SpecialText } from "@components/specialText";
import { Text, Button, Input } from "@ui-kitten/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

const AddSubActivity = ({ latestTime = "00:00", addSubActivity }) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState();
    const [durHours, setDurHours] = useState("00");
    const [durMinute, setDurMinute] = useState("00");
    const [durSeconds, setDurSeconds] = useState("00");
    const handlePress = () => {
        addSubActivity(title, `${durHours}:${durMinute}:${durSeconds}`);
    };
    const handleHours = (val) => {
        if (val > 99) {
            setDurHours(`00`);
            return;
        }
        if (val < 10) setDurHours(`0${val}`);
        else setDurHours(val);
    };
    const handleMinutes = (val) => {
        if (val > 59) {
            const hours = parseInt(
                durHours.replace(",", "").replace("-", "").trim()
            );
            setDurMinute(`${val - 60}`);
            if (hours) setDurHours(`${hours + 1}`);
            else setDurHours(`01`);
        } else {
            setDurMinute(val);
        }
    };
    const handleSeconds = (val) => {
        if (val > 59) {
            const minute = parseInt(
                durHours.replace(",", "").replace("-", "").trim()
            );
            setDurSeconds(`${val - 60}`);
            if (minute) setDurMinute(`${minute + 1}`);
            else setDurMinute(`01`);
        } else {
            setDurSeconds(val);
        }
    };
    return (
        <View style={{ margin: 10 }}>
            <SpecialText FontSize={15} text={t("time")} />
            <SpecialText FontSize={15} text={latestTime} />

            <Input
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                maxLength={30}
                label={t("title")}
            />
            <SpecialText FontSize={15} text={t("duration")} />
            <View style={styles.choice}>
                <Input
                    style={styles.input}
                    maxLength={2}
                    value={durHours}
                    selectTextOnFocus
                    onChangeText={(val) => {
                        handleHours(val);
                    }}
                    inputMode="decimal"
                />
                <Text>{" : "}</Text>
                <Input
                    style={styles.input}
                    maxLength={2}
                    value={durMinute}
                    selectTextOnFocus
                    onChangeText={(val) => {
                        handleMinutes(val);
                    }}
                    inputMode="decimal"
                />
                <Text>{" : "}</Text>
                <Input
                    style={styles.input}
                    maxLength={2}
                    value={durSeconds}
                    selectTextOnFocus
                    onChangeText={(val) => {
                        handleSeconds(val);
                    }}
                    inputMode="decimal"
                />
            </View>
            <Button
                style={styles.btn}
                onPress={() => {
                    handlePress();
                }}
            >
                <SpecialText FontSize={15} text={t("confirm")} />
            </Button>
        </View>
    );
};
export default AddSubActivity;
const styles = StyleSheet.create({
    btn: {
        flex: 1,
    },
    input: {
        paddingVertical: 8,
        zIndex: 20,
    },
    choice: {
        flex: 1,
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
