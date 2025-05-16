import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    Button,
    Divider,
    IndexPath,
    Input,
    Layout,
    Modal,
    Select,
    SelectItem,
    Text,
} from "@ui-kitten/components";
import {
    getCurrentDate,
    getCurrentTime,
    getRGBAColor,
} from "../../_helpers/utils";
import { useTranslation } from "react-i18next";
import DatePicker from "./datePicker";
import TimePicker from "./timePicker";
import { plusOutline } from "../icons";
import { showMessage } from "react-native-flash-message";
import { addActivityReq } from "../../_helpers/services/activityServices";
import { getMembershipTypesWithoutImages } from "@_helpers/services/membershipService";
import { useSelector } from "react-redux";

export const PopoverWithButton = (props) => {
    const handleDateSelect = (date) => {
        const setDate = new Date(date);
        const currentDate = setDate.toISOString().split("T")[0];
        console.log(currentDate);
        setSelectedDate(currentDate);
    };

    const handleTimeSelect = (time) => {
        const setTime = new Date(time);
        let currentHour = setTime.getHours();
        let currentMinute = setTime.getMinutes();
        currentMinute === 0 ? (currentMinute = "00") : currentMinute;
        currentHour < 10 ? (currentHour = `0${currentHour}`) : currentHour;
        console.log(`${currentHour}:${currentMinute}`);
        setSelectedTime(`${currentHour}:${currentMinute}`);
    };

    // const handleHours = (val) => {
    //     if (val > 99) {
    //         setDurHours(`00`);
    //         return;
    //     }
    //     if (val < 10) setDurHours(`0${val}`);
    //     else setDurHours(val);
    // };
    // const handleMinutes = (val) => {
    //     if (val > 59) {
    //         const hours = parseInt(
    //             durHours.replace(",", "").replace("-", "").trim()
    //         );
    //         setDurMinute(`${val - 60}`);
    //         if (hours) setDurHours(`${hours + 1}`);
    //         else setDurHours(`1`);
    //     } else {
    //         setDurMinute(val);
    //     }
    // };
    const handleCancel = () => {
        setSelectedDate(getCurrentDate());
        setSelectedTime(getCurrentTime());
        // setDurHours("00");
        // setDurMinute("00");
        setVisible(false);
    };
    const handleAccept = () => {
        // if (durMinute === "00" && durHours === "00") {
        //     showMessage({
        //         message: t("fill_duration"),
        //         type: "danger",
        //     });
        //     return;
        // }
        console.log({
            date: selectedDate,
            hour: selectedTime,
            // duration: `${durHours}:${durMinute}`,
            title: title,
            membershipTypeId: membershipTypes[membershipSelectedId - 1].id,
            weightLoss: weightLoss,
        });

        addActivityReq({
            date: selectedDate,
            hour: selectedTime,
            // duration: `${durHours}:${durMinute}`,
            title: title,
            membershipTypeId: parseInt(
                membershipTypes[membershipSelectedId - 1].id
            ),
            weightLoss: weightLoss,
        }).then((res) => {
            if (res.success === false)
                return showMessage({
                    message: res.message,
                    type: "danger",
                });
        });

        resetLoaded();
        handleCancel();
    };
    useEffect(() => {
        getMembershipTypesWithoutImages().then((res) => {
            if (res.data) {
                const data = res.data;
                setMembberShipTypes(data);
                const items = [];
                data.forEach((membershipType) => {
                    items.push(
                        <SelectItem
                            key={membershipType.id}
                            title={
                                i18n.language === "fr"
                                    ? membershipType.nameFr
                                    : membershipType.nameEn
                            }
                        />
                    );
                });
                setSelections(items);
            } else
                showMessage({
                    type: "danger",
                    message: res.message,
                });
        });
    }, []);

    /* {membershipTypes.forEach((membershipType) => {
                                <SelectItem
                                    title={
                                        i18n.language === "fr"
                                            ? membershipType.nameFr
                                            : membershipType.nameEn
                                    }
                                />;
                            })} */
    const { t, i18n } = useTranslation();
    const { theme, resetLoaded } = props;

    const [selections, setSelections] = useState(
        <SelectItem title={t("no_membership")} />
    );
    const [weightLoss, setWeightLoss] = useState("0");
    const [membershipTypes, setMembberShipTypes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());
    const [selectedTime, setSelectedTime] = useState(getCurrentTime());
    // const [durMinute, setDurMinute] = useState("00");
    // const [durHours, setDurHours] = useState("00");
    const [title, setTitle] = useState("");
    const [membershipSelectedId, setMembershipSelectedId] = useState(
        new IndexPath(0)
    );
    const hasAccess =
        useSelector((state) => state.user.role) === "ADMIN" ||
        useSelector((state) => state.user.role) === "ROOT";

    return (
        <>
            {hasAccess && (
                <Button
                    style={styles.addBtn}
                    appearance="primary"
                    onPress={() => {
                        setVisible(true);
                    }}
                    accessoryLeft={plusOutline({
                        fillColor: theme ? theme["color-primary-200"] : "white",
                        width: 45,
                        height: 45,
                    })}
                ></Button>
            )}
            <Modal
                backdropStyle={getRGBAColor(theme["background-basic-color-4"])}
                visible={visible}
                style={{ top: "10%" }}
            >
                <Layout style={styles.content}>
                    <Text style={styles.title} category="h3">
                        {t("add_activity")}
                    </Text>

                    <Text style={styles.text} category="label">
                        {t("activity")}
                    </Text>
                    <Input
                        style={styles.input}
                        onChangeText={setTitle}
                        maxLength={30}
                    />

                    <Text style={styles.text} category="label">
                        {t("weight_loss")}
                    </Text>
                    <Input
                        style={styles.input}
                        onChangeText={setWeightLoss}
                        maxLength={30}
                    />
                    <Text style={styles.text} category="label">
                        {t("membership_type")}
                    </Text>
                    {membershipTypes && membershipTypes?.length > 0 && (
                        <Select
                            value={
                                i18n.language === "fr"
                                    ? membershipTypes[membershipSelectedId - 1]
                                          .nameFr
                                    : membershipTypes[membershipSelectedId - 1]
                                          .nameEn
                            }
                            selectedIndex={membershipSelectedId}
                            onSelect={(index) => setMembershipSelectedId(index)}
                        >
                            {selections}
                        </Select>
                    )}

                    <Divider style={styles.divider} />

                    <DatePicker
                        cStyle={styles.input}
                        backdrop={getRGBAColor(
                            theme["background-basic-color-3"],
                            0.3
                        )}
                        onDatePick={handleDateSelect}
                    />
                    <TimePicker
                        cstyle={styles.input}
                        onTimePick={handleTimeSelect}
                    />
                    {/* <Text
                        style={{ ...styles.text, alignSelf: "center" }}
                        category="label"
                    >
                        {t("duration")}
                    </Text>
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
                    </View> */}

                    <View style={styles.choice}>
                        <Button
                            onPress={handleCancel}
                            style={{
                                ...styles.choiceBtn,
                                backgroundColor:
                                    theme["background-color-danger"],
                            }}
                        >
                            {t("cancel")}
                        </Button>

                        <Button onPress={handleAccept} style={styles.choiceBtn}>
                            {t("confirm")}
                        </Button>
                    </View>
                </Layout>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    content: {
        top: "10%",
        backgroundColor: null,
        flex: 1,
        justifyContent: "center",
        padding: 5,
        paddingHorizontal: 8,
    },
    title: {
        paddingVertical: 8,
        alignSelf: "center",
    },
    backdrop: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    addIcon: {
        width: 50,
        height: 50,
    },
    input: {
        paddingVertical: 8,
        zIndex: 20,
    },
    addBtn: {
        position: "absolute",
        width: 50,
        height: 50,
        bottom: 20,
        left: 325,
        borderRadius: 100,
    },
    choice: {
        flex: 1,
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    choiceBtn: {
        marginHorizontal: 8,
    },
    divider: {
        marginVertical: 10,
    },
});
