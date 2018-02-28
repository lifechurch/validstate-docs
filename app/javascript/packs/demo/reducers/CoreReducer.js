import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  NAME_CHANGED,
  ACCOUNT_SUBMITTED
} from "../actions/types";

const INITIAL_STATE = {
  email: '',
  password: '',
  name: '',
  paymentMethod: { 
    id: '', 
    display_label: '', 
    payment_type: '',
    payment_method_type: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case NAME_CHANGED: 
      return { ...state, name: action.payload }; 
    default:
      return state;
  }
};
