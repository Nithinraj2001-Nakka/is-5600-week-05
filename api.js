const path = require('path');
const Products = require('./products');
const Orders = require('./orders');
const autoCatch = require('./lib/auto-catch');

// Root route handler
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
}

// Products handlers
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;
  res.json(await Products.list({ offset: Number(offset), limit: Number(limit), tag }));
}

async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);
  if (!product) return next();
  res.json(product);
}

async function createProduct(req, res) {
  const product = await Products.create(req.body);
  res.json(product);
}

async function editProduct(req, res) {
  const { id } = req.params;
  const change = req.body;
  const product = await Products.edit(id, change);
  res.json(product);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  const response = await Products.destroy(id);
  res.json(response);
}

// Orders handlers
async function listOrders(req, res) {
  const { offset = 0, limit = 25, productId, status } = req.query;
  res.json(await Orders.list({ offset: Number(offset), limit: Number(limit), productId, status }));
}

async function createOrder(req, res) {
  const order = await Orders.create(req.body);
  res.json(order);
}

async function editOrder(req, res) {
  const { id } = req.params;
  const change = req.body;
  const order = await Orders.edit(id, change);
  res.json(order);
}

async function deleteOrder(req, res) {
  const { id } = req.params;
  await Orders.destroy(id);
  res.json({ message: 'Order deleted successfully' });
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  listOrders,
  createOrder,
  editOrder,
  deleteOrder,
});
