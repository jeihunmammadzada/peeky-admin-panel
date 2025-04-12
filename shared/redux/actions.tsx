export const ThemeChanger =
  (value: any) =>
  async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch({
      type: "ThemeChanger",
      payload: value,
    });
  };

export const SetLoggedUser =
  (value: any) =>
  async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch({
      type: "SetLoggedUser",
      payload: value,
    });
  };

export const SetFilterDate =
  (value: any) =>
  async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch({
      type: "SetFilterDate",
      payload: value,
    });
  };
