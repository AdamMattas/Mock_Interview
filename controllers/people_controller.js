var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.Person.findAll({
    include: [ models.Task ]
  }).then(function(people) {
    console.log("PEOPLE!!!!!", people);
    res.render('people/index', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      people: people
    });
  });
});

router.post('/create', function(req, res) {
  models.Person.create({
    name: req.body.name
  }).then(function() {
    res.redirect('/');
  });
});

router.delete('/delete/:name', function(req,res) {
  // use the Person model to delete a person
  // based on the name passed in the url
  models.Person.destroy({
    where: {
      name: req.params.name
    }
  })
  // connect it to this .then.
  .then(function() {
    res.redirect('/');
  });

});

module.exports = router;
