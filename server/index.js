import path from 'path'
import fs from 'fs'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'

import App from '../src/App'

const PORT = 3005
const app = express()


app.get('/', (req, res) => {
    const app = ReactDOMServer.renderToString(<App />)

    console.log("static React: ", app)

    const indexFile = path.resolve('./dist/index.html')

    console.log("indexFile", indexFile)

    fs.readFile(indexFile, 'utf-8', (err, data) => {
        if (err) {
            console.error('boing: ', err)
            return res.status(500).send('Opps')
        }

        console.log("data: >>>>", data)

        console.log("<<<<<<<<")

        // inject stringified app into HTML
        // the send as response 

        const ssrOutput = data.replace('<div id="app"></div>',
        `<div id="app">${app}</div>
        <div>SSR!</div>`)

        console.log(ssrOutput)

        return res.send(ssrOutput)
    })
})

app.use(express.static('./dist'))

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });