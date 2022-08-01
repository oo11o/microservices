const express = require('express');
const { connectDb } = require("./helpers/db");
const { HOST, PORT, db, AUTH_API_URL} = require("./configuration/index");
const mongoose = require ('mongoose');
const axios= require ('axios');
const {response} = require("express");

const app = express();
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

        const books = new Post({ name: 'Docker Swarm'});
        books.save((err, post) => {
           if (err) return console.error(err);
           console.log('Book is =>', post);
        })
    })
}

app.get('/health', (req,res) => {
    res.send(`Service is health`);
});

app.get('/api/data', (req, res) => {
    res.json({
        testWithApi: true
    });
});

app.get('/currentuser', (req,res) => {
    axios.get(`${AUTH_API_URL}/currentuser`).then(response => {
        res.json({
            isAuth: true,
            currentUserFroAuth: response.data
        });
    });
});

connectDb()
    .on('error', console.log)
    .on('disconnect', connectDb)
    .once("open", startServer)