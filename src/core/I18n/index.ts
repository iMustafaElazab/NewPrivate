import {Platform, NativeModules, I18nManager} from 'react-native';
import {I18n} from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import RNRestart from 'react-native-restart';
import memoize from 'lodash.memoize';

import {AppLanguages} from 'enums';
import {getLanguage, setLanguage} from '../LocalStorage';

const getLogMessage = (message: string) => {
  return `## I18n: ${message}`;
};

const translationGetters = {
  ar: () => require('../../translations/ar.json'),
  en: () => require('../../translations/en.json'),
};

const i18n = new I18n();

// Get device language.
const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

const defaultLocale: string =
  deviceLanguage.toLowerCase().indexOf(AppLanguages.ARABIC) > -1
    ? AppLanguages.ARABIC
    : AppLanguages.ENGLISH;

export const setI18nConfig = async () => {
  console.info(getLogMessage('setI18nConfig'));

  // Define the supported translations.
  i18n.translations = {
    [AppLanguages.ARABIC]: translationGetters.ar(),
    [AppLanguages.ENGLISH]: translationGetters.en(),
  };

  const locales = RNLocalize.getLocales();

  if (Array.isArray(locales)) {
    i18n.locale = locales[0].languageTag;
  }

  // If an English translation is not available in en.js, it will look inside ar.js
  i18n.enableFallback = true;

  // It will convert HOME_noteTitle to "HOME note title"
  // if the value of HOME_noteTitle doesn't exist in any of the translation files.
  i18n.missingBehavior = 'guess';

  // Clear translation cache.
  translate?.cache?.clear?.();

  // If the current locale in device is not en or ar.
  i18n.defaultLocale = defaultLocale;

  // Get user language.
  const userLanguage = await getLanguage();

  // Set the locale.
  await updateLanguage(userLanguage);
};

export const updateLanguage = async (language?: AppLanguages | null) => {
  console.info(getLogMessage('updateLanguage'), language);
  const locale = language || defaultLocale;

  // Save user language.
  if (language) {
    await setLanguage(language);
  }

  // Clear translation cache.
  translate?.cache?.clear?.();

  // Set the locale.
  i18n.locale = locale;
  I18nManager.allowRTL(locale === AppLanguages.ARABIC);
  I18nManager.forceRTL(locale === AppLanguages.ARABIC);

  if (locale === AppLanguages.ARABIC && !I18nManager.isRTL) {
    setTimeout(() => RNRestart.Restart(), 500);
  }

  if (locale === AppLanguages.ENGLISH && I18nManager.isRTL) {
    setTimeout(() => RNRestart.Restart(), 500);
  }
};

export const getCurrentLocale = () => i18n.locale;

export const translate = memoize(
  key => i18n.t(key),
  key => key,
);
