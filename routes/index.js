var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/trends', function(req, res, next) {
  res.render('formulario');
});
router.get('/trends/visualize', function(req, res, next) {
  res.render('paleta');
});

module.exports = router;
