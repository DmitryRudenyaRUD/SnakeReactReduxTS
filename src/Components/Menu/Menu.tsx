import React from 'react'
import Style from './Menu.module.scss'
import { Link } from 'react-router-dom'

export const Menu = () => {
    return (
        <div className={Style.container}>
            <Link to='/game'>START</Link>
            <Link to='/ChooseSnake'>Choose Snake</Link>
            <Link to='/HighScore'>High Score</Link>
        </div>
    )
}