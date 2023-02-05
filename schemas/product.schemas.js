const Joi = require('joi');

const productId = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const idProduct = Joi.number().integer();
const StorageId = Joi.string();
const colorId = Joi.string();

const createProductSchema = Joi.object({
  idProduct: idProduct.required(),
  StorageId: StorageId.required(),
  colorId: colorId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

const getProductSchema = Joi.object({
  productId: productId.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
