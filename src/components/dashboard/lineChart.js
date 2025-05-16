import { getRGBAColor } from "@_helpers/utils";
import { SpecialText } from "@components/specialText";
import { Card, useTheme } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import {
    Area,
    Chart,
    HorizontalAxis,
    Line,
    Tooltip,
    VerticalAxis,
} from "react-native-responsive-linechart";

const LineChartCard = ({ data = null }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const minData = data ? Math.min.apply(null, data) : 0;
    const maxData = data ? Math.max.apply(null, data) : 0;
    const [chartData, setChartData] = useState([]);
    const xAxis = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
    ];
    useEffect(() => {
        const formattedData = [];
        for (let i = 0; i < data.length; i++) {
            formattedData.push({ x: parseInt(xAxis[i]), y: data[i] });
        }
        setChartData(formattedData);
    }, [data]);
    return (
        data &&
        data.length === xAxis.length && (
            <Chart
                style={{
                    width: "89%",
                    borderRadius: 20,
                    height: 220,
                }}
                padding={{ left: 40, bottom: 20, right: 40, top: 30 }}
                xDomain={{ min: 1, max: 30 }}
                yDomain={{
                    min: Math.floor(minData - 10),
                    max: Math.floor(maxData + 10),
                }}
                data={chartData}
            >
                <SpecialText FontSize={20} text={t("weight")} />
                <VerticalAxis
                    tickCount={5}
                    theme={{
                        labels: {
                            formatter: (v) => {
                                return parseFloat(v).toFixed(0);
                            },
                        },
                    }}
                />
                <HorizontalAxis
                    tickCount={5}
                    theme={{
                        labels: {
                            formatter: (v) => {
                                return parseFloat(v).toFixed(0);
                            },
                        },
                    }}
                />
                <Area
                    theme={{
                        gradient: {
                            from: {
                                color: getRGBAColor(
                                    theme["color-primary-500"],
                                    0.2
                                ).backgroundColor,
                            },
                            to: {
                                color: getRGBAColor(
                                    theme["color-primary-500"],
                                    0.1
                                ).backgroundColor,
                                opacity: 0.2,
                            },
                        },
                    }}
                />
                <Line
                    tooltipComponent={<Tooltip />}
                    smoothing="bezier"
                    theme={{
                        stroke: {
                            color: theme["text-primary-color"],
                            width: 5,
                        },
                        scatter: {
                            default: {
                                width: 8,
                                height: 8,
                                rx: 4,
                                color: theme["text-basic-color"],
                            },
                            selected: { color: "red" },
                        },
                    }}
                />
            </Chart>
        )
    );
};
export default LineChartCard;

const styles = StyleSheet.create({
    card: {
        width: "90%",
        alignContent: "center",
        justifyContent: "center",
    },
});
