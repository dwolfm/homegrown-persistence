'use strict';
var fs = require('fs');
var colors = require('colors');

var  FSCTRLR = function(){
};
module.exports = exports = FSCTRLR;

FSCTRLR.prototype.readMagic = function(obj, callback){
	fs.readFile('./data/' + obj.name + '.json', function(err, data){
		if (err){
			console.log('err reading magic.json'.red);
			return callback(err, null);
		}
		try {
			data = JSON.parse(data);
		} catch(e) {
			console.log('err parsing json in readMagic'.red);
			console.log(e);
			return callback(e, null);
		}
		callback(null, data);
	});	
};

FSCTRLR.prototype.writeMagic = function(obj, callback){
	var json = JSON.stringify(obj);
	console.log(json);
	fs.writeFile('./data/' + obj.name + '.json', json, function(err){
		if (err) {
			console.log('err writing magic.json'.red);
			return callback(err, null);
		}
		callback(null, obj);
	});
};

FSCTRLR.prototype.newMagic = function(obj, callback){
	fs.exists('./data/' + obj.name + '.json', function(exists){
		if(exists) return callback(new Error('magic file allready exists'), null);
		var fsctlr = new FSCTRLR();
		fsctlr.writeMagic(obj, callback);
	});
};

FSCTRLR.prototype.deleteMagic = function(obj, callback){
	fs.exists('./data/' + obj.name + '.json', function(exists){
		if(!exists) return callback(new Error('file dont exist to delete'), null);
		fs.unlink('./data/' + obj.name + '.json', function(err){
			if (err) return callback(err, null);
			callback(null);
		});
	});

};
