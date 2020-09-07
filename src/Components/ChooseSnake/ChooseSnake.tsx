import React from 'react'
import Style from './ChooseSnake.module.scss'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { push } from 'connected-react-router'
import { chooseSnakeAction } from '../../Redux/Actions/chooseSnakeAction'

export const speedScale: Array<number> = [1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6]
const speedIndicator: Array<number> = [350, 250, 200, 100, 75, 50]

export const ChooseSnake = () => {
    const dispatch = useDispatch()
    const choose = (e: React.SyntheticEvent<HTMLDivElement>) => {
        const model: number = Number(e.currentTarget.dataset.model)
        const speed: number = Number(e.currentTarget.dataset.speed)
        dispatch(chooseSnakeAction({speed , model}))
        dispatch(push('/Game'))
    }

    return (
        <div className={Style.bg}>{
            speedScale.map((num, index) => (
                    <div
                        key={uuid()}
                        data-model={index + 1}
                        data-speed={speedIndicator[num]}
                        className={Style.icon}
                        onClick={choose}
                    >
                        <div className={Style[`s${index + 1}`]}/>
                        <div className={Style.string}>SPEED</div>
                        <div className={Style.scale}>{
                            [...new Array(num).keys()].map(() => (
                                    < div key={uuid()} className={Style.cell}/>
                                )
                            )
                        }
                        </div>
                    </div>
                )
            )
        }
        </div>
    )
}


