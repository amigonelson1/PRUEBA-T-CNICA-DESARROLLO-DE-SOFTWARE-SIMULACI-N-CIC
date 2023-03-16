const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const eschema = mongoose.Schema;

const eschemacurso = new eschema({
    idcurso: String,
    nombre: String,
    tutor: String,
    temas: String,
});

const ModeloCurso = mongoose.model('cursos', eschemacurso);
module.exports = router

//crear curso nuevo
router.post('/agregar', async (req, res) => {
    try {
        const nuevocurso = new ModeloCurso({
            nombre: req.body.nombre,
            tutor: req.body.tutor,
            temas: req.body.temas,
            idcurso: req.body.idcurso,
        })
        await nuevocurso.save();
        res.json({ message: nuevocurso });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error al crear el nuevo curso' });
    }

});

//obtener los cursos existentes
router.get('/obtenercursos', async (req, res) => {
    try {
        const cursos = await ModeloCurso.find().lean();
        res.json(cursos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error al obtener los cursos' });
    }
});

//obtener curso por idcurso
router.post('/obtenercurso', async (req, res) => {
    try {
        const curso = await ModeloCurso.find({ idcurso: req.body.idcurso }).lean();
        res.json(curso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error al obtener el curso' });
    }
});

//actualizar curso
router.post('/actualizarcurso', async (req, res) => {
    try {
        const cursoactualizado = await ModeloCurso.findOneAndUpdate({ idcurso: req.body.idcurso }, {
            nombre: req.body.nombre,
            tutor: req.body.tutor,
            temas: req.body.temas,
        });
        res.json(cursoactualizado);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error al editar el curso' });
    }
});

//eliminar curso
router.post('/eliminar', async (req, res) => {
    try {
        await ModeloCurso.findOneAndDelete({ idcurso: req.body.idcurso });
        res.json({ message: 'Curso eliminado' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error al eliminar el curso' });
    }
});