const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');

exports.config = function(app){
  //socialAuth.config();

  //NOTE: ENV is set when starting the node server
  const env = process.env.NODE_ENV || 'development';
  switch(env){
    //Default Configuration
    default:
      //Redirects www.<URLNAME>.com  to <URLNAME>.com
      // app.use(function(req, res, next){
      //   if(req.get('host').match(/^www.*$/i)){
      //     //NOTE: Replace URL with domain name
      //     res.redirect('http://codetunnel.com' + req.url);
      //   } else {
      //     next();
      //   }
      // });

      //Do Not Cache By Default (For I.E.)
      app.use(function(req, res, next){
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
        next();
      });

      // view engine setup
      app.set('views', path.join(__dirname, ".." ,'views'));
      app.set('view engine', 'jade');

      // uncomment after placing your favicon in /public
      // app.use(favicon(path.join(__dirname, ".." ,'public', 'favicon.ico')));
      app.use(logger('dev'));
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(cookieParser());
      //Matches request mapped to FILES directly
      app.use(express.static(path.join(__dirname, '..', 'public')));

      //NOTE: Potential sessions redirect?
      //NOTE: may wanna install sessions
      //Jade template
      // app.locals = {
      //   title: process.env.BANNER_TEXT,
      //   bannerText: process.env.BANNER_TEXT,
      //   moment: moment,
      //   markdown: markdown
      // };

      // If JS is on, get a nice AJAX experience, hot loads the content of the page if its an AJAX request
      // NOTE: MAY NOT USE IT, SUBSTITUTE IT WITH FRONT END REACT CODE , ALSO REPLACE WITH SERVER SIDE RENDERING OF REACT PAGE
      // app.use(function(req, res, next){
      //   if(!req.session.redirectUrl){
      //     req.session.redirectUrl = '/';
      //   }
      //   res.renderView = function (viewName, viewModel){
      //     if(!req.xhr){
      //       res.render(viewName+'_full', viewModel);
      //     } else {
      //       res.render(viewName, viewModel, function(err, view){
      //         if (err) {
      //           return next(err);
      //         }
      //         res.json({
      //           title: viewModel.title || app.locals.title,
      //           bannerText: viewModel. bannerText || app.locals.bannerText,
      //           view: view,
      //           url: req.url
      //         });
      //       });
      //     }
      //   };
      //   res.locals = {
      //     user: req.user,
      //     currentUrl: encodedURIComponent(req.url)
      //   };
      //   next();
      // });

      //Handle routes for this request
      //NOTE: This line is deprecated, research on ways to route to API/Template
      app.use(app.router);

      //Handles 404 errors
      app.use(function(req, res, next){
        try{
          res.status(404);
          const viewModel = {
            title: 'Page Not Found',
            bannerText: 'Page Not Found',
            url: req.url
          };
          res.renderView('shared/404', viewModel);
        } catch (err) {
          next(err);
        }
      });

      //Handle server errors
      app.use(function(err, req, res, next) {
        try {
          const statusCode = err.status || 500;
          res.status(statusCode);
          const viewModel = {
            title: statusCode + ' server error',
            bannerText: 'Uh oh!',
            statusCode: statusCode,
            error: err
          };
          res.renderView('shared/500', viewModel);
        } catch (exception) {
          console.log('Error while rendering error view');
          console.log(exception.stack);
          next(err);
        }
      });

      //FALL THROUGH

    case 'development':
      //TODO: install errorhandler package from npm
      console.log("Development Settings Config Loaded");
      app.use(errorhandler());
      break;

    case 'production':

      break;
  }
};

