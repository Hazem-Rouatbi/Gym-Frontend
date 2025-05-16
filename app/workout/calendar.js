import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { StyleSheet } from "react-native";
import {
    ExpandableCalendar,
    AgendaList,
    CalendarProvider,
    WeekCalendar,
    LocaleConfig,
} from "react-native-calendars";
import { getMarkedDates } from "@components/calendar/agendaItems";
import AgendaItem from "@components/calendar/AgendaItem";
import { getTheme } from "@components/calendar/theme";
import { useTheme } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { PopoverWithButton } from "@components/datePicker/calendarPopover";
import { deleteActivity } from "@helpers/services/activityServices";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";
import { getPlans, renameKey } from "@_helpers/services/activityServices";



const ExpandableCalendarScreen = (props = { weekView: false }) => {
    const [ITEMS, setITEMS] = useState();
    // ITEMS = PlaceHolderCalendarItems
    const currentDate = useMemo(
        () => new Date().toISOString().split("T")[0],
        []
    );
    const nextYear = useMemo(
        () =>
            new Date(
                new Date().getFullYear() + 1,
                new Date().getMonth(),
                new Date().getDate()
            )
                .toISOString()
                .split("T")[0],
        []
    );
    const appTheme = useTheme();
    const { weekView } = props;
    const dispatch = useDispatch();
    const markedDates = useRef(() => getMarkedDates(ITEMS), [ITEMS]);
    const theme = useMemo(() => getTheme(appTheme), [appTheme]);
    const { t } = useTranslation();
    const todayBtnTheme = useMemo(
        () => ({
            todayButtonTextColor: appTheme["text-basic-color"],
            todayButtonBackgroundColor: appTheme["background-basic-color-1"],
        }),
        [appTheme]
    );

    const [loaded, setLoaded] = useState(false);
    const navigateToDate = (date) => {};

    const renderItem = useCallback(({ item = null }) => {
        return (
            <AgendaItem
                item={item}
                navigateToDate={navigateToDate}
                buttonPressed={buttonPressed}
                custStyle={{
                    backgroundColor: appTheme["background-basic-color-1"],
                }}
            />
        );
    }, []);
    //loading proper language in the calendar
    useEffect(() => {
        LocaleConfig.locales["default"] = {
            dayNames: t("dayNames", { returnObjects: true }),
            dayNamesShort: t("dayNamesShort", { returnObjects: true }),
            monthNames: t("monthNames", { returnObjects: true }),
            monthNamesShort: t("monthNamesShort", { returnObjects: true }),
            today: t("today"),
        };
        LocaleConfig.defaultLocale = "default";
    }, []);
    useEffect(() => {
        if (!ITEMS || !loaded) {
            getPlans().then((res) => {
                if (!res.success || !res.data) {
                    // dispatch(setActivities(null));
                    setITEMS(null);
                } else {
                    renameKey("date", "title", res?.data).then((res) => {
                        if (!res || res == undefined) {
                            // dispatch(setActivities(null));
                            setITEMS(null);
                        } else {
                            // dispatch(setActivities(res));
                            setITEMS(res);
                            markedDates.current = getMarkedDates(res);
                            setLoaded(true);
                        }
                    });
                }
            });
        }
    }, [ITEMS, loaded]);
    const buttonPressed = (id) => {
        deleteActivity(id)
            .then(() => {
                resetLoaded();
            })
            .catch((err) => {
                showMessage({
                    message: t("server_error"),
                });
            });
    };
    const resetLoaded = () => {
        setLoaded(false);
    };

    return (
        markedDates && (
            <CalendarProvider
                date={currentDate}
                style={{
                    position: "relative",
                }}
                theme={todayBtnTheme}
            >
                {weekView ? (
                    <WeekCalendar
                        theme={theme}
                        minDate={currentDate}
                        maxDate={nextYear}
                        marking={true}
                        markedDates={markedDates.current}
                        
                    />
                ) : (
                    <ExpandableCalendar
                        minDate={currentDate}
                        maxDate={nextYear}
                        calendarStyle={{
                            backgroundColor:
                                appTheme["background-basic-color-1"],
                        }}
                        headerStyle={{
                            backgroundColor:
                                appTheme["background-basic-color-1"],
                        }}
                        theme={theme}
                        disableAllTouchEventsForDisabledDays
                        futureScrollRange={12}
                        pastScrollRange={0}
                        firstDay={1}
                        disableWeekScroll={true}
                        markedDates={markedDates.current}
                        marking={true}
                        closeOnDayPress={false}
                    />
                )}
                <AgendaList
                    agenda

                    sections={ITEMS ? ITEMS : []}
                    renderItem={renderItem}
                    theme={theme}
                    sectionStyle={styles.section}
                    contentContainerStyle={{
                        borderTopColor: appTheme["background-basic-color-4"],
                        borderTopWidth: 1,
                        backgroundColor: appTheme["background-basic-color-1"],
                    }}
                />

                <PopoverWithButton resetLoaded={resetLoaded} theme={appTheme} />
            </CalendarProvider>
        )
    );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
    calendar: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    header: {
        backgroundColor: "lightgrey",
    },
    section: {
        textTransform: "capitalize",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
        paddingVertical: 8,
    },
});
