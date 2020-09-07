import React from 'react'
import Style from './Game.module.scss'
import { connect } from 'react-redux'
import { StoreType } from '../../../Redux/Reducers/rootReducer'
import { BloodType, PositionType } from '../../../Redux/Reducers/assetsLocationReducer'

const FieldGame: React.FC<StateType> = ({ orientation, head, blood, body, mice, model }) => {
    const columns = [...new Array(30).keys()];
    const rows = [...new Array(13).keys()];

    const handlerClass = (y: number, x: number): string | undefined => {
        const index: number | undefined = [head, blood, ...mice, ...body].findIndex((i: PositionType | BloodType) => {
            return i.x === x && i.y === y
        })
        return index === 0 ? Style[`head${orientation}${model}`] :
            index === 1 ? Style['blood'] :
                index > 1 && index < mice.length + 2 ? Style['mouse'] :
                    index > mice.length + 1 ? Style[`snake${model}`] :
                        undefined
    }

    return (
        <div className={Style.container}>
            <div className={Style.column}>{
                rows.map(y => (
                    <div className={Style.row} key={y}>{
                        columns.map(x => (
                            <div key={x} className={Style.cell}>
                                <div className={handlerClass(y, x)}/>
                            </div>
                        ))}
                    </div>
                ))
            }</div>
        </div>
    )
}

const mapStateToProps = (state: StoreType) => {
    return ({
        orientation: state.assetsLocationReducer.orientation,
        head: state.assetsLocationReducer.head,
        body: state.assetsLocationReducer.body,
        mice: state.assetsLocationReducer.mice,
        blood: state.assetsLocationReducer.blood,
        model: state.chooseSnakeReducer.model
    })
}
type StateType = ReturnType<typeof mapStateToProps>

export default connect(mapStateToProps)(FieldGame)