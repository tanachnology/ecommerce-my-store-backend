const express = require('express')
const routerApi = require('./routes')
const { logError, errorHandler, boomErrorHandler } = require('./middleware/error.handle')
const cors = require('cors');

const port = 3000
const app = express()


app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
  res.send("hola mi server en express")

});


routerApi(app)
app.use(logError)
app.use(boomErrorHandler)
app.use(errorHandler)


app.listen(port, ()=>{
  console.log(`My port: http://localhost:${port}`);
})

