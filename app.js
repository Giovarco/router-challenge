var middleware = require('./js-src/index.js');

var app = middleware.createServer();

app.use(function (req, res, next) {
  res.write('preamble');
  next();
});

app.use('/hello', function (req, res, next) {
  res.write('hello');
  next();
});

app.use('/world', function (req, res, next) {
  res.write('world');
  next();
});

app.use('/', function (req, res, next) {
  res.end();
});

app.listen(3000);