var redis = require('redis')
	, db = redis.createClient();


module.exports = Entry; // exporting Entry function from the module

function Entry (obj) {
	for (var key in obj) {
		this[key] = obj[key];
	}
}

/*
	Save entry to redis
*/
Entry.prototype.save = function(fn) {
	var entryJson = JSON.stringify(this);

	db.lpush( //save JSON to redis list LPUSH
		'entries',
		entryJson,
		function(err) {
			if (err)
				return fn (err)
			fn();
		}
	); 
};


/*
	Get entry from redis
*/
Entry.getRange = function(from, to, fn) {
	db.lrange('entries', from, to, function (err, items) { //lrange function retirive entry from redis
		if (err)
			return fn(err);

		var entries = [];

		items.forEach(function(item){
			entries.push(JSON.parse(item));
		});

		fn(null, entries);
	});
};

Entry.count = function(fn) {
	db.llen('entries', fn);
}
