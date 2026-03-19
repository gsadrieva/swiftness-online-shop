import { useContext } from "react";
import LanguageContext from "../context/language";
import t from "../i18n/translations";

export function useTranslation() {
  const { lang, setLang } = useContext(LanguageContext);
  return { tr: t[lang], lang, setLang };
}
