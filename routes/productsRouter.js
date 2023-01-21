const express = require('express')
const ProductsService = require('../services/product.services')
const {createProductSchema, updateProductSchema, getProductSchema  } = require('../schemas/product.schemas')
const validatorHandler = require('./../middleware/validator.handler')

const router = express.Router();
const productService = new ProductsService();

router.get('/', async (req, res)=>{
  const products = await productService.find();
  res.json(products)
});

router.get('/:productId',
validatorHandler(getProductSchema,"params" ),
 async (req, res, next)=>{
  try {
    const {productId} = req.params
    const product = await productService.findOne(productId);

      res.status(200).json({
        product
      });
  } catch (error) {
    next(error)
  }
});

router.post('/',
validatorHandler(createProductSchema,"body" ),
async (req,res)=>{
  const body = req.body;
  const newProduct = await productService.create(body);
  res.status(201).json(newProduct)
})

router.patch('/:productId',
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body'),
async (req,res, next)=>{
  try {
    const { productId } = req.params
    const body = req.body;
    const product = await productService.update(productId, body);
    res.json(product)
  } catch (error) {
    next(error)
  }

})

router.delete('/:productId', async (req,res)=>{
  const { productId } = req.params
  const rta = await productService.delete(productId);
  res.json(rta)
})

module.exports = router
