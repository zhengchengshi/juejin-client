const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const body_parser = require('body-parser')
const articleListRouter = require('./routes/articleList');
const usersRouter = require('./routes/users');
const articleRouter = require('./routes/article');
const historyRouter = require('./routes/history')
const addHistoryRouter = require('./routes/addHistory');
const database = require('./model/core');

// const getTagRouter = require('./routes/tags')

var app = express();
// const { createProxyMiddleware } = require('http-proxy-middleware');

// app.use('/', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());
app.use('/homepage', articleListRouter);
// app.use('/users', usersRouter);
app.use('/article',articleRouter);
app.use('/history',historyRouter);
app.use('/addHistory',addHistoryRouter)
// app.use('/getTag',getTagRouter)
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

// app.listen(8080)
module.exports = app;
