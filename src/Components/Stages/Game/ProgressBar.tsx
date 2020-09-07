import React from 'react'
import Style from './Game.module.scss'

export const ProgressBar = ({ propsClass, child }:
                                { propsClass: string, child: string | number }) => {
    return (
        <>
            <div className={Style[propsClass]}/>
            <span className={Style.text}>{child}</span>
        </>
    )
}