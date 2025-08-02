const express = require('express');
const mongoose = require('mongoose');
const Entry = require('./models/entries.js');
const Favourite = require('./models/favourites.js');
require('dotenv').config();

const app = express();

// const dbURI = 'mongodb+srv://test-user:chinesedog555@cluster01.kyhywfy.mongodb.net/wallpaper-gallery?retryWrites=true&w=majority&appName=Cluster01';
mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(process.env.PORT || 3000))
.catch(err => console.log(err));


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req , res) => {
    Entry.find()
    .then(Entries => res.render('home', {Entries, title: 'Home'}));
})

app.delete('/:id', (req,res) => {
    const {id} = req.params;

    Entry.findById(id)
    .then(result => {
        if (result) Entry.findByIdAndDelete(id).then(() => {
            console.log("deleted item with id" + id);
            }
        );
    });

    Favourite.findById(id)
    .then(result => {
        if (result) Favourite.findByIdAndDelete(id).then(() => {
            console.log("deleted item with id" + id);
        });
    });

    res.send("ok");
})

app.get('/upload', (req, res) => {
    res.render('upload', {title: 'Upload An Image'});
})

app.post('/upload', (req,res) => {
    const {name , url} = req.body;
    const uploadItem = new Entry({name , url})

    uploadItem.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
})

app.get('/liked', (req,res) => {
    Favourite.find()
    .then(Entries => res.render('home', {Entries, title: "Favourites"}));
});

app.post('/liked', (req,res) => {
    const {name , url} = req.body;
    const uploadItem = new Favourite({name , url})

    uploadItem.save()
    .then(() => res.redirect('/liked'))
    .catch(err => console.log(err));
});

app.get('/search', (req, res) => {
    const name = req.query.name;
    if(!name) res.status(400).send('bad request. missing name');

    Entry.find({ $or: [{ name: name }, { name: new RegExp(name, "i") }] })
    .then(Entries => res.render('home', {Entries, title: 'Search Images'}));
})
