const cuid = require('cuid');
const db = require('./db');

const Order = db.model('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{ type: String, ref: 'Product', required: true }],
  status: { type: String, default: 'CREATED', enum: ['CREATED', 'PENDING', 'COMPLETED'] },
});

async function list({ offset = 0, limit = 25, productId, status } = {}) {
  const query = {
    ...(productId && { products: productId }),
    ...(status && { status }),
  };
  return Order.find(query).sort({ _id: 1 }).skip(offset).limit(limit);
}

async function get(_id) {
  return Order.findById(_id).populate('products').exec();
}

async function create(fields) {
  const order = await new Order(fields).save();
  return order.populate('products');
}

async function edit(_id, change) {
  const order = await get(_id);
  Object.assign(order, change);
  return order.save();
}

async function destroy(_id) {
  return Order.deleteOne({ _id });
}

module.exports = { list, get, create, edit, destroy };
