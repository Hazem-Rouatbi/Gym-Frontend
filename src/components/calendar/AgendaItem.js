import isEmpty from "lodash/isEmpty";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Button, Text, useTheme, Modal, Icon } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { CheckMarkIcon, TrashIcon } from "../icons";
import { getFormattedTime, getRGBAColor } from "../../_helpers/utils";
import FullWorkout from "./fullWorkoutList";
import { SpecialText } from "@components/specialText";
import AddSubActivity from "./addSubActivity";
import { useDispatch, useSelector } from "react-redux";
import {
    addSubActivityReq,
    getSubActivitiesReq,
    joinActivity,
} from "@_helpers/services/activityServices";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { setCurrentSubActivities } from "@_helpers/redux/activitiesReducer";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const HorizontalGradient = ({ color = theme["color-primary-100"] }) => (
    <LinearGradient
        colors={[
            getRGBAColor(color, 0.2).backgroundColor,
            getRGBAColor(color, 0.05).backgroundColor,
        ]}
        start={{ x: 0.1, y: 0.5 }}
        end={{ x: 0.9, y: 0.5 }}
        style={styles.background}
    />
);
const AgendaItem = (props = { item, buttonPressed, navigateToDate }) => {
    const { item, buttonPressed } = props;
    const { custStyle } = props;
    const [visible, setVisible] = useState(false);
    const { t, i18n } = useTranslation();
    const [addSubActivity, setAddSubActivity] = useState(false);
    const [fullWorkout, setFullWorkout] = useState(null);
    const [subActivities, setSubActivities] = useState(null);
    const flashRef = useRef();
    const theme = useTheme();
    const [backdrop, setBackDrop] = useState("rgba(0, 0, 0, 0.5)");
    const [joined, setJoined] = useState(item.joined);
    const [participants, setParticipants] = useState(item.numberOfParticipants);
    const dispatch = useDispatch();
    const hasAccess =
        useSelector((state) => state.user.role) === "ADMIN" ||
        useSelector((state) => state.user.role) === "ROOT";
    useEffect(() => {
        if (theme)
            setBackDrop(getRGBAColor(theme["background-basic-color-1"], 0.9));
    }, []);
    if (isEmpty(item)) {
        return (
            <View style={styles.emptyItem}>
                <Text style={styles.emptyItemText}>{t("no_plan")}</Text>
            </View>
        );
    }
    const renderItem = useCallback(
        ({ workout = null, index = null }) => {
            return <FullWorkout key={index} item={workout} />;
        },
        [fullWorkout]
    );

    const addSubActivityFn = (title, duration) => {
        addSubActivityReq({ title, duration, activityId: item.id });
        setFullWorkout(
            fullWorkout
                ? [
                      ...fullWorkout,
                      renderItem({
                          workout: { title: title, duration: duration },
                      }),
                  ]
                : setFullWorkout([
                      renderItem({
                          workout: { title: title, duration: duration },
                      }),
                  ])
        );
    };
    const getSubActivitiesFn = () => {
        getSubActivitiesReq(item.id).then((res) => {
            if (res?.data) {
                setSubActivities(res.data);
                setFullWorkout(
                    res?.data
                        ? res.data.map((workout, index) =>
                              renderItem({ workout, index })
                          )
                        : null
                );
            }
        });
    };
    const disabled = useMemo(() => (item.disabled ? { opacity: 0.5 } : null));
    const closeModal = () => {
        setVisible(false);
        setAddSubActivity(false);
    };
    const handleJoinActivty = () => {
        joinActivity(item.id).then((res) => {
            if (res?.message) {
                flashRef.current.showMessage({
                    type: "danger",
                    message: res.message,
                });
            }
            setJoined(true);
            setParticipants(participants + 1);
        });
    };
    const handleStartActivity = () => {
        if (subActivities && subActivities.length > 0) {
            dispatch(setCurrentSubActivities({ subActivities: subActivities }));
            router.replace("/workout/timer");
        } else {
            flashRef.current.showMessage({
                type: "danger",
                message: t("no_sub_activities"),
            });
        }
    };
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    if (!item.disabled) {
                        getSubActivitiesFn();
                        setVisible(!visible);
                    } else
                        showMessage({
                            message: t("incorrect_membership"),
                            type: "danger",
                        });
                }}
            >
                <View style={{ ...styles.item, ...custStyle, ...disabled }}>
                    {joined &&
                        CheckMarkIcon({
                            height: 30,
                            width: 30,
                            fill: theme["text-primary-color"],
                        })}
                    <View
                        style={{
                            flex: 1,
                            alignItems: "flex-start",
                            marginRight: 2,
                        }}
                    >
                        <SpecialText
                            FontSize={17}
                            style={{ ...styles.itemTitleText, ...custStyle }}
                            text={item.title}
                        />
                    </View>
                    <View>
                        <SpecialText
                            FontSize={17}
                            style={styles.itemHourText}
                            text={
                                getFormattedTime(item.hour) +
                                " - " +
                                getFormattedTime(item.endTime)
                            }
                        />
                        <SpecialText
                            FontSize={12}
                            style={styles.itemDurationText}
                            text={getFormattedTime(item.duration)}
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

                {item.membershipType.id === "1" && (
                    <HorizontalGradient color={theme["color-primary-200"]} />
                )}
                {item.membershipType.id === "2" && (
                    <HorizontalGradient color={theme["color-danger-200"]} />
                )}
                {item.membershipType.id === "3" && (
                    <HorizontalGradient color={theme["color-warning-200"]} />
                )}
                <SpecialText
                    style={styles.itemTitleText}
                    FontSize={15}
                    text={
                        i18n.language === "fr"
                            ? item.membershipType.nameFr
                            : item.membershipType.nameEn
                    }
                />
            </TouchableOpacity>
            <Modal
                visible={visible}
                backdropStyle={backdrop}
                style={styles.modal}
                onBackdropPress={() => {
                    closeModal();
                }}
            >
                <View style={{}}>
                    <SpecialText
                        FontSize={17}
                        text={`${t("participants")} : ${participants}`}
                    />
                    {!joined && (
                        <Button
                            style={{ paddingHorizontal: 4 }}
                            onPress={() => {
                                handleJoinActivty();
                            }}
                        >
                            <SpecialText
                                FontSize={17}
                                text={t("join_activity")}
                            />
                        </Button>
                    )}
                </View>
                <ScrollView>{fullWorkout}</ScrollView>
                {joined && item.runnable && (
                    <Button
                        onPress={() => handleStartActivity()}
                        style={{ borderRadius: 100, height: 75 }}
                    >
                        <SpecialText
                            FontSize={25}
                            FontWeight={800}
                            text={t("start_activity")}
                        />
                    </Button>
                )}
                <View
                    style={{
                        width: "60%",
                        justifyContent: "center",
                        alignItems: "center  ",
                    }}
                >
                    {addSubActivity && hasAccess && (
                        <AddSubActivity
                            latestTime={getFormattedTime(item.endTime)}
                            addSubActivity={addSubActivityFn}
                        />
                    )}

                    {hasAccess && (
                        <Button
                            onPress={() => {
                                setAddSubActivity(!addSubActivity);
                            }}
                            style={{ marginTop: 10 }}
                        >
                            <SpecialText
                                FontSize={15}
                                text={t("add_sub_activity")}
                            />
                        </Button>
                    )}
                </View>
                <FlashMessage ref={flashRef} position={"bottom"} />
            </Modal>
        </>
    );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
    item: {
        padding: 20,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        flexDirection: "row",
    },
    itemHourText: {
        color: "black",
    },
    itemDurationText: {
        color: "grey",
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    itemTitleText: {
        color: "black",
        marginLeft: 16,
        fontWeight: "bold",
        fontSize: 16,
    },
    itemButtonContainer: {
        flex: 1,
        margin: 0,
        padding: 0,
        alignItems: "flex-end",
    },
    emptyItem: {
        paddingLeft: 20,
        height: 52,
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
    },

    emptyItemText: {
        color: "lightgrey",
        fontSize: 14,
    },
    modal: {
        justifyContent: "center",
        maxHeight: "80%",
        minWidth: "100%",
        alignItems: "center",
        flex: 1,
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
});
