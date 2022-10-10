import { v4 as uuidv4 } from "uuid";
import { REMOVE_ALERT, SET_ALERT } from "../typs";

export const setAlert = (message, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { id, message, alertType },
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, 8000);
};
