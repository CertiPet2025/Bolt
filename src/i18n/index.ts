import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import frTranslation from '../locales/fr/translation.json';
import enTranslation from '../locales/en/translation.json';
import esTranslation from '../locales/es/translation.json';
import itTranslation from '../locales/it/translation.json';
import deTranslation from '../locales/de/translation.json';

const resources = {
  fr: {
    translation: frTranslation,
  },
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
  it: {
    translation: itTranslation,
  },
  de: {
    translation: deTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    lng: 'fr', // default language
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;