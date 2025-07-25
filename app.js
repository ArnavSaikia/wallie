const express = require('express');
const mongoose = require('mongoose');

const app = express();

const dbURI = 'mongodb+srv://test-user:chinesedog555@cluster01.kyhywfy.mongodb.net/wallpaper-gallery?retryWrites=true&w=majority&appName=Cluster01';
mongoose.connect(dbURI)
.then(() => app.listen(3000))
.catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req , res) => {
    // res.send("kid named finger");
    res.render('home');
})