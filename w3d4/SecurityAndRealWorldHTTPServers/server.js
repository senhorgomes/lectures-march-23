const express = require('express');
const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

const app = express();

app.set("view engine", "ejs");

const PORT = 3000;



// Middleware
// app.use(cookieParser());
app.use(cookieSession({
    name: "session",
    keys: ["supersecretkey", "random"],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

// Mock database
const userDatabase = {
    abc: {
        id: "abc",
        email: "bryangomes@email.com",
        password: "supersecret"
    },
    def:{
        id: "def",
        email: "randomuser@email.com",
        password: "password12345"
    }
}
// RESTFUL APIS

// Fetch information/View information => GET request
// Modify/Create new information/Fetch => POST request
// Delete => DELETE Request
// Update => PUT Request

app.get("/", (req, res) => {
    // const cookieID = req.cookies.user_id
    const cookieID = req.session.user_id
    req.session.starwars = "luke";
    console.log(req.session)
    let templateVars = {}
    // if the user is logged in, set the templateVars to the user object
    if(userDatabase[cookieID]){
        templateVars.user = userDatabase[cookieID];
    // Else, set the user object to null to trigger else statement in index.ejs
    } else {
        return res.status(401).send('You must be logged in to see this page');
    }

    res.render("index", templateVars);
});
// Login route
app.get("/login", (req, res) => {
    res.render("login");
})

// Login post route
app.post("/login", (req, res) => {
    // Grab the email and password
    const inputtedEmail = req.body.email;
    const inputtedPassword = req.body.password;
    for(let id in userDatabase){
        if(userDatabase[id].email === inputtedEmail){
            // Comparing a hashed password with plaintext

            // if(userDatabase[id].password === inputtedPassword){
            if(bcrypt.compareSync(inputtedPassword, userDatabase[id].password)){
                // After a user logs in, set their id as a cookie
                // res.cookie("user_id", userDatabase[id].id);
                req.session.user_id = userDatabase[id].id;
                res.redirect("/");
                return;
            }
        }
    }
    res.status(404).send("You have entered an incorrect email and/or password");
})

app.get('/register', (req, res)=> {
    res.render('register')
})

app.post('/register', (req, res)=> {
    const inputtedEmail = req.body.email;
    const inputtedPassword = req.body.password;

    if(!inputtedEmail || !inputtedPassword){
        res.status(400).send('You forgot your email and/or password.')
    }
    // Check if user is already registered
    for(let id in userDatabase){
        if(userDatabase[id].email === inputtedEmail){
            return res.status(400).send('You are already registered.')
        }
    }
    // Random ID
    const randomId = Math.random().toString(36).substring(2,5);
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(inputtedPassword, salt);


    // Creating the new user
    const newUser = {
        id: randomId,
        email: inputtedEmail,
        password: hashedPassword
    }
    // Adding the user to our database
    userDatabase[randomId] = newUser;
    // Set the cookie
    console.log(userDatabase)
    // res.cookie("user_id", randomId);
    req.session.user_id = randomId;
    res.redirect("/");
    return;

})

app.post("/logout", (req, res) => {
    // res.clearCookie("user_id");
    req.session = null;
    res.redirect("/");
})

app.listen(PORT, ()=>{
    console.log("Your server is running! YAY!")
});