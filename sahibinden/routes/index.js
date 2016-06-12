import express from 'express';
import chalk from 'chalk';

const router = new express.Router();

/* GET'll return hello json res. */
router.get('/', (req, res) => {
  res.status(404).json('There is nothing for you.');
});
