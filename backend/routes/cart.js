const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// GET /api/cart  -> return user's cart
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('cart');
    return res.json(user.cart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/cart  -> add item (or increment quantity if exists)
router.post('/', auth, async (req, res) => {
  try {
    const { item } = req.body; // item: { productId, title, price, image, quantity }
    if (!item || !item.productId) return res.status(400).json({ message: 'Invalid item' });

    const user = await User.findById(req.user.id);
    const existing = user.cart.find(ci => ci.productId === item.productId);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
    } else {
      user.cart.push({
        productId: item.productId,
        title: item.title,
        price: item.price,
        image: item.image,
        description: item.description || '',
        quantity: item.quantity || 1
      });
    }

    await user.save();
    return res.json(user.cart); // return updated cart
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/cart/:productId -> remove item
router.delete('/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(ci => ci.productId !== productId);
    await user.save();
    return res.json(user.cart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/cart -> replace full cart (body: { cart: [...] })
router.put('/', auth, async (req, res) => {
  try {
    const { cart } = req.body;
    const user = await User.findById(req.user.id);
    user.cart = Array.isArray(cart) ? cart : [];
    await user.save();
    return res.json(user.cart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/cart/clear -> empty cart
router.post('/clear', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.cart = [];
    await user.save();
    return res.json(user.cart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
