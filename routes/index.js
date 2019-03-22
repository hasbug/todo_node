var express = require('express');
var router = express.Router();
var todoSchema = require('../mongodb/ToDoSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
