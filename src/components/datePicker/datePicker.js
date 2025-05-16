import { Button } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DatePicker = ({ onDatePick, cStyle, backdrop }) => {
  const currentDate = new Date().toISOString().split('T')[0]
  const nextYear = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]
  const { t, i18n } = useTranslation()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showDatePicker = () => {

    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) =>  {
    onDatePick(date)
    hideDatePicker();
  };

  return (
    <View style={{ flex: 1, ...cStyle }}>
      <Button onPress={() => { showDatePicker() }}>{t('pick_date')}</Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
         
      />
    </View>
  );
};

export default DatePicker;
