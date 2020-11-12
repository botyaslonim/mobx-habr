export function setFirstName(value) {
  return {
    type: 'SET_FIRST_NAME',
    payload: value,
  }
}

export function setLastName(value) {
  return {
    type: 'SET_LAST_NAME',
    payload: value,
  }
}

export function setIsValid(value) {
  return {
    type: 'SET_IS_VALID',
    payload: value,
  }
}