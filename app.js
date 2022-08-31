const express = require('express');
const app = express();
const cors = require('cors');
const {handleError} = require('./utils/handleError');


// IMPORT ALL ROUTES
const authRoutes = require('./routers/auth');


// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// ROUTER MIDDLEWARES
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => res.send('<h1>Welcome to the Application!</h1>'));

// Error Handling
app.use(handleError);

// Export app.js
module.exports = app;