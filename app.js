const express = require('express');
const mongoose = require('mongoose');
const Entry = require('./models/entries');

const app = express();

const dbURI = 'mongodb+srv://test-user:chinesedog555@cluster01.kyhywfy.mongodb.net/wallpaper-gallery?retryWrites=true&w=majority&appName=Cluster01';
mongoose.connect(dbURI)
.then(() => app.listen(3000))
.catch(err => console.log(err));

//testing mongoose
// new Entry({
//     name: 'Purple Swirls',
//     url: 'https://i.pinimg.com/736x/2a/74/f3/2a74f3ba201413b79ead824681b7a5d6.jpg'
// }).save()
// .then(res => console.log(res))
// .catch(err => console.log(err));


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req , res) => {
    Entry.find()
    .then(Entries => res.render('home', {Entries}));
})