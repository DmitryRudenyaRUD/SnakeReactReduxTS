import { OrientationType } from '../Reducers/assetsLocationReducer'
import { ThunkAction } from 'redux-thunk'
import { StoreType } from '../Reducers/rootReducer'

export const PRESS_KEY = 'PRESS_KEY'
export const PRESS_PAUSE = 'PRESS_PAUSE'
export const SPACE = ' '

export interface IPressKeyAction {
    type: typeof PRESS_KEY | typeof PRESS_PAUSE,
    data: {
        orientation?: OrientationType,
        pause?: boolean
    }
}

export const pressKeyAction = (key: OrientationType | typeof SPACE):
    ThunkAction<void, StoreType, null, IPressKeyAction> =>
    (dispatch, getState) => {
        const pause: boolean = getState().assetsLocationReducer.pause
        const response: IPressKeyAction = (key === SPACE) ?
            {
                type: PRESS_PAUSE,
                data: {
                    pause: !pause
                }
            }
            :
            {
                type: PRESS_KEY,
                data: {
                    orientation: key,
                }
            }
            dispatch(response)
    }