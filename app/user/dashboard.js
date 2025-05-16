import { getStats } from "@_helpers/services/userService";
import Activity from "@components/dashboard/activity";
import LineChartCard from "@components/dashboard/lineChart";
import MiniCard from "@components/dashboard/miniCard";
import { SpecialText } from "@components/specialText";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Collapsible from "react-native-collapsible";
import { showMessage } from "react-native-flash-message";
import WigglyLine from "@assets/lines/wiggly.svg";

const {
    Text,
    Layout,
    Card,
    Button,
    useTheme,
} = require("@ui-kitten/components");
const { View, ScrollView, StyleSheet, Dimensions } = require("react-native");
const Dashboard = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [fullData, setFullData] = useState(null);
    const [activities, setActivities] = useState(null);
    const [recentActivity, setRecentActivity] = useState(true);
    useEffect(() => {
        getStats().then((res) => {
            if (res.status) {
                setFullData(res.data);
                console.log(res.data);
            } else
                showMessage({
                    message: t("server_error"),
                    type: "danger",
                });
        });
    }, []);
    useEffect(() => {
        if (fullData?.activities)
            setActivities(
                fullData.activities?.map((act) => {
                    return (
                        <Activity
                            title={act?.title}
                            endHour={act?.endTime}
                            duration={act?.duration}
                            hour={act?.hour}
                            weightLoss={act?.weightLoss}
                        />
                    );
                })
            );
    }, [fullData]);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Layout
                style={{
                    flex: 1,
                    width: "100%",
                    alignContent: "center",
                    alignItems: "center",
                }}
            >
                {/* <LinearGradient
                    colors={[
                        getRGBAColor(theme["color-primary-500"], 0.5)
                            .backgroundColor,
                        getRGBAColor(theme["color-primary-100"], 0.9)
                            .backgroundColor,
                    ]}
                    style={styles.background}
                /> */}
                <View
                    style={{
                        position: "absolute",
                        left: 0,
                        top: -150,
                        zIndex: -10,
                        transform: [{ rotateY: "0deg" }],
                    }}
                >
                    <WigglyLine
                        width={800}
                        style={{
                            opacity: 0.8,
                            color: theme["background-alternative-color-1"],
                        }}
                    />
                    <WigglyLine
                        style={{
                            opacity: 0.8,
                            color: theme["background-alternative-color-1"],
                            transform: [{ rotateZ: "90deg" }],
                        }}
                        width={800}
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        margin: 10,
                        justifyContent: "space-between",
                    }}
                >
                    <MiniCard
                        text={t("weight_lost_month")}
                        number={fullData?.totalWeightLost}
                        color={theme["color-warning-500"]}
                    />
                    <MiniCard
                        text={t("calories_burned_month")}
                        number={fullData?.totalCaloriesBurnet}
                        opositeMinus={false}
                        unit="Cal"
                        color={theme["color-danger-200"]}
                    />
                </View>
                {fullData?.monethWeightVals &&
                    fullData?.monethWeightVals.length > 0 && (
                        <LineChartCard data={fullData?.monethWeightVals} />
                    )}
                <Card style={{ width: "80%", marginTop: 10 }}>
                    <SpecialText
                        FontSize={20}
                        text={t("BMI") + " : " + fullData?.BMI?.toFixed(2)}
                    />
                    {fullData?.BMI == 0 && (
                        <SpecialText
                            FontSize={10}
                            text={t("weight_height_not_set")}
                        />
                    )}
                </Card>
                <Button
                    onPress={() => setRecentActivity(!recentActivity)}
                    style={{ width: "80%", marginTop: 10 }}
                >
                    <SpecialText FontSize={20} text={t("recent_activities")} />
                </Button>
                <Collapsible
                    collapsed={recentActivity}
                    style={styles.collapsible}
                >
                    {activities}
                </Collapsible>
            </Layout>
        </ScrollView>
    );
};
export default Dashboard;

const styles = StyleSheet.create({
    collapsible: {},
    container: {
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        minHeight: "100%",
        flexDirection: "col",
        FontFamily: "Comfortaa",
        FontWeight: "500",
        padding: 0,
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height:"100%",
        zIndex:-20,
    },
});
