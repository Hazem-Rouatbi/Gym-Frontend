import { Avatar, Icon, Spinner } from "@ui-kitten/components";
import { Image, StyleSheet, Text, View } from "react-native";
import Svg, { G, Path } from "react-native-svg";

export const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size="small" />
    </View>
);
export const ToggleEyeIcon = (showP) => {
    if (!showP) {
        return <Icon name="eye-off-outline" style={styles.icon} />;
    } else {
        return <Icon name="eye-outline" style={styles.icon} />;
    }
};
export const CircledInfoIcon = (props) => (
    <Icon {...props} name="info-outline" />
);
export const PlusSquareIcon = (props) => (
    <Icon {...props} name="plus-square-outline" />
);
export const DownCircleDownArrow = (props) => (
    <Icon {...props} name={"arrow-circle-down-outline"} />
);

export const DownArrow = (props) => (
    <Icon {...props} name={"arrow-ios-downward-outline"} />
);
export const UpArrow = (props) => (
    <Icon {...props} name={"arrow-ios-upward-outline"} />
);
export const TrashIcon = (props) => <Icon {...props} name="trash-2-outline" />;

export const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;
export const plusOutline = (props) => {
    const { fillColor, width, height } = props;
    return (
        <Icon
            name="plus-outline"
            fill={fillColor}
            style={{ width: width, height: height }}
        />
    );
};
export const AlertTriangleIcon = (props) => (
    <Icon {...props} name="alert-triangle-outline" />
);
export const CheckMarkIcon = (props) => (
    <Icon {...props} name="checkmark-circle-outline" />
);

export const UploadIcon = (props) => <Icon {...props} name="upload-outline" />;
export const ImageIcon = (props) => <Icon {...props} name="image-outline" />;
export const InfoIcon = (props) => <Icon {...props} name="info" />;
export const CommentIcon = (props) => (
    <Icon {...props} name="message-square-outline" />
);
export const HeartIcon = (props) => (
    <Icon {...props} fill="#FF5D4F" name="heart-outline" />
);
export const SendIcon = (props) => <Icon {...props} name="paper-plane" />;
export const EditIcon = (props) => <Icon {...props} name="edit-outline" />;

export const LogOutIcon = (props) => (
    <Icon name="person-remove-outline" {...props} />
);
export const HearFullIcon = (props) => (
    <Icon {...props} fill="#FF5D4F" name="heart" />
);
export const CloseIcon = (props) => <Icon {...props} name="close-outline" />;

export const StarIcon = (props) => <Icon {...props} name="star" />;
export const ShareIcon = (props) => <Icon {...props} name="share-outline" />;
export const HomeIcon = (props) => <Icon {...props} name="home-outline" />;
export const ProfileIcon = (props) => <Icon {...props} name="person-outline" />;
export const SettingsIcon = (props) => (
    <Icon {...props} name="settings-2-outline" />
);

export const CameraIcon = (props) => <Icon {...props} name="camera" />;

export const CornerUpRightArrow = (props) => (
    <Icon {...props} name="corner-up-right-outline" />
);

export const UsFlag = (props) => (
    <Image
        {...props}
        style={{ zIndex: 10, width: 40, height: 40 }}
        source={require("@assets/flags/united-states-of-america.png")}
    />
);
export const FrFlag = (props) => (
    <Image
        {...props}
        style={{ zIndex: 10, width: 40, height: 40 }}
        source={require("@assets/flags/france.png")}
    />
);

export const BarChartIcon = (props) => (
    <Icon {...props} name="bar-chart-outline" />
);
export const SunIcon = (props) => <Icon {...props} name="sun" />;
export const MoonIcon = (props) => <Icon {...props} name="moon" />;
export const LoginIcon = (props) => <Icon {...props} name="log-in-outline" />;
export const VerticalDots = (props) => <Icon {...props} name="more-vertical" />;

const styles = StyleSheet.create({
    icon: {
        height: 20,
        width: 20,
    },
    indicator: {
        alignItems: "center",
        justifyContent: "center",
    },
});
