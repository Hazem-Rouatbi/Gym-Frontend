import { useTheme } from '@ui-kitten/components';
import { Platform } from 'react-native';

export function getTheme(theme) {
  const disabledColor = theme['text-disabled-color'];
  return {

    arrowColor: 'black',
    arrowStyle: { padding: 0 },

    expandableKnobColor: theme['color-primary-500'],

    monthTextColor: theme['text-basic-color'],
    textMonthFontSize: 16,
    textMonthFontFamily: 'notoserif',
    textMonthFontWeight: 'bold',

    textSectionTitleColor: theme['text-basic-color'],
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: 'notoserif',
    textDayHeaderFontWeight: 'normal',

    dayTextColor: theme['color-primary-500'],
    todayTextColor: theme['text-basic-color'],
    textDayFontSize: 18,
    textDayFontFamily: 'notoserif',
    textDayFontWeight: '500',
    textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },

    selectedDayBackgroundColor: theme['color-primary-800'],
    selectedDayTextColor: theme['color-primary-100'],

    textDisabledColor: theme['text-disabled-color'],

    textSectionTitleDisabledColor: theme['text-disabled-color'],

    dotColor: theme['color-primary-500'],
    selectedDotColor: theme['color-primary-900'],
    disabledDotColor: disabledColor,
    dotStyle: { marginTop: -2 },

    calendarBackground: theme['background-basic-color-1'],
    backgroundColor: theme['background-basic-color-1'],
    textSectionTitleColor: theme['color-primary-500'],
  };
}
