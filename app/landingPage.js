import { Button, Layout, ViewPager, useTheme } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import {
    Animated,
    Dimensions,
    ImageBackground,
    ScrollView,
    StyleSheet,
    View,
    useWindowDimensions,
} from "react-native";
import { SpecialText } from "@components/specialText";
import {
    CircledInfoIcon,
    CornerUpRightArrow,
    LoginIcon,
    PlusSquareIcon,
} from "@components/icons";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import Offer from "@components/landingPage/offer";
import Expect from "@components/landingPage/expect";
import { router } from "expo-router";
import { Expects } from "@helpers/constants";
import { showMessage } from "react-native-flash-message";
import {
    getMembershipPrices,
    getMembershipTypes,
} from "@_helpers/services/membershipService";
import PagerView from "react-native-pager-view";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBAColor } from "@_helpers/utils";

const LandingPage = () => {
    const [availableOffers, setAvailableOffers] = useState([]);
    const { t } = useTranslation();
    const theme = useTheme();
    const scrollViewRef = createRef();
    const ref = useRef();
    const { width } = useWindowDimensions();
    const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
    const positionAnimatedValue = useRef(new Animated.Value(0)).current;
    const inputRange = useRef([0, 3]);
    const scrollX = useRef(
        Animated.add(
            scrollOffsetAnimatedValue,
            positionAnimatedValue
        ).interpolate({
            inputRange: inputRange.current,
            outputRange: [0, 3 * width],
        })
    ).current;
    useEffect(() => {
        getMembershipTypes().then((res) => {
            if (res?.data && res?.data.length > 0) {
                setAvailableOffers(res.data);
                inputRange.current = [0, res.data.length];
            } else {
                showMessage({
                    type: "danger",
                    message: res?.message,
                });
            }
        });
    }, []);

    useEffect(() => {
        scrollX.current = Animated.add(
            scrollOffsetAnimatedValue,
            positionAnimatedValue
        ).interpolate({
            inputRange: inputRange.current,
            outputRange: [0, availableOffers.length * width],
        });
    }, [availableOffers]);

    const onPageScroll = useMemo(
        () =>
            Animated.event(
                [
                    {
                        nativeEvent: {
                            offset: scrollOffsetAnimatedValue,
                            position: positionAnimatedValue,
                        },
                    },
                ],
                { useNativeDriver: false }
            ),
        []
    );
    return (
        <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.container}
        >
            <LinearGradient
                colors={[
                    getRGBAColor(theme["color-primary-100"], 0.05)
                        .backgroundColor,
                    "transparent",
                ]}
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    height: "120%",
                    zIndex: -20,
                }}
            />
            <ImageBackground
                style={{ ...styles.Section, minHeight: 500 }}
                imageStyle={{ opacity: 0.8, borderRadius: 20 }}
                resizeMethod="scale"
                source={require("@assets/splashScreen.jpg")}
            >
                <View style={styles.floatingText}>
                    <SpecialText
                        split={true}
                        FontWeight="700"
                        FontFamily="Comfortaa"
                        text={t("make_the_best").toUpperCase()}
                    />
                    <SpecialText
                        FontFamily="PacificoRegular"
                        text={t("you").toUpperCase()}
                    />
                </View>
            </ImageBackground>
            <Layout style={styles.altSection}>
                <SpecialText
                    FontSize={40}
                    FontWeight="900"
                    text={t("join_us").toUpperCase()}
                />
                <Button
                    onPress={() => {
                        scrollViewRef.current.scrollTo({ y: 790 });
                    }}
                    style={{ ...styles.joinUsBtn, ...styles.text }}
                    accessoryRight={PlusSquareIcon({
                        fill: theme["text-alternate-color"],
                    })}
                    size="large"
                >
                    <SpecialText
                        FontSize={15}
                        textColor={theme["text-alternate-color"]}
                        FontWeight="700"
                        FontFamily="PacificoRegular"
                        text={t("check_offers").toUpperCase()}
                    />
                </Button>
                <SpecialText
                    FontSize={20}
                    FontWeight="700"
                    FontFamily="PacificoRegular"
                    text={t("or").toUpperCase()}
                />
                <Button
                    onPress={() => {
                        router.navigate("/user/signup")
                    }}
                    style={{ ...styles.joinUsBtn, ...styles.text }}
                    accessoryRight={LoginIcon({
                        fill: theme["text-alternate-color"],
                    })}
                    size="large"
                >
                    <SpecialText
                        FontSize={15}
                        textColor={theme["text-alternate-color"]}
                        FontWeight="700"
                        FontFamily="PacificoRegular"
                        text={t("signup").toUpperCase()}
                    />
                </Button>
                <Button
                    onPress={() => {
                        scrollViewRef.current.scrollTo({ y: 2200 });
                    }}
                    style={styles.joinUsBtn}
                    accessoryRight={CircledInfoIcon}
                    size="large"
                    appearance="ghost"
                >
                    <SpecialText
                        FontSize={15}
                        textColor={theme["text-primary-color"]}
                        FontWeight="700"
                        FontFamily="PacificoRegular"
                        text={t("what_to_expect").toUpperCase()}
                    />
                </Button>
                <Button
                    onPress={() => {
                        router.navigate("/user/login");
                    }}
                    style={{
                        ...styles.joinUsBtn,
                        backgroundColor: theme["background-basic-color-1"],
                    }}
                    accessoryRight={CornerUpRightArrow}
                    size="large"
                    appearance="outline"
                >
                    <SpecialText
                        FontSize={15}
                        textColor={theme["text-primary-color"]}
                        FontWeight="700"
                        FontFamily="PacificoRegular"
                        text={t("have_account").toUpperCase()+"  "+ t('login').toUpperCase()}
                    />
                </Button>
            </Layout>
            <SpecialText FontSize={40} FontWeight="900" text={t("offers")} />
            {availableOffers && (
                <>
                    <PagerView
                        ref={ref}
                        onPageScroll={(event) => {
                            onPageScroll(event);
                        }}
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            maxWidth: "100%",
                        }}
                        initialPage={0}
                        scrollEnabled
                        orientation="horizontal"
                    >
                        {availableOffers.map((offer) => (
                            <Offer
                                key={offer.id}
                                id={offer.id}
                                navigate={true}
                                srcImage={offer.photo}
                                nameFr={offer.nameFr}
                                nameEn={offer.nameEn}
                                benefits={offer.benefits}
                            />
                        ))}
                    </PagerView>
                    <ExpandingDot
                        data={availableOffers}
                        scrollX={scrollX}
                        expandingDotWidth={30}
                        inActiveDotOpacity={0.3}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            backgroundColor: "black",
                            borderRadius: 5,
                            marginHorizontal: 5,
                        }}
                        activeDotColor={theme["color-primary-500"]}
                        containerStyle={{
                            position: "relative",
                            paddingVertical: 10,
                        }}
                    />
                </>
            )}
            <SpecialText
                FontSize={40}
                FontWeight="900"
                extStyle={{ marginHorizontal: 5 }}
                text={t("what_to_get")}
            />
            <PagerView
                style={{
                    flex: 1,
                    paddingBottom: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: "100%",
                }}
                initialPage={0}
                scrollEnabled
                orientation="horizontal"
                offscreenPageLimit={Expects.length}
            >
                {Expects.map((expect, index) => (
                    <Expect
                        key={index.toString()}
                        titleEn={expect.titleEn}
                        titleFr={expect.titleFr}
                        descriptionEn={expect.descriptionEn}
                        descriptionFr={expect.descriptionFr}
                        srcImage={expect.img}
                    />
                ))}
            </PagerView>
        </ScrollView>
    );
};
export default LandingPage;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "100%",
        flexDirection: "col",
        FontFamily: "Comfortaa",
        FontWeight: "500",
        padding: 0,
    },
    floatingText: {
        position: "absolute",
        top: "4%",
        textAlign: "center",
        alignItems: "center",
    },
    Section: {
        flex: 1,
        maxHeight: 600,
        alignItems: "center",
        margin: 10,
        width: "95%",
        textAlign: "center",
        borderRadius: 10,
    },
    altSection: {
        flex: 1,
        alignItems: "center",
        margin: 10,
        width: "95%",
        textAlign: "center",
        borderRadius: 10,
        paddingVertical: 20,
    },
    bgImage: {
        width: "100%",
        position: "relative",
        zIndex: -100,
        opacity: 0.8,
        borderRadius: 20,
    },
    joinUsBtn: {
        margin: 10,
        borderRadius: 20,
        padding: 10,
    },
    text: {
        fontFamily: "Comfortaa",
        fontWeight: "500",
        fontSize: 20,
    },
   
});
