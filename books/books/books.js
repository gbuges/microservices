// Load express
    const express = require("express");
    const app = express();
    const bodyParser = require("body-parser");

    app.use(bodyParser.json());

// Load mongoose
    const mongoose = require("mongoose");

    require("./Book")
    const Book = mongoose.model("Book")

    //Connect
    mongoose.connect("mongodb://eduonix:123456789abc@ds159100.mlab.com:59100/booksservice", () => {
        console.log("Database is connected!");
    });

app.get('/', (req, res) => {
    res.send("This is the books service");
})

// Load MySQL

    var mysql = require('mysql');

    var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "livros"
    });

    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
    });

// Create func
    app.post("/book", (req, res) => {
        var newBook = {
            title: req.body.title,
            author: req.body.author,
            numberPages: req.body.numberPages,
            publisher: req.body.publisher
        }

        // Create a new Book
        var book = new Book(newBook)

        book.save().then(() => {
            console.log("New book created! Book name: " + req.body.title)
        }).catch((err) => {
            if(err){
                throw err;
            }
        })
        res.send("A new book created with success!")

        //Create on MySQL
        var sql = "INSERT INTO `livro`(`title`, `author`, `numberPages`, `publisher`) VALUES ('" + req.body.title + "','" + req.body.author + "'," + req.body.numberPages + ",'" + req.body.publisher + "')";
        con.query(sql, function (err, result) {
         if (err) throw err;
         console.log("1 record inserted");
        });
    })

    app.get("/books", (req, res) => {
        Book.find().then((books) => {
            res.json(books)
        }).catch(err => {
            if(err){
                throw err;
            }
        })
    })

    app.get("/book/:id", (req, res) => {
        Book.findById(req.params.id).then((book) => {

            if(book){
                // Book data
                res.json(book)
            }else{
                res.sendStatus(404);
            }

        }).catch(err => {
            if(err){
                throw err;
            }
        })
    })

    app.delete("/book/:id", (req, res) => {

        Book.findOneAndRemove(req.params.id).then(() => {
            res.send("Book removed with success!")
        }).catch(err => {
            if(err){
                throw err;
            }
        })

    })

app.listen(4545, () => {
    console.log("Up and running! -- This is our Books service");
})