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

router.put('/:id', (req, res) => {
  const CarData = req.body;
  const { id } = req.params;

  knex('cars')
    .update(CarData)
    .where({ id })
    .then((car) => {
      res.status(200).json(CarData);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: 'Server Error unable to PUT car', error: err });
    });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [deleted] = await knex('cars').where({ id });
    const car = await knex('cars').del().where({ id });
    if (car > 0) {
      res.status(200).json(deleted);
    } else {
      res.status(404).json({ message: "Can't delete the car" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ errorMessage: 'Server Error unable to DELETE car', error: err });
  }
});

module.exports = router;
