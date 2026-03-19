import React, { useState } from "react";
import LanguageContext from "./language";

function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "kz");

  function changeLang(l) {
    setLang(l);
    localStorage.setItem("lang", l);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
