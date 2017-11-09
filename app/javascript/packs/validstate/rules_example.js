const VALIDATION_RULES = {
  amountSubmitable: {
    amount: { number: true, min: 0.5 },
    //OPTIONAL
    _messages: {
      amount: { 
        number: "Amount must be a number.",
        min: "Amount must be greater than $0.50."
      }
    }
  },
  postDonation: { 
    amount: { number: true, min: 0.5 },
    paymentMethodList: { minLength: 1 }
  },
  userCanDoThing: {
    amount: { number: true, min: 5000 },
    paymentMethod: { equalTo: "VISA" },
    username: { required: true }
  }
}

const INITIAL_STATE = { 
  amount: {
    valid: false,
    reason: "number",
    message: ""
  },
  paymentMethod: {
    valid: true,
    reason: null,
  }
};