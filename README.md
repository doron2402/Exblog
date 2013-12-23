## Node js application:



### What do we use here:
	* before starting follow this guide to install redis: http://redis.io/topics/quickstart
	* after installing redis run the redis server by typing "redis-server", you can check if the server is running by opening a new tab and type "redis-cli" and than type "keys *"
	* running node, just get into Exblog and type: "npm install && node app.js"
	1. we use node.js of course.
	2. express as server.
	3. handlebars for template engine.
	4. bcrypt for authentication.
	5. redis for database and redis-0.7.2 for communicate with the db.


### Routes and Views
1. API - Routes
	GET - /api/user/:id (get user info)
	POST - /api/entry (add entry)
	GET - /api/entries/:page? each page return minumum of post you can modify it.

2. Site routes
	- '/' 		: return all entry (default is 10 post per page)
	- /post 	: post html form let the user enter a post
	- /register 	: register user to the site 
	- /login	: login html form
	- .logout	: "delete" session user will be logout


### Good luck, there are still thing I'm working on such as: 
	- using different DB by using config file.
	- check if user is logged in before posting.
	- adding message module.
	- like button.
	- installing Grunt for testing and more automation.
	- add bower.io to this project
	

I think its a great project to start and build your thing. 
