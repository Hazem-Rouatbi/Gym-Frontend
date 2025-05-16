import { Layout, Text, useTheme } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import AddPost from "@components/home/addPost";
import Post from "@components/home/post";
import Comment from "@components/home/comment";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "@_helpers/services/postsServices";
import { LinearGradient } from "expo-linear-gradient";
import { getRGBAColor } from "@_helpers/utils";

const Home = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const hasAccess =
        useSelector((state) => state.user.role) === "ADMIN" ||
        useSelector((state) => state.user.role) === "ROOT";
    const [posts, setPosts] = useState();
    const isCloseToBottom = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }) => {
        const paddingToBottom = 20;
        const close =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
    const [currentPage, setCurrentPage] = useState(0);
    const setComponent = (posts) => {
        if (posts && posts?.length > 0)
            return posts.map((post) => {
                let comments = post?.comments;
                if (comments && comments?.length > 0)
                    comments = post.comments?.map((comment, index) => (
                        <Comment
                            key={comment.id}
                            comment={comment?.comment}
                            userName={comment?.user?.login}
                            isEditable={comment?.isEditable}
                            userPhoto={comment?.photo}
                            id={comment.id}
                        />
                    ));
                return (
                    <>
                        {/* <LinearGradient
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
                                height: "100%",
                                zIndex: -20,
                            }}
                        /> */}
                        <View
                            key={post.id.toString()}
                            style={{
                                borderWidth: 2,
                                borderColor: theme["border-basic-color-5"],
                                borderRadius: 10,
                                marginVertical: 10,
                                paddingVertical: 20,
                                backgroundColor:
                                    theme["background-basic-color-1"],
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 12,
                                },
                                shadowOpacity: 0.58,
                                shadowRadius: 16.0,

                                elevation: 12,
                                marginHorizontal: 5,
                            }}
                        >
                            <Post
                                post={post}
                                commentIconFill={theme["text-basic-color"]}
                            />
                            {comments}
                        </View>
                    </>
                );
            });
        else return <Text>{t("no_posts")}</Text>;
    };

    useEffect(() => {
        getPosts({ page: 0 }).then((res) => {
            if (res?.data) {
                setPosts(setComponent(res.data));
                setCurrentPage(currentPage + 1);
            }
        });
    }, []);

    const fetchMoreData = async () => {
        return getPosts().then((res) => {
            if (res?.data) {
                setPosts({ page: currentPage }).then((res) => {
                    if (res) {
                        setPosts(setComponent(res));
                        setCurrentPage(currentPage + 1);
                    }
                });
            }
        });
    };
    return (
        <ScrollView
            onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    fetchMoreData();
                }
            }}
            scrollEventThrottle={400}
            contentContainerStyle={styles.contentContainer}
        >
            <Layout
                style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: theme["background-basic-color-1"],
                }}
            >
                {hasAccess && <AddPost />}
                {posts}
            </Layout>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: "center",
        width: "100%",
        flexDirection: "col",
        FontFamily: "Comfortaa",
        FontWeight: "500",
        padding: 0,
    },
});

export default Home;
