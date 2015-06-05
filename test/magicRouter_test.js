'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaihttp = require('chai-http');
chai.use(chaihttp);

describe('magicRouter.js', function(){
	var magicObj = {
		name: 'lazer',
		damage: 232
	};
	describe('POST /api/magic', function(){
		it('should return a magic object', function(done){
			chai.request('localhost:3000')
				.post('/api/magic')
				.send(magicObj)
				.end(function(err, res){
					if (err) throw err;
					expect(res.body.name).to.eql('lazer');	
					done();
				});
		});
	});

	describe('GET /api/magic/lazer', function(){
		it('should retrurn a magic object', function(){
			chai.request('localhost:3000')
				.get('/api/magic')
				.end(function(err, res){
					if (err) throw err;
					expect(res.body.name).to.eql('lazer');	
					done();
				});
		});
	});

	describe('PUT /api/magic/lazer', function(){
		magicObj.damage = 11;
		it('should retrurn a magic object with damage 11', function(){
			chai.request('localhost:3000')
				.get('/api/magic')
				.end(function(err, res){
					if (err) throw err;
					expect(res.body.damage).to.eql(11);	
					done();
				});
		});
	});

	describe('DELETE /api/magic/lazer', function(){
		magicObj.damage = 11;
		it('should retrurn status 200', function(){
			chai.request('localhost:3000')
				.del('/api/magic/lazer')
				.end(function(err, res){
					if (err) throw err;
					expect(res.status).to.eql(200);	
					done();
				});
		});
	});
});
