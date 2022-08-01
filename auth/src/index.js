const express = require('express');
const { connectDb } = require("./helpers/db");
const { HOST, PORT, db, API_URL} = require("./configuration/index");
const axios = require ('axios');
const app = express();
const mongoose = require ('mongoose');

const { Schema } = mongoose;
const blogSchema = new Schema({
    name:  String,
});

const Post = mongoose.model('Blog', blogSchema);

const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Start server on PORT ${PORT}`);
        console.log(`HOST ${HOST}`);
        console.log(`Our DB ${db}`)
    });
}

app.get('/api/currentuser', (req,res) => {
    res.json({
        id:'1',
        email: 'test@gmail-test.com'
    });
});

app.get('/data', (req, res) => {
   axios.get(`${API_URL}/data`).then(response => {
       res.send(response.data);
   }).catch((e) => {
       res.send(e);
   })


});

app.get('/health', (req,res) => {
    res.send(`Service is Health`);
});

connectDb()
    .on('error', console.log)
    .on('disconnect', connectDb)
    .once("open", startServer);