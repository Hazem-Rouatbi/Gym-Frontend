import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Switch, View } from "react-native";
import {
    Toggle,
    Divider,
    Select,
    IndexPath,
    SelectItem,
    useTheme,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { setColor } from "@helpers/redux/themeReducer";
import { useEffect, useState } from "react";
import { getFullLanguageName } from "@helpers/utils";
import { switchTheme } from "@helpers/theme/theme";
import { switchLang } from "@helpers/Text/language";
import { SpecialText } from "@components/specialText";
import { FrFlag, UsFlag } from "@components/icons";
import { changeLanguage } from "i18next";
import { selectLang } from "@_helpers/Text/language";

const Settings = () => {
    const langValues = [
        { id: 10, shortName: "fr" },
        { id: 20, shortName: "en" },
    ];

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const theme = useTheme();
    const themeName = useSelector((state) => state.theme.value);
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const [selectedTitle, setSelectedTitle] = useState("");
    const [themeTogg, setThemeTogg] = useState(false);
    useEffect(() => {
        themeName === "light" ? setThemeTogg(true) : setThemeTogg(false);
    },[]);
    const [firstLoad, setFirstLoad] = useState(true);
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
    useEffect(() => {
        if (!firstLoad) {
            selectLang(selectedTitle.shortName);
            setFirstLoad(true);
        }
    }, [selectedTitle]);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.item}>
                <SpecialText FontSize={20} text={t("switch_theme") + " :"} />
                <Switch
                    value={themeTogg}
                    onValueChange={handleSwitchTheme}
                    trackColor={{
                        false: theme["color-basic-transparent-500"],
                        true: theme["color-basic-transparent-500"],
                    }}
                    thumbColor={{
                        false: theme["color-primary-500"],
                        true: theme["color-alternative-500"],
                    }}
                    style={{
                        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                    }}
                />
            </View>
            <Divider />
            <View style={styles.item}>
                <SpecialText
                    FontSize={17}
                    style={styles.options}
                    text={t("switch_language")}
                />
                {/* <View style={{ flexDirection: "row" }}>
                    <Button
                        activeOpacity={0.2}
                        accessoryRight={FrFlag}
                        onSelect={() => setSelectedTitle("fr")}
                        style={{
                            margin: 0,
                            backgroundColor: theme["background-basic-color-3"],
                            borderWidth: 0,
                        }}
                    />
                    <Button
                        activeOpacity={0.2}
                        accessoryRight={UsFlag}
                        onSelect={() => setSelectedTitle("en")}
                        style={{
                            margin: 0,
                            backgroundColor: theme["background-basic-color-3"],
                            borderWidth: 0,
                        }}
                    />
                </View> */}
                <Select
                    style={styles.select}
                    selectedIndex={selectedIndex}
                    value={t("language")}
                    onSelect={(index) => {
                        setSelectedIndex(index);
                        setFirstLoad(false);
                        setSelectedTitle(langValues[index.row]);
                        console.log(langValues[index.row]);
                    }}
                    placeholder={t("switch_language")}
                >
                    {langValues.map((lang, index) => (
                        <SelectItem
                            style={styles.selectItem}
                            key={lang.id}
                            accessoryLeft={
                                lang.shortName === "fr" ? FrFlag : UsFlag
                            }
                            title={getFullLanguageName(lang.shortName)}
                            value={lang.shortName}
                        />
                    ))}
                </Select>
            </View>
        </View>
    );
};
export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        paddingVertical:5,
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems:'center'
    },
    options: {
        fontSize: 23,
        fontWeight: 700,
    },
    select: {
        width: "45  %",
    },
});
