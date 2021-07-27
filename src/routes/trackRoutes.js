const express = require('express');
const mongoose = require('mongoose');
const Tracks = mongoose.model('Tracks');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();
router.use(requireAuth);

router.get('/tracks', async (req, res) => {
  const tracks = await Tracks.find({ userID: req.user._id });
  res.send(tracks);
});

router.post('/tracks', async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res.status(422).send({ error: 'Must provide name and location' });
  }
  try {
    const track = new Tracks({ name, locations, userID: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    return res.status(422).send({ error: 'Failed to add track!!\nTry again later' });
  }
});

module.exports = router;
