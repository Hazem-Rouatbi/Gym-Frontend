import { useEffect, useState } from "react";
import {
    SafeAreaView,
    SafeAreaViewBase,
    StyleSheet,
    Switch,
    View,
} from "react-native";
import {
    Avatar,
    Button,
    Card,
    Icon,
    Layout,
    MenuItem,
    Modal,
    OverflowMenu,
    PopoverPlacements,
    Text,
    TopNavigation,
    TopNavigationAction,
    useTheme,
} from "@ui-kitten/components";
import GymIcon from "@assets/gymIcon.svg";
import { switchTheme } from "../../_helpers/theme/theme";
import { useTranslation } from "react-i18next";
import {
    MenuIcon,
    InfoIcon,
    FrFlag,
    SunIcon,
    MoonIcon,
    VerticalDots,
} from "../icons";
import { switchLang } from "@_helpers/Text/language";
import SelectDropdown from "react-native-select-dropdown";
import { SpecialText } from "@components/specialText";
import { getRGBAColor } from "@_helpers/utils";
import Settings from "@components/profile/settings";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "@_helpers/redux/themeReducer";

const Header = ({
    title: title,
    titleProps: titleProps,
    iconProps: iconProps,
    menuIconProps: menuIconProps,
}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const themeName = useSelector((state) => state.theme.value);
    const dispatch = useDispatch();
    useEffect(() => {
        themeName === "light" ? setThemeTogg(true) : setThemeTogg(false);
    });
    const handleSwitchTheme = () => {
        if (themeName === "light") {
            switchTheme();
            setThemeTogg(false);
        } else {
            switchTheme();
            dispatch(setColor({ value: "light" }));
            setThemeTogg(true);
        }
    };
    const [themeTogg, setThemeTogg] = useState(false);

    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = () => (
        <Button
            accessoryLeft={MenuIcon(iconProps)}
            onPress={toggleMenu}
            status="basic"
            style={{
                borderWidth: 0,
                backgroundColor: theme["background-basic-color-1"],
            }}
        />
    );
    const menuItems = [
        { title: t("language"), name: "lang" },
        { title: t("theme"), name: "theme" },
    ];
    const renderOverflowMenuAction = () => {
        return (
            <>
                <Button
                    onPress={() => {
                        setVisible(!visible);
                    }}
                    size="large"
                    appearance="outline"
                    activeOpacity={0.5}
                    style={{
                        backgroundColor: theme["background-color-basic-1"],
                        borderWidth: 0,
                    }}
                    accessoryLeft={VerticalDots({
                        fill: theme["text-basic-color"],
                    })}
                ></Button>
                <Modal
                    animationType="fade"
                    onBackdropPress={() => {
                        setVisible(!visible);
                    }}
                    visible={visible}
                    style={{ width: "100%", height: "100%" }}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setVisible(!visible);
                        }}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <Card
                            style={{
                                borderRadius: 20,
                                position: "absolute",
                                top: 50,
                                right: 5,
                                width: "98%",
                                ...getRGBAColor(
                                    theme["background-basic-color-1"],
                                    0.9
                                ),
                                zIndex: 10,
                            }}
                        >
                            <View style={styles.item}>
                                <Settings />
                            </View>
                        </Card>
                    </TouchableWithoutFeedback>
                </Modal>
            </>
        );

        // DropDown = (
        //     <>
        //         <MenuItem
        //             onPress={switchLang}
        //             title={t("language")}
        //             accessoryLeft={InfoIcon(menuIconProps)}
        //         />
        //         <MenuItem
        //             onPress={switchTheme}
        //             title={t("switch_theme")}
        //             accessoryLeft={InfoIcon(menuIconProps)}
        //         />
        //     </>
        // );

        // return (
        //     <OverflowMenu
        //         anchor={renderMenuAction}
        //         visible={menuVisible}
        //         placement={PopoverPlacements.BOTTOM}
        //         style={{ backgroundColor: theme["background-basic-color-1"] }}
        //         onBackdropPress={toggleMenu}
        //     >
        //         {DropDown}
        //     </OverflowMenu>
        // );
    };

    const renderTitle = ({ props: props, title: title }) => {
        return (
            <>
                <View style={styles.titleContainer}>
                    <View
                        style={{
                            marginHorizontal: 18,
                            borderWidth: 1,
                            borderRadius: 100,
                            padding: 5,
                        }}
                    >
                        <GymIcon height={30} width={30} />
                    </View>
                    <SpecialText FontSize={20} text={title} />
                </View>
            </>
        );
    };

    return (
        <SafeAreaView
            style={{
                ...styles.container,
                borderBottomWidth: 0.9,
                borderBottomColor: theme["color-primary-500"],
            }}
        >
            <Layout level="1" style={styles.container}>
                <TopNavigation
                    title={renderTitle({ title: title, props: titleProps })}
                    accessoryRight={renderOverflowMenuAction}
                    style={{
                        marginTop: "4%",
                        backgroundColor: theme["background-basic-color-1"],
                    }}
                />
            </Layout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 3,
    },
    container: {
        marginTop: 0,
        minHeight: 60,
    },
    item: {
        padding: 10,
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
    },
});

export default Header;
