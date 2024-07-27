import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization"; // If using Expo

import en from "./src/translations/en.json";
import hi from "./src/translations/hi.json";

const languageDetector = {
  type: "languageDetector" as const,
  async: true,
  detect: (callback: (lang: string) => void) => {
    const locale = Localization.locale.split("-")[0]; // Extract language code
    callback(locale);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
