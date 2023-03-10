const express = require('express');
const cors = require('cors');


require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());////////// middel ware ///////
app.use(express.json());// middel ware ///////
app.use(express.urlencoded());

////////////////////////////ROUTE ADDRESS //////////////////////////////////
const tasksRouter = require('./routes/tasks');
app.use('/tasks', tasksRouter);

//////////////////////////////////////////////////////////////////

////////////////////////////////////////////// connection with MongoDB ////////////////
const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MangoDB Database connection etablished successfully');
});
/////////////////////////////////////////////////////////////////////////////////////





app.listen(port, () => {
    console.log(`Server runing on port:${port}`);
});
