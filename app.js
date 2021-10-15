//All your code goes in this file
const express = require("express");
const Datastore = require("nedb")


const app = express();
app.use(express.json());
const db = new Datastore("./database.db")
db.loadDatabase()

app.get('/api', (req, resp) => {
    let data = db.find({}, (err, doc) => {
        if(err) {
            console.log("ERROR")
        } else {
            console.log(doc)
            resp.json(doc);
        }
    })
})



app.get('/api/search', (req, resp) => {
    db.find(req.query, (err, doc) => {
        if(err || doc.length == 0) {
            resp.status(400).json({ error: 'haha didnt work'});
            resp.json(err)
        } else {
            console.log(doc)
            resp.json(doc);
        }
    })
})

app.post('/api', function (req, resp) {  
    let keys = Object.keys(req.body)
    if(keys.includes("name")) {
    db.insert(req.body, (err, newDoc) => {
        if(err || newDoc.length == 0) {
            console.log("error")
            resp.status(400).json({ error: 'haha didnt work'});
            resp.json(err)
        } else {
            console.log(newDoc)
            resp.status(201).json(newDoc);
        }
    })}
    //res.json(response);
})
//Do not remove this line. This allows the test suite to start
//multiple instances of your server on different ports
module.exports = app;
