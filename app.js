const _ = require('lodash');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { ERRORS, FAIL_JSON } = require('./server/config/const');
const { appMock } = require('./server/models');
const index = require('./server/routes/index');
const api = require('./server/routes/api');

const app = express();

// view engine setup
hbs.registerPartials(__dirname + '/server/views/partials');
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'html');

app.engine('html', hbs.__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/__api', api);

app.use(async (req, res, next) => {
  const pid = req.headers.pid;
  if (pid != null) {
    try {
      const mocks = await appMock.findOne({
        where: { url: req.path, appProjectId: pid },
        raw: true,
      });
      if (mocks) {
        const resData = JSON.parse(mocks.mockVo);
        return setTimeout(() => {
          res.json(resData);
        }, resData.timer);
      } else {
        return res.json(ERRORS['none']);
      }
    } catch (e) {
      return res.json(ERRORS['db']);
    }
  }
  next();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
