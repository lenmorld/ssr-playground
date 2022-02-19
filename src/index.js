import React from 'react'
import ReactDOM from "react-dom";


// import { hydrate } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import reducer from '../reducers'

// indicate to DOM renderer that we intend to
// rehydrate app after a server-side render
const app = document.getElementById('app')
// ReactDOM.hydrate(<App />, app);

// REDUX
const store = createStore(reducer, window.__PRELOADED_STATE__)

// garbage-collect so not usable globally!
delete window.__PRELOADED_STATE__

ReactDOM.hydrate(
    <Provider store={store}>
        <App />
    </Provider>,
    app
)
