import app from './app'
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose'

const PORT = process.env.PORT || 9999
const serverURI = 'http:/localhost:' + PORT

app.listen(PORT, () => console.log('Server running at: ' + serverURI));
mongoose.connect(`${process.env.MONGO_URI}`)
.then(() => console.log('Connected to DB'))
.catch((err:Error) => console.log(err))







