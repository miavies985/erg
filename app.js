const express = require('express');
const app = express();
const fs = require("fs");
const port = process.env.port || 4000;
const users = { 'user1': 'password1'};

const json_manage = require("./json_manage.js")

const isAuthenticated = (req, res, next) => {
	const encodedAuth = (req.headers.authorization || '')
		.split(' ')[1] || '';
	const [name, password] = Buffer.from(encodedAuth, 'base64')
		.toString().split(':')
	// Check users credentials and return next if ok
	if (name && password === users[name]) return next(); 
	// User is not authenticated give a reponse 401
	res.set('WWW-Authenticate', 'Basic realm="Access to Index"')
	res.status(401).send("Unauthorised access")
	
}
app.use(express.static(__dirname));

app.get('/api/data', isAuthenticated, function (req, res) {
	fs.readFile("data.json", (error, data) => {
        if (error) {
          console.error(error);
          throw error;
        }
        const user = JSON.parse(data);
        res.status(200).send(user);
    });
});

app.post('/api/links/add', isAuthenticated, function (req, res) {
	if (req.body.position === undefined || req.body.position === null) {
		console.error("Position not provided");
		res.status(503).send(user)
		return;
	}
	if (req.body.type === undefined || req.body.type === null) {
		console.error("Type not provided");
		res.status(503).send(user)
		return;
	}
	if (req.body.link === undefined || req.body.link === null) {
		console.error("Link not provided");
		res.status(503).send(user)
		return;
	}

	json_manage.readLinksFile();
	json_manage.addLink(req.body.type, req.body.link, req.body.position);
	json_manage.writeLinksFile();
})

app.listen(4000, function () {
	console.log("Server listening at port " + port)
})