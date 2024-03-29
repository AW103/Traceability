const express = require('express')
const app = express()
const path = require('path')

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'fd4371627c0c426d91aaea49dfdda411',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')
app.use(rollbar.errorHandler())

app.use(express.json());

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get("/hello", (req,res) => {  
    try{
        fakeHello()
res.status(200).send("Hello there")
} catch (err) {
    console.error("Not working")
    rollbar.critical("This is critical err")
    rollbar.info("This is info err")
    rollbar.warning("This is warning err")
}
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server rocking out on ${port}`)
})
