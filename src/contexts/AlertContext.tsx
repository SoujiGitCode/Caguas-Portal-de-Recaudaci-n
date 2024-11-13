import { createContext, ReactNode, useState } from "react";

const ALERT_TIME = 5000;
const initialState = {
  text: "",
  type: "success" || "info" || "warning" || "error" ,
};

type AlertProviderProps = { children: ReactNode };
type AlertColor = "success" | "info" | "warning" | "error";

const AlertContext = createContext({
  ...initialState,
  setAlert: (text: string, type: string) => { },
});

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [text, setText] = useState("");
  const [type, setType] = useState("success");

  const setAlert = (text: string, type: AlertColor) => {
    setText(text);
    setType(type);

    setTimeout(() => {
      setText("");
      setType("");
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
