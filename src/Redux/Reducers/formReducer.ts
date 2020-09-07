import {
    IFormAction, ENTER_TEXT,
    INCORRECT_DATA, FORM_SUBMISSION
} from '../Actions/formAction'

export type FormType = typeof initialState
const initialState = {
    value: '' as string,
    tip: false as boolean,
    sent: false as boolean
}

export const formReducer = (
    state = initialState, { type, data }: IFormAction
): FormType => {
    switch (type) {
        case ENTER_TEXT:
        case INCORRECT_DATA:
        case FORM_SUBMISSION: return { ...state, ...data }
        default:
            return state
    }
}