const initialState = {
  firstName: "Richard",
  lastName: "",
  isValid: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FIRST_NAME':
      return {
        ...state,
        firstName: action.payload,
      }
    case 'SET_LAST_NAME':
      return {
        ...state,
        lastName: action.payload,
      }
    case 'SET_IS_VALID':
      return {
        ...state,
        isValid: action.payload,
      }
    default:
      return state
  }
}