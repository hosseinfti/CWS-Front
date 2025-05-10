import { getCookie } from "../api";

export const authChecker = (navigate, status = 200) => {
  const token = getCookie("token");
  if (!token || status === 401) {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/sign-in", { replace: true });
  }
};

// DOC: to transfer date from Miladi to Shamsi 
new Date().toLocaleDateString("fa-ir")
// DOC: to show Shamsi date with English characters
new Date().toLocaleDateString("fa-IR-u-nu-latn")

