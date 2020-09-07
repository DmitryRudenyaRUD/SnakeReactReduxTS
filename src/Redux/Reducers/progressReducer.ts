import { TIME, IProgressAction } from '../Actions/progressAction'

export type ProgressType = typeof initialState
const initialState = {
    score: 0 as number,
    time: '00:00' as string,
    referencePoint: null as number | null,
    durationPause: null as number | null
}

export const progressReducer = (
    state = initialState, { type, data }: IProgressAction
): ProgressType => {
    if (type === TIME) return { ...data }
    else return state
}