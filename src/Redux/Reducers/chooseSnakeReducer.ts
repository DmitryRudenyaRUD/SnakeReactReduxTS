import { IChooseSnakeAction, CHOOSE_SNAKE } from "../Actions/chooseSnakeAction"

export type ISnakeIndicators = {
    speed: number
    model: number
}
const initialState: ISnakeIndicators = {
    speed: 250,
    model: 3
}

export const chooseSnakeReducer = (
    state = initialState, { type, data }: IChooseSnakeAction
): ISnakeIndicators => {
    if(type === CHOOSE_SNAKE) return { ...data }
    else return state
}