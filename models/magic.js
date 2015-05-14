var Magic = function(obj){
	this.name = obj.name;
	this.damage = obj.damage;
};

Magic.prototype.toJSON = function(){
	return JSON.stringify({ name: this.name, damage: this.damage});
};

module.exports = Magic;
