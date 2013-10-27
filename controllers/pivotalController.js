var happyOps = require('../config/settings').happy;
var happy = require('node-happy');

module.exports = {

  projects: function(req, res){
    happy.getProjects(req.session.token, function(err, projects){
      if(err){ return res.send(err.message); }    

      res.send(projects);
    });
  }

};
