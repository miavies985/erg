const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname));

app.post('/api/links/add', isAuthenticated, function (req, res) {
	console.log(req.body)
	if (req.body.positionToAdd === undefined || req.body.positionToAdd === null) {
		console.error("Position not provided");
		res.status(500).send("Position not provided")
		return;
	}
	if (req.body.typeToAdd === undefined || req.body.typeToAdd === null) {
		console.error("Type not provided");
		res.status(500).send("Type not provided")
		return;
	}
	if (req.body.linkToAdd === undefined || req.body.linkToAdd === null) {
		console.error("Link not provided");
		res.status(500).send("Link not provided")
		return;
	}

	json_manage.readLinksFile();
	json_manage.addLink(req.body.typeToAdd, req.body.linkToAdd, req.body.positionToAdd - 1);
	json_manage.writeLinksFile();

	res.status(200).send();
})

app.post('/api/links/delete', isAuthenticated, function (req, res) {
	//console.log(req.body)
	if (req.body.positionToDelete === undefined || req.body.positionToDelete === null) {
		console.error("Position not provided");
		res.status(500).send("Position not provided")
		return;
	}

	json_manage.readLinksFile();
	json_manage.deleteLink(req.body.positionToDelete - 1);
	json_manage.writeLinksFile();

	res.status(200).send();
})

app.post('/api/exhibitions/add', isAuthenticated, function (req, res) {
	//console.log(req.body)
	if (req.body.positionToAdd === undefined || req.body.positionToAdd === null) {
		console.error("Position not provided");
		res.status(500).send("Position not provided")
		return;
	}
	if (req.body.countryToAdd === undefined || req.body.countryToAdd === null) {
		console.error("Country not provided");
		res.status(500).send("Country not provided")
		return;
	}
	if (req.body.dateToAdd === undefined || req.body.dateToAdd === null) {
		console.error("Date not provided");
		res.status(500).send("Date not provided")
		return;
	}
	if (req.body.timeToAdd === undefined || req.body.timeToAdd === null) {
		console.error("Time not provided");
		res.status(500).send("Time not provided")
		return;
	}

	json_manage.readExhibitionsFile();
	json_manage.addExhibition(req.body.countryToAdd, req.body.dateToAdd, req.body.timeToAdd, req.body.positionToAdd - 1);
	json_manage.writeExhibitionsFile();

	res.status(200).send();
})

app.post('/api/exhibitions/delete', isAuthenticated, function (req, res) {

	if (req.body.exhibitionpositionToDelete === undefined || req.body.exhibitionpositionToDelete === null) {
		console.error("Position not provided");
		res.status(500).send("Position not provided")
		return;
	}

	json_manage.readExhibitionsFile();

	json_manage.deleteExhibition(req.body.exhibitionpositionToDelete - 1);

	json_manage.writeExhibitionsFile();


	res.status(200).send();
})

app.listen(4000, function () {
	console.log("Server listening at port " + port)
})