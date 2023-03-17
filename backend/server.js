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
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
app.use('/tasks', tasksRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
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
// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (_, res) {
//     res.sendFile(
//         path.join(__dirname, "./client/build/index.html"),
//         function (err) {
//             res.status(500).send(err);
//         }
//     );
// });




app.listen(port, () => {
    console.log(`Server runing on port:${port}`);
});
