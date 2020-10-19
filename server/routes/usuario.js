const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });

    usuario.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                'ok': false,
                err,
            });
        }

        res.json({
            ok: true,
            userDB,
        });
    });


});


app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                'ok': false,
                err,
            });
        }

        res.json({
            ok: true,
            userDB,
        });
    })
});


app.get('/usuarios', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let hasta = req.query.hasta || 0;
    hasta = Number(hasta);
    let estado = req.query.estado || null;
    estado = estado != null ? String(estado) : null;

    Usuario.find({ estado }, 'nombre email estado')
        .skip(desde)
        .limit(hasta)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    'ok': false,
                    err,
                });
            }

            Usuario.count({ estado }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cantidad: conteo
                });

            });

        });
});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiarEstado = {
        estado: false,
    }
    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true, runValidators: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                'ok': false,
                err,
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                'ok': false,
                'message': 'Usuario no encontrado',
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado,
        });


    });

});

module.exports = app;