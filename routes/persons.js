const express = require('express'); //Inyección de la dependencia
const { route } = require('express/lib/application');
const router = express.Router(); //Se instala el "router" al que asociaremos nuestras rutas
const mongoose = require('mongoose') //"Inyección de la dependencia de "mongoose"
let Person = require('../models/person') //Inyección la dependencia del modelo "person"

router.get('/persons', function (req, res, next) {
    Person.find(function (err, persons) {
        if(err) return next(err);
        //res.json(persons)
        res.render('personsIndex', {persons})
    });
}); 

router.get('/person', function (req, res) {
    res.render('person');
}) 

router.post('/addPerson', function(req, res) { 
    const myPerson = new Person({             
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss }); //crea la entidad
        myPerson.save(); // guarda en bd
        res.redirect('/persons')
});

module.exports = router; //Exportamos el ruteador