import { ThunkAction } from 'redux-thunk'
import { StoreType } from '../Reducers/rootReducer'

export const ENTER_TEXT = 'ENTER_TEXT'
export const INCORRECT_DATA = 'INCORRECT_DATA'
export const FORM_SUBMISSION = 'FORM_SUBMISSION'

export interface IFormAction {
    type: typeof ENTER_TEXT | typeof INCORRECT_DATA | typeof FORM_SUBMISSION,
    data: {
        value: string,
        tip?: boolean
    }
}

const timeFormat = (date: number) => {
    return new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(date)
}

export const formAction = (text: string, isSend: boolean): ThunkAction<void, StoreType, null, IFormAction> =>
    (dispatch, getState) => {
        const reg: RegExp = /[a-zA-Z0-9]{0,10}/
        if(isSend) {
            if(text.length < 3) {
                dispatch({
                    type: INCORRECT_DATA,
                    data: {
                        value: text,
                        tip: true
                    }
                })
            } else {
                fetch('https://snake-db988.firebaseio.com/results.json', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(
                        {
                            name: text,
                            date: timeFormat(Date.now()),
                            score: getState().progressReducer.score,
                            time: getState().progressReducer.time
                        }
                    )
                }).then(() => dispatch({
                        type: FORM_SUBMISSION,
                        data: {
                            value: '',
                            tip: false,
                            sent: true
                        }
                    }))
            }
        } else {
            dispatch({
                type: ENTER_TEXT,
                data: {
                    value: reg.test(text) ? text.match(reg)![0] : ''
                }
            })
        }
    }