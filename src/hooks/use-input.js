import React, { useState } from 'react'

export default function useInput(validateValue) {

    if(typeof validateValue !== 'function') {
        throw new Error('Argument is not a function');
    }

    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);

    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value);
    }

    const inputBlurHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }

    return { 
        value: enteredValue, 
        hasError,
        isValid: valueIsValid, 
        valueChangeHandler, 
        inputBlurHandler,
        reset
    };
}
