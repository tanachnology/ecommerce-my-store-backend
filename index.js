const express = require('express')
const routerApi = require('./routes')
const cors = require('cors');
const { logError, errorHandler, boomErrorHandler } = require('./middleware/error.handle')
const {swaggerDocs: V1SwaggerDocs } = require('./swagger')




const PORT = process.env.PORT || 3000
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


app.listen(PORT, ()=>{
  console.log(`My port: http://localhost:${PORT}`);
  V1SwaggerDocs(app, PORT)
})

