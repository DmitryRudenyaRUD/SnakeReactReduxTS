import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { configureStore, history } from './Redux/storeFactory'
import { Menu } from './Components/Menu/Menu'
import { ChooseSnake } from './Components/ChooseSnake/ChooseSnake'
import { Pregame } from './Components/Stages/Pregame'
import End from './Components/Stages/End'
import HighScore from './Components/HighScore/HighScore'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path='/' component={Menu}/>
                <Route path='/ChooseSnake' component={ChooseSnake}/>
                <Route path='/Game' component={Pregame}/>
                <Route path='/End' component={End}/>
                <Route path='/HighScore' component={HighScore} />
            </Switch>
        </ConnectedRouter>
    </Provider>
    ,
    document.getElementById('root')
)


