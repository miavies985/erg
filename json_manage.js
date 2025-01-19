const fs = require("fs");

const linksFile = "links.json";
let linksJson;

const exhibitionsFile = "exhibition.json";
let exhibitionsJson;

function readExhibitionsFile() {
  exhibitionsJson = JSON.parse(fs.readFileSync(exhibitionsFile));
}

function writeExhibitionsFile() {
  fs.writeFileSync(exhibitionsFile, JSON.stringify(exhibitionsJson, null, 2));
}

function readLinksFile() {
  linksJson = JSON.parse(fs.readFileSync(linksFile));
}

function writeLinksFile() {
  fs.writeFileSync(linksFile, JSON.stringify(linksJson, null, 2));
}

function addLink(typeToAdd, linkToAdd, position) {
  if (linksJson === undefined || linksJson === null) {
    console.error("Tried to modify links file without reading it first!");
    return;
  }

  linksJson.splice(position, 0, {"type": typeToAdd, "link": linkToAdd});
}

function addExhibition(countryToAdd, dateToAdd, timeToAdd, position) {
  if (exhibitionsJson === undefined || exhibitionsJson === null) {
    console.error("Tried to modify exhibition file without reading it first!");
    return;
  }

  exhibitionsJson.splice(position, 0, {"id": position, "country": countryToAdd, "date": dateToAdd, "time": timeToAdd});
}

function deleteLink(position) {
  if (linksJson === undefined || linksJson === null) {
    console.error("Tried to modify links file without reading it first!");
    return;
  }

  linksJson.splice(position, 1);
}

function deleteExhibition(position) {
  if (exhibitionsJson === undefined || exhibitionsJson === null) {
    console.log("Tried to modify exhibition file without reading it first!");
    return;
  }
  exhibitionsJson.splice(position, 1);
}

module.exports = { 
  readExhibitionsFile, writeExhibitionsFile,
  readLinksFile, writeLinksFile,
  addLink, addExhibition,
  deleteLink, deleteExhibition
}