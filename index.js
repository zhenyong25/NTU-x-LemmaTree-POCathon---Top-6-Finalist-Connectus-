const express = require('express');
const path= require('path');
const morgan = require('morgan');       // middleware
const ejs= require('ejs'); 
const ejsMate= require('ejs-mate'); 
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/authRoutes')
const walletRoutes = require('./routes/walletRoutes')
const applyVCRoutes = require('./routes/applyVCRoutes')

const app = express();

app.set('view engine','ejs');
app.engine('ejs',ejsMate);
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'))   // set ./public/ as static folder where browser can access
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.render('partials/nav_home');
});

app.use('/auth', authRoutes)
app.use('/assets', walletRoutes)
app.use('/apply', applyVCRoutes)

app.use((req, res) => {
    res.status(404).render('404', {title: "404", loggedIn: false})
});
app.listen(4000,()=>{
    console.log('serving on port 4000');
}) 
