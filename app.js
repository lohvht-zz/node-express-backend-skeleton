var express = require('express');

var middleware = require('./middleware');
var routes = require('./routes');

var app = express();

//middleware.config(app);
//routes.register(app);

//TODO: Write Register routes
// app.use('/', index);
// app.use('/users', users);

// Catch 404 and redirect to another page instead
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
