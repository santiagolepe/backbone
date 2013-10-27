var loginController = require('../controllers/loginController');
var pivotalController = require('../controllers/pivotalController');

//MIDDLEWARE for authentication
var auth = function(req, res, next){
  if(!req.session.token){
    return res.redirect('/login');
  }
  next();
}; 

module.exports = function(app){
  //VIEWS 
  app.get('/', auth, function(req, res){
    res.render('index', { title: req.session.email });
  });

  app.get('/login', function(req, res){
    if(req.session.token){
      res.redirect('/');
    }
    return res.render('login');
  });

  app.get('/signup', function(req, res){
    if(req.session.token){
      res.redirect('/');
    }
    res.render('signup');
  });

  //CONTROLLERS
  app.post('/login', loginController.login.bind(loginController));
  app.post('/logout', loginController.logout.bind(loginController));
  app.post('/signup', loginController.signup.bind(loginController));


  //PIVOTAL TRACKER
  app.get('/projects', pivotalController.projects.bind(pivotalController));
};
