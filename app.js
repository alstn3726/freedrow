const fs = require('fs');
const createError = require('http-errors');
const session = require('express-session');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mysql = require('mysql');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejs = require('ejs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const signupchkRouter = require('./routes/signupchk');
const comunityboardRouter = require('./routes/comunity_board');
const shopboardRouter = require('./routes/shop_board');
// const league_c_boardRouter = require('./routes/league_c_board');
// const league_s_boardRouter = require('./routes/league_s_board');
const league_noticeRouter = require('./routes/league_notice');
const main_noticeRouter = require('./routes/main_notice');
const recruitment1Router = require('./routes/recruitment1');
const recruitment2Router = require('./routes/recruitment2');
const recruitment3Router = require('./routes/recruitment3');
const recruitment4Router = require('./routes/recruitment4');
const scoreRouter = require('./routes/score');
const teamRouter = require('./routes/team');
const playerRouter = require('./routes/player');
const adminRouter = require('./routes/admin');
const leaguemainRouter = require('./routes/league_main');
const leaguescoreRouter = require('./routes/league_score');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/signupchk', signupchkRouter);
app.use('/comunity_board/list', comunityboardRouter);
app.use('/shop_board/list', shopboardRouter);
// app.use('/league_c_board/list', league_c_boardRouter);
// app.use('/league_s_board/list', league_s_boardRouter);
app.use('/league_notice/list', league_noticeRouter);
app.use('/main_notice/list',  main_noticeRouter);
app.use('/recruitment1/list', recruitment1Router);
app.use('/recruitment2/list', recruitment2Router);
app.use('/recruitment3/list', recruitment3Router);
app.use('/recruitment4/list', recruitment4Router);
app.use('/score', scoreRouter);
app.use('/search/team', teamRouter);
app.use('/search/player', playerRouter);
app.use('/admin', adminRouter);
app.use('/league_main', leaguemainRouter);
app.use('/league_score', leaguescoreRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
