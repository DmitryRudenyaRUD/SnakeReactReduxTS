import { PositionType, BloodType, UP, DOWN, LEFT } from '../Reducers/assetsLocationReducer'
import { ThunkAction } from 'redux-thunk'
import { StoreType } from '../Reducers/rootReducer'

export const MOVE = 'MOVE'

export interface IMoveAction {
    type: typeof MOVE,
    data: {
        head: PositionType,
        body: Array<PositionType>,
        blood: BloodType
    }
}

export const moveAction = (isGrow: boolean): ThunkAction<void, StoreType, null, IMoveAction> =>
    (dispatch, getState) => {
        const orientation = getState().assetsLocationReducer.orientation
        const head = getState().assetsLocationReducer.head
        const body = getState().assetsLocationReducer.body
        let { x, y } = head
        const [newHead, blood] = orientation === UP ? [{ ...head, y: --y } , { ...head, y: y - 2 }] :
            orientation === DOWN ? [{ ...head, y: ++y }, { ...head, y: y + 2}] :
                orientation === LEFT ? [{ ...head, x: --x },  {...head, x: x - 2}] :
                    [{ ...head, x: ++x }, { ...head, x: x + 2 }]
        const newBody: Array<PositionType> = isGrow ? body.concat(head) : body.concat(head).splice(1)     //if it doesn't grow, we delete the body
        dispatch({
            type: MOVE,
            data: {
                head: newHead,
                body: newBody,
                blood: isGrow ? blood : {x: null,  y: null}
            }
        })
    }