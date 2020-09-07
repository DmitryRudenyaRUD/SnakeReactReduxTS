import React from 'react'
import Style from './Loading.module.css'

export const Loading = () => {
    return (
        <div className={Style.bg}>
            <div className={Style.loading}/>
            <p className={Style.text}>LOADING...</p>
        </div>
    )
}