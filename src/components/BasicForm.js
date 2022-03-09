import React from 'react';
import useInput from '../hooks/use-input';

const BasicForm = (props) => {

  const {
    value: enterFirstname,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: inputBlurFirstNameHandler,
    reset: inputFirstnameReset
  } = useInput(value => value.trim() !== '');

  const {
    value: enterLastname,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: inputBlurLastNameHandler,
    reset: inputLastnameReset
  } = useInput(value => value.trim() !== '');


  const {
    value: enterEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: inputBluremailHandler,
    reset: inputEmailReset
  } = useInput(value => value.trim() !== '' && value.includes('@'));

  let formIsValid = false;
  
  if(firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if(!firstNameIsValid && !lastNameIsValid && !emailIsValid) {
      return;
    }

    inputFirstnameReset();
    inputLastnameReset();
    inputEmailReset();
  }

  const firstNameInputClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
  const lastNameInputClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input 
            type='text' 
            id='firstname' 
            onChange={firstNameChangeHandler}
            onBlur={inputBlurFirstNameHandler}
            value={enterFirstname}
          />
          {firstNameHasError && <p className='error-text'>firsname must not be empty</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input 
            type='text' 
            id='lastname'
            onChange={lastNameChangeHandler}
            onBlur={inputBlurLastNameHandler}
            value={enterLastname}
          />
          {lastNameHasError && <p className='error-text'>lastname must not be empty</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input 
          type='text' 
          id='email'
          onChange={emailChangeHandler}
          onBlur={inputBluremailHandler}
          value={enterEmail}
        />
        {emailHasError && <p className='error-text'>Email must not be empty</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
