import express from 'express'
import { getCars, getCar, search, createCar, deleteCar, updateCar } from '../controllers/carController.js'

const router = express.Router();

router.get('/', getCars);

router.get('/search/:id', getCar)

router.get('/search', search)

router.post('/', createCar)

router.delete('/:id', deleteCar)

router.put('/:id', updateCar)

export default router;