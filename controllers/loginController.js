var happyOps = require('../config/settings').happy;
var happy = require('node-happy');

module.exports = {

  login: function(req, res){
    var email = req.body.email || "";
    var password = req.body.password || "";

    happy.getToken({email: email, password: password}, function(err, token){
      if(err){ return res.render('login', {message: err.message.err || err.message}); }

      req.session.token = token;
      req.session.email = email;
      res.redirect('/');
    });
    
  },

  //logout, destroy the session and the session in mongo
  logout: function(req, res){
    req.session.destroy();
    res.redirect('/');
  },

  signup: function(req, res){
    
    var data = req.body;
    happy.signup(data, function(err, token){
      if(err){ return res.render('signup', {message: err.message.err || err.message}); }
       
      req.session.token = token;
      req.session.email = data.email;
      res.redirect('/');
    });
  }

}
