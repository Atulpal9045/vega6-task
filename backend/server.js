const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());

console.log('process.env.MONGO_ATLAS_URL', process.env.MONGO_ATLAS_URL)

mongoose.connect(process.env.MONGO_ATLAS_URL)
.then(() => console.log('Database connected---'))
.catch(err => console.log('Eroor in db connection--', err));

app.use('/user', require('./routes/userRoutes'));

app.use('/blogs', require('./routes/blogRoutes'));

app.use('/comments', require('./routes/commentRoutes'));

app.listen(4000, () => console.log(`Server is running on 4000`));