import React from 'react'
import { Loading } from './Loading'

export const Pregame = () => {
    const Game: React.FC<any> = React.lazy(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
        return import('./Game/Game');
    })

    return (
        <React.Suspense fallback={<Loading/>}>
            <Game/>
        </React.Suspense>
    )
}