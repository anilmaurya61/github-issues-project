require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4500;  
const connectDB = require('./config/dbConnect');


const app = express();
connectDB();
app.use(express.json());

app.use('/sync', require('./routes/syncRoutes'))
app.use('/issues', require('./routes/issuesRoutes'))
app.use('/user', require('./routes/userRoutes'))

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
});

module.exports = app;