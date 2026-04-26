//Configuración global del idioma (español/inglés)

import { createi18n } from "vue-i18n";

import es from "./es.json";
import en from "./en.json";

const i18n = createi18n({
    legacy: false,
    locale: localStorage.getItem("lang") || "es",
    fallbackLocale: "es",
    messages: {
        es,
        en
    }
});

export default i18n;