const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()


const app = express()
const PORT = process.env.PORT

// middlewares
app.use(express.json()); // Built-in replacement for bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Built-in replacement for bodyParser.urlencoded()
// app.use(express.static(path.join(__dirname, "build")));

// === Third-party Middlewares ===
app.use(cors({
    origin: 'https://saddamAnwar185.github.io',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));

app.use(bodyParser.json()); // optional if you're not using express.json()
app.use(bodyParser.urlencoded({ extended: true })); // optional if you're not using express.urlencoded()
app.use(cookieParser());

// views
const singup = require('./Views/SingUp')
const login = require('./Views/Login');
const addProject = require('./Views/AddProject')
const deleteProjects = require('./Views/DeleteProject')
const showProjects = require('./Views/ShowProjects')
const logout = require('./Views/logout')
const verifyLogin = require('./Views/VerifyLogin')

app.get('/', (req, res) => {
    res.send('hello from backend')
})

app.use('/api', singup)
app.use('/api', login)

// protected routes
app.use('/api', logout)
app.use('/api', addProject)
app.use('/api', deleteProjects)
app.use('/api', showProjects)
app.use('/api', verifyLogin)

app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:8000`)
})