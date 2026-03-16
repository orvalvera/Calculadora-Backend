const asyncHandler = require("express-async-handler");
const Gasto = require("../models/gastosModel");

const getGastos = asyncHandler(async (req, res) => {
    const gastos = await Gasto.find({});
    res.status(200).json(gastos);
});

const addGastos = asyncHandler(async (req, res) => {
    if (!req.body.descripcion) {
        res.status(400)
        throw new Error('Por favor ingrese una descripción');
    }

    if (!req.body.importe) {
        res.status(400)
        throw new Error('Por favor ingrese un importe');
    }

    const gasto = await Gasto.create({
        descripcion: req.body.descripcion,
        importe: req.body.importe
    })

    if (gasto) {
        res.status(201).json(gasto);
    } else {
        res.status(500)
        throw new Error('Error al crear el gasto');
    }
});

const deleteGastos = asyncHandler(async (req, res) => {
    const gasto = await Gasto.findById(req.params.id);

    if (!gasto) {
        res.status(404)
        throw new Error('No se encontro ese gasto')
    }

    await Gasto.deleteOne(gasto)

    res.status(200).json({ Mensaje: 'Gasto eliminado' })
})

module.exports = {
    getGastos,
    addGastos,
    deleteGastos
};