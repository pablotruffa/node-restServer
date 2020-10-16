require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.json('Hello World');
});

app.post('/usuario', function(req, res) {
    let body = req.body;
    if (body.edad === undefined) {
        res.status(400).json({
            'ok': false,
            'msg': 'La edad es un campo requerido',
        });
    }
    res.json({
        body
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
})