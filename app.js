
var express = require('express')
  , http = require('http')
  , settings = require('./config/settings')
  , happy = require('node-happy')
  , path = require('path')
  , MongoStore = require('connect-mongo')(express);

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || settings.app.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'Happy node',
    store: new MongoStore({
      host: settings.db.host,
      port: settings.db.port,
      db: settings.db.name
    })
    
  }));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//init happy
happy.init(settings.happy);

//init the routes
require('./routes/index')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
