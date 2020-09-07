import React from 'react'
import Style from './Game.module.scss'

export const Hints = () =>
    <div className={Style.bgTips}>
        <div className={Style.arrows}/>
        <p>MOVEMENTS</p>
        <div className={Style.space}/>
        <p>PAUSE</p>
    </div>
