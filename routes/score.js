const fs = require('fs');
const createError = require('http-errors');
const session = require('./session');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const client = require('./mysql');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');
const router = express.Router();


router.use(session);

//회원가입 체크s
router.get('/',(req,res)=>{
    console.log('스코어보드 페이지');
    res.render('score');
  });

  
  module.exports = router;