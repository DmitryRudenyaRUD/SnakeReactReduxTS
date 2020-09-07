import { ThunkAction } from 'redux-thunk'
import { StoreType } from '../Reducers/rootReducer'
import { RequestResultsType } from '../Reducers/requestResultsReducer'

export const FETCHING = 'FETCHING'
export const FETCHED = 'FETCHED'

export interface IRequestResultsAction {
    type: typeof FETCHING | typeof FETCHED
    payload: {
        [K in keyof RequestResultsType]?: RequestResultsType[K]
    }
}

export const requestResultsAction = ():
    ThunkAction<void, StoreType, null, IRequestResultsAction> =>
    dispatch => {
        dispatch({
            type: FETCHING,
            payload: { isFetching: true }
        })
        fetch('https://snake-db988.firebaseio.com/results.json')
            .then(response => {
                if (response.status !== 200) return Promise.reject(new Error(response.statusText))
                else return response
            })
            .then(response => response.json())
            .then(data => {
                if(!data) return Promise.reject(new Error('No results yet'))

                let array = []
                for (let key in data) array.push(data[key])
                return array
            })
            .then(data => dispatch({
                type: FETCHED,
                payload: {
                    data,
                    isFetching: false
                }
            }))
            .catch(error => dispatch({
                type: FETCHED,
                payload: {
                    error: error.toString(),
                    isFetching: false
                }
            }))
    }
