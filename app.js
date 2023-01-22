const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const busRoute = require('./routes/Bus.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded());

// view engine
app.set('view engine', 'ejs');

// database connection
const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_CONNECTION_URI;

mongoose.set('strictQuery', true);
mongoose
	.connect(dbURI)
	.then((result) => app.listen(port, () => console.log(`Listening on port ${port}`)))
	.catch((err) => console.log(err));

app.use('/bus', busRoute);

app.use('/', (req, res) => {
	res.redirect('/bus/status');
});
// app.get('/user', (req, res) => {
// 	res.render('user');
// });
// app.get('/ticket', (req, res) => {
// 	res.render('ticket');
// });
