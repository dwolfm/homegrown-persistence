'use strict';

var bodyParser = require('body-parser');
var Magic = require('../models/magic.js');
var Fsctlr = require('../lib/fs-controler.js');
var colors = require('colors');

var fsctlr = new Fsctlr();
module.exports = function(router){
	router.use(bodyParser.json());

	router.get('/magic/:name', function(req, res){
		console.log('  hit get magic endpoint'.cyan);
		var readMagic = {name: req.params.name};
		fsctlr.readMagic(readMagic, function(err, obj){
			if (err) {
				return res.status(500).json({err: 'sry bub cant find that file'}).send();
			}
			console.log('is dis problem');
			res.status(200).json(obj);
		});
	});

	router.post('/magic', function(req,res){
		console.log('   hit post magic endpoint'.cyan);

		if (!req.body.name || !req.body.damage){
			console.log('post magicObj didnt have name or damage');
			return res.status(666).json({err: 'data you sent was bad for magic'}).send();
		}

		fsctlr.newMagic(req.body, function(err, obj){
			if (err){
				return res.status(500).json({err: err.message}).send();
			}	
			res.status(200).json(obj);
		});
	});

	router.put('/magic', function(req,res){
		console.log('   hit post magic endpoint'.cyan);
		console.log(req.body.lala);

		if (!req.body.name || !req.body.damage){
			console.log('post magicObj didnt have name or damage');
			return res.status(666).json({err: 'data you sent was bad for magic'}).send();
		}

		fsctlr.writeMagic(req.body, function(err, obj){
			if (err){
				return res.status(500).json({err: err.message}).send();
			}	
			res.status(200).json(obj);
		});
	});

	router.patch('/magic', function(req,res){
		console.log('   hit post magic endpoint'.cyan);
		console.log(req.body.name);
		if (!req.body.name){
			console.log('magic must have a name');
			return res.status(666).json({err: 'must have a name'});
		}

		if (!req.body.style && !req.body.damage){
			console.log('must gimme a json file with a pram to update');
			return res.status(666).json({err: 'must have a prop to update'});
		}
		
		// check that there is only one param to update
		if (!((!req.body.style && req.body.damage|| (req.body.style && !req.body.damage)) )){
			console.log('must only update one param of magic'.red);
			return res.status(666).json({err: 'must only update one param of magic'}).send();
		}

		fsctlr.readMagic(req.body, function(err, data){
			if (err) return ress.status(666).json({err: 'coulndt read file'}).send();
			for (var key in req.body){
				console.log(key);
				data[key] = req.body[key];
			}

			fsctlr.writeMagic(data, function(err, obj){
				if (err){
					return res.status(500).json({err: err.message}).send();
				}	
				res.status(200).json(obj);
			});
		});
	});

	router.delete('/magic/:name', function(req,res){
		console.log('   hit delete magic endpoint'.cyan);
		fsctlr.deleteMagic({name: req.params.name}, function(err){
			if (err){
				return res.status(500).json({err: err.message}).send();
			}
			res.status(200).send('we deleted that file');
		});
		//res.status(200).json({msg: 'you delete et'});
	});

};

