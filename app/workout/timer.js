import { Button, Layout, Text, useTheme } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
    CircleTimer,
    makeColorsArrayWithLength,
    makeTimesArrayWithLength,
} from "@components/circleTImer/circleTimer";
import { SpecialText } from "@components/specialText";
import { useDispatch, useSelector } from "react-redux";
import { getTimeInSecFromDuration } from "@_helpers/utils";
import { useTranslation } from "react-i18next";
import { setCurrentSubActivities } from "@_helpers/redux/activitiesReducer";
import { router } from "expo-router";
import FullWorkoutList from "@components/calendar/fullWorkoutList";

const Timer = () => {
    const theme = useTheme();
    const [reset, setReset] = useState(0);
    const [time, setTime] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [timeLoaded, setTimeLoaded] = useState(false);
    const subActivities = useSelector(
        (state) => state.workout.currentSubActivities
    );
    const dispatch = useDispatch();
    const [colorList, setColorList] = useState(null);
    const [colorTimes, setColorTimes] = useState(null);
    const { t } = useTranslation();
    useEffect(() => {
        const durationInSec = getTimeInSecFromDuration(
            subActivities[0].duration
        );
        // const durationInSec = 2;
        if (durationInSec > 0) {
            setTime(durationInSec);
            setTimeLoaded(true);
        }
    }, []);
    useEffect(() => {
        setColorList(
            makeColorsArrayWithLength(
                theme["color-primary-300"],
                theme["color-primary-700"],
                time
            )
        );
        setColorTimes(makeTimesArrayWithLength(time));
    }, [time, reset]);

    const handleRest = () => {
        setPlaying(false);
        reset > 0 ? setReset(0) : setReset(reset + 1);
    };

    const handleNextActivity = () => {
        console.log(subActivities[1]);
        if (subActivities[1]?.id) {
            const subActivitiesArray = [...subActivities];
            subActivitiesArray.shift();
            dispatch(
                setCurrentSubActivities({ subActivities: subActivitiesArray })
            );
            router.replace("/workout/timer");
        } else {
            dispatch(setCurrentSubActivities({ subActivities: null }));
            router.replace("/workout/calendar");
        }
    };
    return (
        timeLoaded && (
            <Layout style={styles.container} level="1">
                {/* <Button style={{ margin: 10 }} onPress={() => { handleRest() }}><Text>reset</Text></Button> */}
                <CircleTimer
                    onComplete={()=>setPlaying(!playing)}
                    isPlaying={playing}
                    reset={reset}
                    time={time}
                    colorTimes={colorTimes}
                    colorList={colorList}
                />
                <Button
                    style={{ borderRadius: 100, padding: 4, margin: 3 }}
                    onPress={() => {
                        setPlaying(!playing);
                    }}
                >
                    <SpecialText
                        FontSize={17}
                        text={playing ? t("stop") : t("resume")}
                    />
                </Button>
                <Button
                    style={{ borderRadius: 100, padding: 4, margin: 3 }}
                    onPress={() => {
                        handleNextActivity();
                    }}
                >
                    <SpecialText FontSize={17} text={t("go_next_activity")} />
                </Button>
                {subActivities[1] && (
                    <>
                        <SpecialText FontSize={17} text={t("next_activity")} />
                        <FullWorkoutList item={subActivities[1]} />
                    </>
                )}
                {!subActivities[1] && (
                    <SpecialText FontSize={25} text={t("end_of_exercice")} />
                )}
            </Layout>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    btnTitle: {
        fontSize: 40,
        fontWeight: "bold",
    },
});

export default Timer;
