import { Button, Text } from "@ui-kitten/components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePicker = ({ onTimePick ,style }) => {
    const { t,i18n } = useTranslation()
    const lang = i18n.language
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (time) => {
        console.log(time);
        onTimePick(time)
        hideDatePicker();
    };

    return (
        <View style={{ flex: 1,...style }}>
            <Button onPress={showDatePicker}><Text>{t('pick_time')}</Text></Button>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                locale={lang}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                timePickerModeAndroid="clock"
                is24Hour={true}
            />
        </View>
    );
};

export default TimePicker;
