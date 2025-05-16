import { Button, useTheme, Modal, Input } from "@ui-kitten/components";
import { CommentIcon, ImageIcon, SendIcon, plusOutline } from "../icons";
import { useCallback, useEffect, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { addComment, editComment } from "@_helpers/services/postsServices";
import { showMessage } from "react-native-flash-message";

const AddComment = ({
    commentIconFill = "white",
    postId = null,
    defaultVal = "",
    mode = "create",
    id = null,
}) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [comment, setComment] = useState(defaultVal);

    const handleSetComment = useCallback((val) => {
        setComment(val);
    }, []);

    const handleSend = () => {
        Keyboard.dismiss();
        if (mode === "create") addComment(comment, postId);
        else if (mode === "edit" && id) {console.log(id);; editComment(comment, id);}
        else {
            showMessage({
                message: t("server_error"),
                type: "danger",
            });
        }
        router.replace("home");
    };
    const renderSendBtn = () => (
        <Button
            style={{
                ...styles.sendBtn,
                backgroundColor: theme["color-basic-transparent-100"],
                borderRadius: 100,
                width: 45,
                borderWidth: 0,
            }}
            onPress={handleSend}
            activeOpacity={0.5}
            accessoryRight={SendIcon({ fill: theme["text-basic-color"] })}
        />
    );

    return (
        <>
            <View style={styles.container}>
                <Input
                    style={{ borderRadius: 20 }}
                    inputStyling={{ maxwidth: "80%" }}
                    inputMode="text"
                    editable={true}
                    placeholder={t("comment")}
                    value={comment}
                    multiline={true}
                    textStyle={{ minHeight: 30, maxHeight: 60 }}
                    maxLength={80}
                    returnKeyLabel="submit"
                    returnKeyType="search"
                    accessoryRight={renderSendBtn}u
                    onChangeText={(val) => {
                        console.log(val[val.length - 1]);
                        if (val[val.length - 1] === "\n") {
                            handleSend();
                        }
                        handleSetComment(val);
                    }}
                />
            </View>
        </>
    );
};
export default AddComment;

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        padding: 10,
    },
    sendBtn: {
        borderRadius: 100,
    },
});
