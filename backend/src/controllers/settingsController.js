import { getSettings, updateSettings as updateSettingsModel } from "../models/settingsModel.js";

/* =========================
   GET SETTINGS
========================= */
export const getUserSettings = async (req, res, next) => {
  try {
    const settings = await getSettings(req.user.id);

    res.json(settings);

  } catch (error) {
    next(error);
  }
};

/* =========================
   UPDATE SETTINGS
========================= */
export const updateSettings = async (req, res, next) => {
  try {
    const { theme, language } = req.body;
    const allowedThemes = ["light", "dark"];
    const allowedLanguages = ["es", "en"];

    const finalTheme = allowedThemes.includes(theme)
      ? theme
      : "light";

    const finalLanguage = allowedLanguages.includes(language)
      ? language
      : "es";

    await updateSettingsModel(
      req.user.id,
      finalTheme,
      finalLanguage
    );

    res.json({
      message: "Configuración guardada.",
      settings: {
        theme: finalTheme,
        language: finalLanguage,
      },
    });

  } catch (error) {
    next(error);
  }
};
