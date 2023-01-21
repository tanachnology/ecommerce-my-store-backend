const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Swagger API",
    version: "1.0.0",
    description: "Ejemplo de documentación de API con Swagger"
  },
  servers: [
    {
      url: "http://localhost:3000"
    }
  ]
};


const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs =(app, port) =>{
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('/api/v1/docs.json',(req,res) => {
    res.setHeader('Content-type', 'application/json')
    res.send(swaggerSpec)
  } )
  console.log('Version 1 docs');
}


module.exports = { swaggerDocs }
