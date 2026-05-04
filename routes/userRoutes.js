const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/', async (req, res) => {
  const users = await User.getAll();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.getById(req.params.id);
  res.json(user);
});

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body);
  res.json(newUser);
});

router.put('/:id', async (req, res) => {
  const result = await User.update(req.params.id, req.body);
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const result = await User.delete(req.params.id);
  res.json(result);
});

module.exports = router;