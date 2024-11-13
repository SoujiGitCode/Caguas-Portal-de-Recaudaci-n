import { useReducer } from "react";

export const ALERT_TIME = 5000;
export const initialState = {
  text: "",
  type: "",
};

export type AlertState = {
  text: string;
  type: string;
};

type Actions = "ACTIVATE";

interface Payload {
  activate?: boolean;
}

export interface GlobalAction {
  type: Actions;
  payload?: Payload;
}

const reducer = (state: any, action: GlobalAction) => {
  switch (action.type) {
    case "ACTIVATE": {
      return { ...state, activate: !state.activate };
    }
    default:
      return state;
  }
};

const useMainState = () => {
  return useReducer(reducer, initialState);
};

export default useMainState;
