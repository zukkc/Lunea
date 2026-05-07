import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import { pl } from './locales/pl';
import { en } from './locales/en';

const resources = {
  pl: {
    translation: pl,
  },
  en: {
    translation: en,
  },
};

const fallbackLanguage = 'en';

const deviceLanguage =
  RNLocalize.getLocales()[0]?.languageCode ?? fallbackLanguage;

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  fallbackLng: fallbackLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;