import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './appTextEn.json';
import fr from './appTextFr.json';

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            en: {
                translation: en
            },
            fr: {
                translation: fr
            }
        },
        debug: false,
        whitelist: ['en', 'fr'],
        fallbackLng: 'en',
        lng: 'en',
        interpolation: {
          escapeValue: false,
        },
    });

export default i18n;