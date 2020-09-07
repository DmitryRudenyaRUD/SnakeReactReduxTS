import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { rootReducer } from './Reducers/rootReducer'
import thunk from 'redux-thunk'

export const history = createBrowserHistory();

export function configureStore() {
    return (
        createStore(
            rootReducer(history),
            compose(
                applyMiddleware(
                    routerMiddleware(history),
                    thunk
                ),
                (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
            ),
        )
    )
}