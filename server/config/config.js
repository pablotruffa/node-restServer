// =======================
// Puerto
// =======================

process.env.PORT = process.env.PORT || 3000;

// =======================
// Entorno
// =======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =======================
// DB
// =======================

let urlDB;
if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// =======================
// Vencimiento del Token
// =======================
process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;


// =======================
// SEED de atuenticación
// =======================

process.env.SEED = process.env.SEED || 'secret';

/**
 * command heroku config:set SEED="value"
 */