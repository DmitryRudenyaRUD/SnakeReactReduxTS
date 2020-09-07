import React from 'react'
import Style from './End.module.css'

export const ToolTip: React.FC<{tip: boolean}> = ({ tip }) => {
    return (
        <div hidden={!tip}>
            <div className={Style.tooltip}>{
                'At least 3 characters!'
            }
            </div>
            <div className={Style.bubble1}/>
            <div className={Style.bubble2}/>
            <div className={Style.bubble3}/>
        </div>
    )
}