import React, { useEffect } from 'react'
import Style from './HighScore.module.css'
import { connect } from 'react-redux'
import { StoreType } from '../../Redux/Reducers/rootReducer'
import { requestResultsAction } from '../../Redux/Actions/requestResultsAction'
import { Loading } from '../Stages/Loading'
import { v4 as uuid } from 'uuid'
import { push } from 'connected-react-router'

const HighScore: React.FC<PropsType> = ({ data, isFetching, error, requestResultsAction, push }) => {
    useEffect(() => {
        requestResultsAction()
        // eslint-disable-next-line
    }, [])

    let results = data.concat()
    if (!isFetching) results.sort((a, b) => b.score - a.score)

    const back = () => {
        push('/')
        window.location.reload(true)
    }

    const content =
        isFetching ?
        <div style={{ zoom: 0.60, marginLeft: 500, marginTop: -50 }}>
            <Loading/>
        </div> :
        error ? <p className={Style.error}>{error}</p> :
            <ul>{
                results.map((item, ind) => (
                    <li
                        key={uuid()}
                        className={Style.list}>{
                        <>
                            <span>{`${ind + 1}. `}</span>
                            <span className={Style.date}>{item.date}</span>
                            <span>{item.name}</span>
                            <span className={Style.score}>{item.score}</span>
                            <span className={Style.time}>{item.time}</span>
                        </>
                    }</li>
                ))
            }</ul>

    return (
        <div className={Style.bg}>
            <div className={Style.banner}/>
            <div className={Style.exit}
                 onClick={back}
            />
            <span className={Style.header}>TIME SCORE</span>
            {content}
        </div>
    )
}

const mapStateToProps = (state: StoreType) => {
    return ({
        data: state.requestResultsReducer.data,
        isFetching: state.requestResultsReducer.isFetching,
        error: state.requestResultsReducer.error
    })
}

type StateType = ReturnType<typeof mapStateToProps>
type ActionType = {
    requestResultsAction: () => void
    push: (path: '/') => void
}
type PropsType = StateType & ActionType

export default connect(mapStateToProps, { requestResultsAction, push })(HighScore)