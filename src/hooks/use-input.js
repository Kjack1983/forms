import React, { useReducer } from 'react'

const actionTypes = {
    INPUT: 'INPUT',
    BLUR: 'BLUR',
    RESET: 'RESET'
}

const initialInputState = {
    value: '',
    isTouched: false
}

const inputStateReducer = (state, action) => {
    switch(action?.type) {
        case actionTypes.INPUT:
            return { 
                value: action.value,
                isTouched: state.isTouched
            }
        case actionTypes.BLUR:
            return {
                value: state.value,
                isTouched: true
            }
        case actionTypes.RESET:
            return {
                value: '',
                isTouched: false
            }
        default:
            console.log(`NO TYPE PROVIDED`.red);
            break
    }
}

export default function useInput(validateValue) {

    if(typeof validateValue !== 'function') {
        throw new Error('Argument is not a function');
    }

    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event) => {
        dispatch({type: 'INPUT', value: event.target.value});
    }

    const inputBlurHandler = () => {
        dispatch({type: 'BLUR'});
    }

    const reset = () => {
        dispatch({type: 'RESET'})
    }

    return { 
        value: inputState.value, 
        hasError,
        isValid: valueIsValid, 
        valueChangeHandler, 
        inputBlurHandler,
        reset
    };
}
