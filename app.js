const express = require('express');
const mongoose = require('mongoose');
const Entry = require('./models/entries');
const Favourite = require('./models/favourites.js');

const app = express();

const dbURI = 'mongodb+srv://test-user:chinesedog555@cluster01.kyhywfy.mongodb.net/wallpaper-gallery?retryWrites=true&w=majority&appName=Cluster01';
mongoose.connect(dbURI)
.then(() => app.listen(3000))
.catch(err => console.log(err));


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req , res) => {
    Entry.find()
    .then(Entries => res.render('home', {Entries}));
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
})

app.get('/upload', (req, res) => {
    res.render('upload');
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
    .then(Entries => res.render('home', {Entries}));
});

app.post('/liked', (req,res) => {
    const {name , url} = req.body;
    const uploadItem = new Favourite({name , url})

    uploadItem.save()
    .then(() => res.redirect('/liked'))
    .catch(err => console.log(err));
});
