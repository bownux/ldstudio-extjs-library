(function() {

  /*
  Module dependencies.
  */

  var app, express, port, routes;

  express = require('express');

  routes = require('./config/routes.js');

  app = module.exports = express.createServer();

  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', {
      layout: false
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
      secret: 'ymu7ac6raus9ldstudio'
    }));
    app.use(require('stylus').middleware({
      src: __dirname + '/public'
    }));
    app.use(app.router);
    return app.use(express.static(__dirname + '/public'));
  });

  app.configure('development', function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });

  app.configure('production', function() {
    return app.use(express.errorHandler);
  });

  app.get('/', routes.index);

  app.get('/widget', routes.widget);

  app.get('/view', routes.view);

  port = process.env.PORT || 3000;

  if (!module.parent) {
    app.listen(port);
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  }

}).call(this);
