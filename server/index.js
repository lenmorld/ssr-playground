import path from 'path'
import fs from 'fs'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'

import App from '../src/App'

import reducer from '../reducers/'

const PORT = 3005
const app = express()

// redux stuff
import { Provider } from 'react-redux'
import { createStore } from 'redux'

app.get('/', (req, res) => {
    // const app = ReactDOMServer.renderToString(<App />)
    //  === REDUX ===

    const store = createStore(reducer)

    const app = ReactDOMServer.renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    )

    // initial state of Redux store
    const preloadedState = store.getState()

    console.log("preloadedState: ", preloadedState)

    // ==============

    console.log("static React: ", app)

    const indexFile = path.resolve('./dist/index.html')

    console.log("indexFile", indexFile)

    fs.readFile(indexFile, 'utf-8', (err, data) => {
        if (err) {
            console.error('boing: ', err)
            return res.status(500).send('Opps')
        }

        console.log("#### HTML file: >>>>", data)

        console.log("<<<<<<<<")

        // inject stringified app into HTML
        // the send as response 

        const ssrOutput = data.replace('<div id="app"></div>',
            `
            <div id="app">${app}</div>
            <hr />
            <div>SSR!</div>

            <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // https://redux.js.org/usage/server-rendering#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
            /</g,
            '\\u003c'
            )}
            </script>
            `)

        console.log("### ssrOutput: ", ssrOutput)

        return res.send(ssrOutput)
    })
})

app.use(express.static('./dist'))

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });