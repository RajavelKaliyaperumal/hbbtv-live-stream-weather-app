// Define the state type
export interface State {
    displayWeather: boolean;
    displayWeatherMenu: boolean;
    displayPlayerProgress: boolean;
    displayPlayerMenu: boolean;
  }

  export const ActionTypes = {
    SHOW_WEATHER: "SHOW_WEATHER",
    SHOW_WEATHERMENU: "SHOW_WEATHERMENU",
    SHOW_PLAYERPROGRESS: "SHOW_PLAYERPROGRESS",
    SHOW_PLAYERMENU: "SHOW_PLAYERMENU",
    HIDE_WEATHER: "HIDE_WEATHER",
    HIDE_WEATHERMENU: "HIDE_WEATHERMENU",
    HIDE_PLAYERPROGRESS: "HIDE_PLAYERPROGRESS",
    HIDE_PLAYERMENU: "HIDE_PLAYERMENU",
  } as const;

// Define the type for the action object using keyof
export type Action = {
  type: keyof typeof ActionTypes;
};

  // Initial state
 export const initialState = {
    displayWeather: false,
    displayWeatherMenu : false,
    displayPlayerProgress: false,
    displayPlayerMenu : false,
  };

  
  // Reducer function to update state based on dispatched actions
  export const reducer = (state : State, action : Action) => {
    switch (action.type) {
      case ActionTypes.SHOW_WEATHER:
        return { ...state, displayWeather: true };
      case ActionTypes.SHOW_WEATHERMENU:
        return { ...state, displayWeatherMenu: true };
      case ActionTypes.SHOW_PLAYERPROGRESS:
          return { ...state, displayPlayerProgress: true };
      case ActionTypes.SHOW_PLAYERMENU:
          return { ...state, displayPlayerMenu: true };
      case ActionTypes.HIDE_WEATHER:
          return { ...state, displayWeather: false };
      case ActionTypes.HIDE_WEATHERMENU:
          return { ...state, displayWeatherMenu: false };
      case ActionTypes.HIDE_PLAYERPROGRESS:
          return { ...state, displayPlayerProgress: false };
      case ActionTypes.HIDE_PLAYERMENU:
          return { ...state, displayPlayerMenu: false };
      default:
        return state;
    }
  };