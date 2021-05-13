const express = require('express');
const session = require('express-session');
const router = express.Router();
const bodyParser = require('body-parser')


router.use(session({
    secret: 'freedrow',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
router.use(bodyParser.json());
module.exports= router;