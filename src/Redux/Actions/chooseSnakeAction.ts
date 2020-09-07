import { ISnakeIndicators } from '../Reducers/chooseSnakeReducer'

export const CHOOSE_SNAKE = 'CHOOSE_SNAKE'

export interface IChooseSnakeAction {
    type: typeof CHOOSE_SNAKE
    data: ISnakeIndicators
}

export const chooseSnakeAction = (
    { speed, model }: ISnakeIndicators
): IChooseSnakeAction => {
    return {
        type: CHOOSE_SNAKE,
        data: {
            speed,
            model
        }
    }
}
