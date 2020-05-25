const express = require('express');
const knex = require('../data/db-config.js');

const router = express.Router();

router.use('/', (req, res, next) => {
  console.log('Cars router working');
  next();
});

router.get('/', async (req, res) => {
  try {
    const carsData = await knex('cars');
    res.status(200).json(carsData);
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: 'Server error, unable to GET cars', error: err });
  }
});

module.exports = router;
