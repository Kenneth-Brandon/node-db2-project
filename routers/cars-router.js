const express = require('express');
const knex = require('../data/db-config.js');

const router = express.Router();

router.use((req, res, next) => {
  console.log('in cars router');
  next();
});

router.get('/', async (req, res) => {
  try {
    const carDatas = await knex('cars');
    res.status(200).json(carDatas);
  } catch (err) {
    res.status(500).json({
      errorMessage: 'Server Error, unable to GET carDatas ',
      error: err,
    });
  }
});

router.post('/', (req, res) => {
  const CarData = req.body;
  knex('cars')
    .insert(CarData)
    .then((car) => {
      res.status(200).json(CarData);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: 'Server Error, unable to POST CarData ',
        error: err,
      });
    });
});

module.exports = router;
