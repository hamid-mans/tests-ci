const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');

router.get('/', async (req, res) => {
  const posts = await Post.getAll();
  res.json(posts);
});

router.get('/:id', async (req, res) => {
  const post = await Post.getById(req.params.id);
  res.json(post);
});

router.post('/', async (req, res) => {
  const newPost = await Post.create(req.body);
  res.json(newPost);
});

router.put('/:id', async (req, res) => {
  const result = await Post.update(req.params.id, req.body);
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const result = await Post.delete(req.params.id);
  res.json(result);
});

module.exports = router;