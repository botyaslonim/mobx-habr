import React, {useCallback, useEffect} from 'react';
import { connect } from 'react-redux';

import { setFirstName, setLastName, setIsValid } from '../actions/FormActions';

const Form = (props) => {
  const {
    state: {
      firstName,
      lastName,
      isValid,
    },
    setFirstName,
    setLastName,
    setIsValid,
  } = props;

  useEffect(() => {
    if (firstName.length > 2 && lastName.length > 2) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [firstName, lastName]);

  const handleSubmit = useCallback(() => {
    const requestBody = JSON.stringify({ firstName, lastName});
    console.log(requestBody);
    console.log('need Thunk/Saga/etc.')
  }, [firstName, lastName]);

  return (
    <div className="container">
      <div className="form-group button">
        <label>
          Имя
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </label>
        <label>
          Фамилия
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </label>
        <button
          className="button"
          type="submit"
          disabled={!isValid}
          onClick={handleSubmit}
        >Послать</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    setFirstName: (value) => {
      dispatch(setFirstName(value));
    },
    setLastName: (value) => {
      dispatch(setLastName(value));
    },
    setIsValid: (value) => {
      dispatch(setIsValid(value));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);