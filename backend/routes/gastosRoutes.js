const express = require('express')
const router = express.Router()

const { getGastos, addGastos, deleteGastos} = require('../controllers/gastosControllers')

router.get('/', getGastos)
router.post('/', addGastos)
router.delete('/:id', deleteGastos)

module.exports = router