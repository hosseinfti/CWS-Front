import React, { useEffect, useState } from "react";
import Router from "./routes";
import "./App.scss";

import { I18nProvider, LOCALES } from "./i18n";
import translate from "./i18n/translate";
import Loading from "./components/Loading/Loading";

export const CwsContext = React.createContext();

function App() {
  const [name, setName] = useState();
  const [family, setFamily] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [locale, setLocale] = useState(LOCALES.PERSIAN);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    if (currentLang) {
      setLocale(currentLang);
    }
  }, []);

  useEffect(() => {
    locale && locale !== null && localStorage.setItem("lang", locale);
    setIsLoading(false);
  }, [locale]);

  const handleName = (e) => {
    setName(e);
  };
  const handleFamily = (e) => {
    setFamily(e);
  };
  const handleEmail = (e) => {
    setEmail(e);
  };
  const handlePassword = (e) => {
    setPassword(e);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e);
  };

  const handleLocale = (e) => {
    setLocale(e);
  };
  // console.log(translate("wellcome"));
  return (
    <I18nProvider locale={locale}>
      <CwsContext.Provider
        value={{
          name,
          family,
          email,
          password,
          phoneNumber,
          locale,
          setName: (e) => {
            handleName(e);
          },
          setFamily: (e) => {
            handleFamily(e);
          },
          setEmail: (e) => {
            handleEmail(e);
          },
          setPassword: (e) => {
            handlePassword(e);
          },
          setPhoneNumber: (e) => {
            handlePhoneNumber(e);
          },
          setLocale: (e) => {
            handleLocale(e);
          },
        }}
      >
        {isLoading ? <Loading /> : <Router />}
      </CwsContext.Provider>
    </I18nProvider>
  );
}
export default App;
