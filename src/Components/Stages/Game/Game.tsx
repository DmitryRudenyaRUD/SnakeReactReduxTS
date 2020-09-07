import React, { useEffect } from 'react'
import Style from './Game.module.scss'
import { connect } from 'react-redux'
import { StoreType } from '../../../Redux/Reducers/rootReducer'
import { OrientationType, PositionType, DOWN, LEFT, RIGHT, UP
       } from '../../../Redux/Reducers/assetsLocationReducer'
import { moveAction } from '../../../Redux/Actions/moveAction'
import { ProgressBar } from './ProgressBar'
import { Hints } from './Hints'
import FieldGame from './FieldGame'
import { pressKeyAction, SPACE } from '../../../Redux/Actions/pressKeyAction'
import { newLocationMouseAction } from '../../../Redux/Actions/newLocationMouseAction'
import { progressAction } from '../../../Redux/Actions/progressAction'
import { push } from 'connected-react-router'


const Game: React.FC<PropsType> = (
    { speed, head, body, mice, pause, time, score, moveAction,
        pressKeyAction, newLocationMouseAction, progressAction, push }
) => {

    const ref = React.useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (!pause) setTimeout(() => move(), speed)
        else progressAction(false)

        if (ref.current) ref.current.focus()
        // eslint-disable-next-line
    }, [head, pause])

    const move = () => {
        if (isGameOver()) push('/End')
        else if (isGrow()) {
            newLocationMouseAction()
            progressAction(true)
            moveAction(true)
        } else {
            progressAction(false)
            moveAction(false)
        }
    }

    const isGameOver = () => {
        const suicide = body.find(({ x, y }: PositionType) => x === head.x && y === head.y)
        if (head.x < 0 || head.x > 30 || head.y < 0 || head.y > 13 || suicide) return true
    }
    const isGrow = () => {
        return mice.find(({ x, y }) => x === head.x && y === head.y)
    }
    const pressKey = (key: OrientationType | typeof SPACE) => {
        if (key === UP || key === DOWN || key === LEFT || key === RIGHT || key === SPACE) pressKeyAction(key)
    }

    const back = () => {
        push('/')
        window.location.reload(false)
    }

    return (
        <div
            tabIndex={0}
            ref={ref}
            onKeyDown={(e) => {
                pressKey(e.key)
            }}
            className={Style.bg}
        >
            <div className={Style.header}>
                <ProgressBar propsClass='score' child={score}/>
                <ProgressBar propsClass='clock' child={time}/>
                <div className={Style.exit}
                     onClick={back}
                />
            </div>
            <Hints/>
            <FieldGame/>
            <div className={Style.pause} hidden={!pause}/>
        </div>
    )
}

const mapStateToProps = (state: StoreType) => {
    return ({
        speed: state.chooseSnakeReducer.speed,
        head: state.assetsLocationReducer.head,
        body: state.assetsLocationReducer.body,
        mice: state.assetsLocationReducer.mice,
        pause: state.assetsLocationReducer.pause,
        time: state.progressReducer.time,
        score: state.progressReducer.score,
        referencePoint: state.progressReducer.referencePoint
    })
}

type StateType = ReturnType<typeof mapStateToProps>
type ActionType = {
    moveAction: (isGrow: boolean) => void
    pressKeyAction: (key: OrientationType | typeof SPACE) => void
    newLocationMouseAction: () => void
    progressAction: (isGrow: boolean) => void
    push: (path: '/End' | '/') => void
}
type PropsType = StateType & ActionType

export default connect(mapStateToProps, { moveAction, pressKeyAction,
    newLocationMouseAction, progressAction, push })(Game)
