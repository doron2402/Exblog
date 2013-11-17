var Entry = require('../lib/entry');

exports.list = function(req, res, next) {
	var page = req.page;

	Entry.getRange(page.from, page.to, function(err, entries) {
		
		if (err)
			return next(err);

		res.render('entries', {
			title: 'Entries',
			entries: entries
		});
	});
};


exports.submit = function (req, res, next) {

	var data = req.body.entry;

	if (!data.title || data.title.length < 4){
		res.error("Title is required! and must be over 4 characters.");
		res.redirect('back');
		return;
	}

	var entry = new Entry({
		"username": res.locals.user.name,
		"title": data.title,
		"body": data.body
	});

	entry.save(function(err){
		if (err)
			return next(err)

		res.redirect('/');
	});
};
exports.form = function (req, res, next) {
	//Check for Authentication
	res.render('entries/post', { title: 'Post something' });
		
};