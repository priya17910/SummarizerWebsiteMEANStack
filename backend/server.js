const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const summarizeRoute = require('../backend/route/summarizeRoute');
const authRoute = require('../backend/route/authRoute');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/summarize', {
    family: 4
})
.then(() => console.log("Mongo DB connected"))
.catch(error => console.log(error));

app.use('/api/auth', authRoute);
app.use('/api/summarize', summarizeRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));