import { PositionType } from '../Reducers/assetsLocationReducer'
import { ThunkAction } from 'redux-thunk'
import { StoreType } from '../Reducers/rootReducer'

export const NEW_MICE = 'NEW_MICE'

export interface INewLocationMouseAction {
    type: typeof NEW_MICE,
    data: Array<PositionType>
}

export const newLocationMouseAction = (): ThunkAction<void, StoreType, null, INewLocationMouseAction> =>
    (dispatch, getState) => {
        const reducer = getState().assetsLocationReducer
        const {body, blood, head, mice} = reducer
        const columns = [...new Array(30).keys()]
        const rows = [...new Array(13).keys()]
        const field: Array<PositionType> = columns.flatMap(x => rows.map(y => ({ x, y })));   //Creating an array of all cells in the field

        [head, blood, ...body,...mice].forEach(item =>{                       //removing occupied cells
            field.forEach(({x, y}, ind, arr) => item.x === x && item.y === y ? arr.splice(ind, 1) : null)
        })

        const index = mice.findIndex(({ x, y }) => x === head.x && y === head.y)  //determine which of the mice
        const newMouse = field[ Math.floor(Math.random() * field.length) ]
        const newMice = mice.splice(index, 1, newMouse)

        dispatch({
            type: NEW_MICE,
            data: newMice
        })
    }