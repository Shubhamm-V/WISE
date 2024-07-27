import "react-i18next";

declare module "react-i18next" {
  interface Resources {
    en: typeof import("./src/translations/en.json");
    hi: typeof import("./src/translations/hi.json");
    // Add other languages here
  }
}
