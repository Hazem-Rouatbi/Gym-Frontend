import { StyleSheet, View } from "react-native";
import { SpecialText } from "../specialText";
import { Avatar, Button } from "@ui-kitten/components";
import { EditIcon, TrashIcon } from "@components/icons";
import { useState } from "react";
import AddComment from "./addComment";
import { deleteComment } from "@_helpers/services/postsServices";
import { router } from "expo-router";

const Comment = ({
    comment,
    userName,
    userPhoto = "",
    isEditable = false,
    isAdmin = false,
    id = null,
}) => {
    if (!comment) return null;
    const [edit, setEdit] = useState(false);
    const handleEdit = () => {
        setEdit(!edit);
    };
    const handleDelete = () => {
        deleteComment(id);
        router.replace('home')
    };
    return (
        <>
            <View style={styles.container}>
                <View style={{ flexDirection: "row" }}>
                    <Avatar
                        source={{ uri: userPhoto }}
                        style={{
                            width: 30,
                            height: 30,
                            borderRadius: 100,
                            marginRight: 10,
                        }}
                    />
                    <SpecialText FontSize={17} text={"@" + userName + " : "} />
                </View>
                {!edit && (
                    <SpecialText
                        extStyle={{ textAlign: "left" }}
                        FontSize={15}
                        text={comment}
                    />
                )}
                {edit && (
                    <AddComment defaultVal={comment} id={id} mode="edit" />
                )}
                {(isEditable || isAdmin) && (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            width: "100%",
                            margin: 5,
                        }}
                    >
                        <Button
                            appearance="ghost"
                            onPress={handleEdit}
                            accessoryLeft={EditIcon}
                            style={{ borderRadius: 100 }}
                        ></Button>
                        <Button
                            appearance="ghost"
                            status="danger"
                            onPress={handleDelete}
                            accessoryLeft={TrashIcon}
                            style={{ borderRadius: 100 }}
                        ></Button>
                    </View>
                )}
            </View>
        </>
    );
};
export default Comment;

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginHorizontal: 20,
        flexWrap: "wrap",
        justifyContent: "center",
        borderWidth: 0,
        width: "80%",
        marginHorizontal: "auto",
        alignItems: "flex-start",
    },
    title: { flexWrap: "wrap" },
    comment: {},
});
