import * as SecureStore from 'expo-secure-store';
import i18n from "./i18n";
import { LocaleConfig } from 'react-native-calendars';
import axios from 'axios';





export const getLanguage =  () => { return i18n.language}
export const initLang = async () => {
    const lang = await SecureStore.getItemAsync('app_lang')
    if (lang) {
        i18n.changeLanguage(lang)
        return
    }
    const bLang = await SecureStore.setItemAsync('app_lang', 'en')
    axios.defaults.headers.common['accept-language'] = 'en'
    return bLang
}

export const switchLang = async () => {
    if (i18n.language === 'en') {
        i18n.changeLanguage('fr')
        SecureStore.setItemAsync('app_lang', 'fr');
        axios.defaults.headers.common['accept-language'] = 'fr'

    } else {
        i18n.changeLanguage('en')
        SecureStore.setItemAsync('app_lang', 'en');
        axios.defaults.headers.common['accept-language'] = 'en'
    }

}
export const selectLang = async (lang) => {
    switch (lang) {
        case 'en':
            i18n.changeLanguage(lang)
            SecureStore.setItemAsync('app_lang', lang);
            break;
        case 'fr':
            i18n.changeLanguage(lang)
            SecureStore.setItemAsync('app_lang', lang);
            break;
    }
    axios.defaults.headers.common['accept-language'] = lang

}
export const getTranslation = (text) =>{
    const reText = i18n.t(text)
    return reText
}