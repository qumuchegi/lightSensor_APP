var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const WebSocket = require('ws');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var allRouter = require('./routes/getall')
var loginRouter = require('./routes/login')
var goodsPub = require('./routes/goodsPub')
var needpub = require('./routes/needsPub')
 
var app = express();
///

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//允许跨域
app.all('*',function(req,res,next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Content-Length,Authorization, token,cache,Accept,yourHeaderFeild");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type","application/json;charset=utf-8");
  next();
  });

  ///为单片机项目
   
  const wss = new WebSocket.Server({port:80});
  wss.on('connection',function(ws){
    console.log('ws connected!');
    ws.on('message',function(data){
      console.log('message',data)
      wss.clients.forEach(client=>client.send(data))
    })
  })
 
app.use('/users', usersRouter);
app.use('/register',registerRouter)
app.use('/getall',allRouter)
app.use('/login',loginRouter)
app.use('/goodspub',goodsPub)
app.use('/needspub',needpub)
 
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
