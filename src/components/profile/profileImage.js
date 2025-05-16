import { Avatar, Button, Layout, Modal, useTheme } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import defaultImage from "../../../assets/default-user-image.png";
import { CameraIcon, ImageIcon } from "../icons";
import * as ImagePicker from "expo-image-picker";
import { getRGBAColor } from "../../_helpers/utils";
import { getUserImage, setUserImage } from "@_helpers/services/userService";
import { useSelector } from "react-redux";

const ProfileImage = () => {
    const theme = useTheme();
    const [visible, setVisible] = useState(false);
    const [userPhoto, setUserPhoto] = useState("");
    const user = useSelector(state => state.user)
    useEffect(() => {
        getUserImage(user.id).then(res => setUserPhoto(res.data))
    }, []);
    const saveImage = (sImage) => {
        setUserImage(sImage).then((res) => {
            if (res?.data) {
                setUserPhoto(res.data)
            }
        });
        setVisible(false);
    };

    const handleUpload = async (mode) => {
        switch (mode) {
            case "camera":
                try {
                    await ImagePicker.requestCameraPermissionsAsync();
                    const res = await ImagePicker.launchCameraAsync({
                        cameraType: ImagePicker.CameraType.front,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1,
                        base64: true,
                    });
                    if (!res.canceled) {
                        const image = res.assets[0];
                        saveImage(image);
                        setUserPhoto(image.base64);
                    }
                } catch (err) {}
                break;

            case "gallery":
                try {
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                    const res = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [1, 1],
                        base64: true,
                    });
                    if (!res.canceled) {
                        const image = res.assets[0];
                        saveImage(image);
                        setUserPhoto(image.base64);
                    }
                } catch (err) {}
        }
    };
    return (
        <>
            <TouchableOpacity
                style={styles.logo}
                onPress={() => setVisible(true)}
            >
                <Avatar
                    source={userPhoto ? { uri: userPhoto } : defaultImage}
                />
            </TouchableOpacity>
            <Modal
                visible={visible}
                onBackdropPress={() => setVisible(false)}
                backdropStyle={getRGBAColor(theme["background-basic-color-1"])}
            >
                <Layout style={styles.container}>
                    <Avatar
                        style={{ width: 150, height: 150 }}
                        source={userPhoto ? { uri: userPhoto } : defaultImage}
                    ></Avatar>
                    <Layout style={styles.btnContainer}>
                        <Button
                            style={styles.btn}
                            onPress={() => handleUpload("gallery")}
                            accessoryLeft={ImageIcon}
                        ></Button>
                        <Button
                            style={styles.btn}
                            onPress={() => handleUpload("camera")}
                            accessoryLeft={CameraIcon}
                        ></Button>
                    </Layout>
                </Layout>
            </Modal>
        </>
    );
};

export default ProfileImage;

const styles = StyleSheet.create({
    logo: {
        width: 75,
        height: 75,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "90%",
    },
    btn: {
        marginHorizontal: 10,
        borderRadius: 20,
    },
});
