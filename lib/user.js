var redis = require('redis')
	, bcrypt = require('bcrypt')
	, db = redis.createClient();

module.exports = User;

function User(obj) {

	for (var key in obj){
		this[key] = obj[key];
	}
}


User.prototype.save = function(fn) {
	if (this.id) {
		this.update(fn);
	}else{
		var user = this;
		db.incr('user:ids', function (err,id) {
			if (err) 
				return fn(err);
			user.id = id;
			user.hashPassword(function(err) {
				if (err)
					return fn(err);
				user.update(fn);
			});
		});
	}
};

User.prototype.update = function(fn) {
	var user = this;
	var id = user.id;
	db.set('user:id:' + user.name, id, function(err) {
		if (err) 
			return fn(err);

		db.hmset('user:' + id, user, function(err) {
			fn(err);
		});
	});
};

User.prototype.hashPassword = function(fn) {
	var user = this;

	bcrypt.genSalt(12, function (err, salt) { //Generate a 12 digit password with salt
		if (err) 
			return fn(err);

		user.salt = salt;

		bcrypt.hash(user.pass, salt, function(err, hash){ //Generate Hash
			if (err)
				return fn(err);

			user.pass = hash;
			fn();
		});
	});
};


User.prototype.toJSON = function() {
	return {
		id: this.id,
		name: this.name
	}	
};


User.getByName = function (name, fn){
	console.log('getByName attr: %s', name);
	User.getId(name, function(err, id){
		
		console.log('id : %s' , id);

		if (err)
			return fn(err);


		User.get(id, fn);
	});
};

/*
	Get user id by name - return the user id by name
*/
User.getId = function (name, fn) {
	console.log('name: %s', name);
	db.get('user:id:' + name, fn);
};

/*
	return a user object from DB response
*/
User.get = function (id, fn){
	
	db.hgetall('user:' + id, function(err, user){
		if (err)
			return fn(err);
		fn(null, new User(user)); // convert database retun to user object
	});
};



User.authenticate = function (name, pass, fn) {
	console.log('User.authenticate name: %s', name);
	var x = name;
	User.getByName(x, function (err, user){
		

		if (err) // Error fetching user (for ex' database is down)
			return fn(err);

		if (!user.id)	{//User doesnt exist
			console.log('cant find the user, user is : %d', user)
			return fn();
		}

		bcrypt.hash(pass, user.salt, function (err, hash) {
			
			if (err)
				return fn (err);

			if (hash == user.pass){
				return fn(null, user); //User is authenticate (match found)
			}

			fn();
		});
	});
}
