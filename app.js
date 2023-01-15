const express = require('express')
const mysql = require('mysql')

const app = express()

app.use(express.urlencoded({extended:false}))

//legaturi
app.get('/', (req,res) => {
    res.render("login.ejs")
})


app.get('/login', (req,res) => {
    res.render("login.ejs")
})

app.get('/game', (req,res)=>{
    res.render('index.ejs')
})


app.get('/register', (req,res)=>{
    res.render('register.ejs')
})

app.get('/account', (req,res)=>{
    res.render('account.ejs')
})

const connection = mysql.createConnection({

    host:'localhost',
    user : 'root',
    password:'',
    database:'bazaptlogin'


});

app.post('/login', function(request, response) {
	let username = request.body.username;
	let password = request.body.password;
	if (username && password) {

		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
/*
app.get('/game', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});
*/
//nu a reusit sa mearga




app.listen(3000)