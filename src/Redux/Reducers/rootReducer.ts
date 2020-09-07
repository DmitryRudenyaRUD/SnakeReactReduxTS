import { History } from 'history'
import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { chooseSnakeReducer, ISnakeIndicators } from './chooseSnakeReducer'
import { assetsLocationReducer, LocationStateType } from './assetsLocationReducer'
import { progressReducer, ProgressType } from './progressReducer'
import { formReducer,FormType } from './formReducer'
import { requestResultsReducer, RequestResultsType } from './requestResultsReducer'


export const rootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    chooseSnakeReducer,
    assetsLocationReducer,
    progressReducer,
    formReducer,
    requestResultsReducer
});

export interface StoreType {
    router: RouterState,
    chooseSnakeReducer: ISnakeIndicators,
    assetsLocationReducer: LocationStateType,
    progressReducer: ProgressType,
    formReducer: FormType,
    requestResultsReducer: RequestResultsType
}