import express, { Request, Response, NextFunction } from "express";
import userController from './controllers/userController'
import bookableController from './controllers/bookableController'
import reservationController from './controllers/reservationController'
import session from "express-session"
import cors from "cors"
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { requiresAuth } from './middleware/auth';
import MongoStore = require("connect-mongo");

import  * as dotenv from 'dotenv';
dotenv.config();

const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized:false,
    cookie: {
        maxAge: 60 * 60 * 1000,
        sameSite:'none',
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}))

app.use('/api/users', userController)
app.use('/api/bookable', bookableController)
app.use('/api/reservation', reservationController)


app.use((req, res, next ) =>{
    next(Error('Endpoint not found'))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) =>{
    console.log(error);
    let errorMessage = 'An unknown arror occurred';
    if (error instanceof Error) errorMessage = error.message
    res.status(500).json({error: errorMessage})
})

export default app; 
