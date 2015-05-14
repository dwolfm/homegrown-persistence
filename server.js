'use strict'

var express = require('express');
var app = express();

var magicRouter = express.Router();
require('./routes/magicRouter.js')(magicRouter);
app.use('/api', magicRouter);

app.use(function(req, res){
	res.status(404).send('sury bub 404');
});


app.listen(3070, function(){
	console.log('starting app');
});


