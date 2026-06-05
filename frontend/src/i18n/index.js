// Configuración global del idioma (español / inglés)

import { createI18n } from "vue-i18n";

import es from "./es.json";
import en from "./en.json";

/* =========================
   IDIOMA INICIAL
========================= */
const savedLang = localStorage.getItem("lang");

const i18n = createI18n({
  legacy: false,
  locale: savedLang || "es",
  fallbackLocale: "es",
  messages: {
    es,
    en,
  },
});

export default i18n;
