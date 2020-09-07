import React from 'react'
import Style from './End.module.css'
import { connect } from 'react-redux'
import { StoreType } from '../../Redux/Reducers/rootReducer'
import { formAction } from '../../Redux/Actions/formAction'
import { ToolTip } from './ToolTip'
import { push } from 'connected-react-router'

const End: React.FC<PropsType> = ({ value, tip, sent, formAction, push }) => {
    if(sent) push('/HighScore')
    const ref = React.useRef<HTMLInputElement | null>(null)

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        formAction(e.currentTarget.value, false)
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        formAction(value, true)
    }

    return (
        <div className={Style.bg}>
            <div className={Style.header}>THE END</div>
            <ToolTip tip={tip}/>
            <form onSubmit={submit}>
                <input
                    autoFocus={true}
                    ref={ref}
                    onChange={onChange}
                    type='text'
                    className={Style.input}
                    value={value}
                    placeholder='enter a name'/>
            </form>
            <p className={Style.text}>...and press ENTER</p>
        </div>
    )
}

const mapStateToProps = (state: StoreType) => {
    return {
        value: state.formReducer.value,
        tip: state.formReducer.tip,
        sent: state.formReducer.sent
    }
}
type ActionType = {
    formAction: (text: string, isSend: boolean) => void
    push: (path: '/HighScore') => void
}
type StateType = ReturnType<typeof mapStateToProps>
type PropsType = StateType & ActionType

export default connect(mapStateToProps, { formAction, push })(End)