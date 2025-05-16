import { Animated, Easing, Image, StyleSheet, View } from "react-native";
import { SpecialText } from "../specialText";
import { Button, Card, useTheme } from "@ui-kitten/components";
import { CloseIcon, HearFullIcon, HeartIcon, ShareIcon } from "../icons";
import { useEffect, useRef, useState } from "react";
import AddComment from "./addComment";
import { likePost, unlikePost } from "@_helpers/services/postsServices";
import { showMessage } from "react-native-flash-message";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBAColor } from "@_helpers/utils";

const Post = ({ post }) => {
    const {
        id = null,
        title = "",
        content = "",
        photo = "",
        isLiked = { status: false, likeId: null },
        likes = [],
        commentIconFill = "white",
        hasAccess = false,
        numberOfLikes = 0,
        numberOfComments = 0,
    } = post;
    const [PLiked, setPLiked] = useState(isLiked?.status);
    const [icon, setIcon] = useState(HeartIcon);
    const theme = useTheme()
    const handleOnClick = () => {
        playAnimation();
        setPLiked(!PLiked);
        if (PLiked === false) {
            likePost(id).then((res) => {
                if (res?.data) {
                    console.log(res.data);
                } else {
                    showMessage({
                        message: res.message,
                        type: "danger",
                    });
                }
            });
        } else {
            unlikePost(isLiked.likeId);
        }
        if (!PLiked == true) setIcon(HearFullIcon);
        else setIcon(HeartIcon);
    };
    useEffect(() => {
        if (PLiked) {
            setIcon(HearFullIcon);
        }
    }, []);
    const animatedValue = useRef(new Animated.Value(1)).current;
    const playAnimation = () => {
        Animated.sequence([
            Animated.timing(animatedValue, {
                toValue: 1.5,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };
    return (
        <>
            <LinearGradient
                colors={[
                    getRGBAColor(theme["color-primary-500"], 0.1)
                        .backgroundColor,
                    getRGBAColor(theme["color-primary-100"], 0.1)
                        .backgroundColor,
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
            <View style={styles.container}>
                {title && (
                    <SpecialText
                        extStyle={{
                            width: "100%",
                            textAlign: "start",
                            paddingHorizontal: 10,
                        }}
                        FontSize={30}
                        text={title}
                    />
                )}
                <SpecialText
                    extStyle={{
                        width: "100%",
                        textAlign: "start",
                        paddingHorizontal: 10,
                    }}
                    FontSize={20}
                    text={content}
                />
                <Image style={styles.img} source={{ uri: photo }} />
                <Animated.View
                    style={{
                        transform: [{ scale: animatedValue }],
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        zIndex: 10,
                    }}
                >
                    <Button
                        style={{ backgroundColor: null, borderWidth: 0 }}
                        onPress={() => {
                            handleOnClick();
                        }}
                        status="danger"
                        size="large"
                        accessoryLeft={icon}
                    />
                </Animated.View>
            </View>
            <View style={styles.btnsView}>
                {/* <Button style={styles.btn} accessoryLeft={ShareIcon}></Button> */}
                {hasAccess && (
                    <Button
                        style={styles.btn}
                        accessoryLeft={CloseIcon}
                        status="danger"
                    ></Button>
                )}
            </View>
            <AddComment postId={id} commentIconFill={commentIconFill} />
        </>
    );
};
export default Post;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal:10,
        flexWrap: "wrap",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0,
    },
    img: {
        zIndex: 10,
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    btnsView: {
        alignContent: "center",
        justifyContent: "space-around",
        flexDirection: "row",
    },
    btn: {
        borderRadius: 100,
        borderWidth: 0,
    },
});
