import { FETCHING, FETCHED, IRequestResultsAction } from '../Actions/requestResultsAction'

export type RequestResultsType = typeof initialState
const initialState = {
    data: [{
        name: 'Dima' as string,
        date: '28.08.20' as string,
        score: 9999 as number,
        time: '59:59' as string
    }],
    isFetching: false as boolean,
    error: null as null | string
}


export const requestResultsReducer = (
    state = initialState, { type, payload }: IRequestResultsAction
): RequestResultsType => {
    switch (type) {
        case FETCHING: return { ...state, ...payload }
        case FETCHED: return { ...state, ...payload }
        default: return state
    }

}