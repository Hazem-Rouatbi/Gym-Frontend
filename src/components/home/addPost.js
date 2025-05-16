import { Button, useTheme, Modal, Input } from "@ui-kitten/components";
import { ImageIcon, plusOutline } from "../icons";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { getRGBAColor } from "../../_helpers/utils";
import { SpecialText } from "../specialText";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import { addPost } from "@_helpers/services/postsServices";

const AddPost = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [title, setTitle] = useState(false);
    const [description, setDescription] = useState(false);
    const [backdrop, setBackDrop] = useState("rgba(0, 0, 0, 0.5)");
    const [visible, setVisible] = useState(false);
    const [file, setFile] = useState(null);
    const handleSetTitle = useCallback((val) => {
        setTitle(val);
    }, []);

    const handleSetDescription = useCallback((val) => {
        setDescription(val);
    }, []);

    const saveImage = (assets) => {
        const image = assets[0];

        setFile(image);
    };
    const handleUpload = async () => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!res.canceled) {
                saveImage(res.assets);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const handleCancel = () => {
        setTitle(null);
        setDescription(null);
        setVisible(false);
    };
    BackHandler.addEventListener("hardwareBackPress", handleCancel);

    const handleConfirm = () => {
        post = { title: title, content: description };
        addPost(post, file);
        setTitle(null);
        setDescription(null);
        setVisible(false);
    };
    useEffect(() => {
        setBackDrop(getRGBAColor(theme["background-basic-color-1"], 0.9));
    }, []);

    return (
        <>
            <Button
                appearance="primary"
                onPress={() => {
                    setVisible(true);
                }}
                style={{ borderRadius: 20, margin: 20 }}
                accessoryRight={plusOutline({
                    fillColor: theme["text-basic-color"],
                    width: 45,
                    height: 45,
                })}
            >
                <SpecialText FontSize={20} text={t("add_post")} />
            </Button>
            <Modal
                style={{ ...styles.modal }}
                visible={visible}
                backdropStyle={{ ...backdrop }}
                onDismiss={() => setVisible(false)}
            >
                <View style={styles.inputView}>
                    <View style={styles.inputView}>
                        <SpecialText FontSize={30} text={t("title")} />
                        <Input
                            placeholder={t("title")}
                            value={title}
                            maxLength={10}
                            onChangeText={(val) => {
                                handleSetTitle(val);
                            }}
                        />
                        <SpecialText FontSize={30} text={t("content")} />
                        <Input
                            placeholder={t("content")}
                            value={description}
                            multiline={true}
                            textStyle={{ minHeight: 64 }}
                            maxLength={200}
                            onChangeText={(val) => {
                                handleSetDescription(val);
                            }}
                        />

                        <Button
                            size="large"
                            style={styles.btn}
                            onPress={() => handleUpload()}
                            accessoryLeft={ImageIcon}
                        >
                            <SpecialText
                                textColor={theme["text-alternate-color"]}
                                FontSize={15}
                                text={t("upload_image")}
                            />
                        </Button>
                    </View>
                    <View style={styles.btnView}>
                        <Button
                            style={{ marginHorizontal: 10, borderWidth: 0 }}
                            onPress={() => {
                                handleCancel();
                            }}
                            appearance="outline"
                        >
                            <SpecialText FontSize={20} text={t("cancel")} />
                        </Button>
                        <Button
                            style={{ marginHorizontal: 10 }}
                            onPress={() => {
                                handleConfirm();
                            }}
                        >
                            <SpecialText FontSize={20} text={t("confirm")} />
                        </Button>
                    </View>
                </View>
            </Modal>
        </>
    );
};
export default AddPost;

const styles = StyleSheet.create({
    modal: {
        top: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%",
    },
    inputView: {
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: 20,
        justifyContent: "space-between",
        margin: 20,
    },
    btn: {
        margin: 10,
        borderRadius: 20,
    },
    btnView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
});
