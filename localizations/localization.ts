import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import * as EN from './languages/en.json'
import * as ES from './languages/es.json'

const translations = {
  en: EN,
  es: ES,
};

export const localization = new I18n(translations)

localization.locale = getLocales()[0].languageCode ?? 'en';

localization.enableFallback = true;
