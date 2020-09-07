import { ProgressType } from '../Reducers/progressReducer'
import { ThunkAction } from 'redux-thunk'
import { StoreType } from '../Reducers/rootReducer'
import { speedScale } from '../../Components/ChooseSnake/ChooseSnake'

export const TIME = 'TIME'

export interface IProgressAction {
    type: typeof TIME
    data: ProgressType
}

export const progressAction = (isGrow: boolean): ThunkAction<void, StoreType, null, IProgressAction> =>
    (dispatch, getState) => {
        const pause = getState().assetsLocationReducer.pause
        const time = getState().progressReducer.time
        const model = getState().chooseSnakeReducer.model
        const score = getState().progressReducer.score
        const durationPause = getState().progressReducer.durationPause
        const referencePoint = getState().progressReducer.referencePoint ?
            getState().progressReducer.referencePoint :
            Date.now()

        const newScore: number = isGrow ? score + speedScale[model - 1] * 10 : score
        //changing the reference point relative to the length of the pause
        const newDurationPause = pause && !durationPause ? Date.now() : durationPause
        const newReferencePoint = !pause && newDurationPause ?
            referencePoint! + (Date.now() - newDurationPause) :
            referencePoint
        const newTime: string = pause ? time : new Intl.DateTimeFormat('ru', {
            minute: 'numeric',
            second: 'numeric'
        }).format(new Date(Date.now() - newReferencePoint!))

        dispatch({
            type: TIME,
            data: {
                score: newScore,
                time: newTime,
                referencePoint: newReferencePoint,
                durationPause: !pause ? null : newDurationPause
            }
        })
    }