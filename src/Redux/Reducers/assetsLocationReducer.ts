import { MOVE, IMoveAction } from '../Actions/moveAction'
import { PRESS_KEY, PRESS_PAUSE, IPressKeyAction } from '../Actions/pressKeyAction'
import { INewLocationMouseAction, NEW_MICE } from '../Actions/newLocationMouseAction'

export const [RIGHT, DOWN, LEFT, UP] = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp']
export type OrientationType = typeof RIGHT | typeof DOWN | typeof LEFT | typeof UP
export type PositionType = { x: number, y: number }
export type BloodType = { x: number | null, y: number | null }
export type LocationStateType = typeof initialState

const initialState = {
    orientation: 'ArrowRight' as OrientationType,
    head: { x: 3, y: 6 } as PositionType,
    body: [
        { x: 0, y: 6 },
        { x: 1, y: 6 },
        { x: 2, y: 6 },
    ] as Array<PositionType>,
    mice: [
        { x: 9, y: 6 },
        { x: 20, y: 10 }
    ] as Array<PositionType>,
    blood: {x: null, y: null} as BloodType,
    pause: false as boolean
}

export const assetsLocationReducer = (
    state = initialState, { type, data }: IMoveAction | IPressKeyAction | INewLocationMouseAction
): LocationStateType => {
    switch (type) {
        case state.pause || MOVE:    //This way the pause is triggered instantly
        case PRESS_KEY:
        case PRESS_PAUSE:
        case NEW_MICE:
            return { ...state, ...data }
        default:
            return state
    }
}