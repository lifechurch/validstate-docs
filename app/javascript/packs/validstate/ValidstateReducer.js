import {
  VALIDSTATE_INIT,
  VALIDSTATE_SUCCESS,
  VALIDSTATE_FAIL,
  VALIDSTATE_CLEAR
} from "./ValidstateConst";

const INITIAL_STATE = {
  valid: null
}

export default (state = {}, action) => {
  switch (action.type) {
    case VALIDSTATE_INIT:
      console.log(action);
      return { ...state, ...action.payload }
    case VALIDSTATE_SUCCESS:
      return { ...state, valid: true };
    case VALIDSTATE_FAIL:
      return { ...state, valid: false };
    case VALIDSTATE_CLEAR: 
      return { ...INITIAL_STATE }; 
    default:
      return state;
  }
};