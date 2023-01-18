const express = require('express')
const sqlite = require("sqlite3");
var bp = require('body-parser');



const app = express()
app.use(bp.json())

// conexiune baza date sqlite
let db = new sqlite.Database('./db/dbjoc.db', sqlite.OPEN_READWRITE, (err) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Connected to the database.');
  });


app.post("/login", (req, res) => {
	console.log(req.body)

	if(!req.body.username || !req.body.password)
	{
		res.status(400).send("username and password required");
		return;
	}
	
	const username = req.body.username;
	const password = req.body.password;

	const query = `SELECT * FROM users WHERE username='${username}' AND parola='${password}'`;
	db.all(query,(err, rows) => {
		if(err){
			res.status(500).send("Internal error"+ err.message.toString());
			return;
		}else{
			if(rows.length > 0 ){
				res.send("Utilizator gasit!" + rows.toString());

				
			}else{
				res.status(404).send("utilizator nu exista")
				console.log(rows)
			}
		
		
		return;
		}
	})
});

app.post("/register", (req, res) => {

	if(!req.body.username || !req.body.password || !req.body.email)
	{
		res.status(400).send("username and password and email required");
		return;
	}
	const username = req.body.username;
	const password = req.body.password;
	const email = req.body.email

	const query = `INSERT INTO users (username,parola,email) VALUES ('${username}','${password}','${email}')`;
	db.all(query,(err, rows) => {
		if(err){
			res.status(500).send("Internal error"+ err.message.toString());
			return;
		}else{
			res.status(201).send("Utilizator creat!");
		
		return;
		}
	})
});



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



app.listen(3000)