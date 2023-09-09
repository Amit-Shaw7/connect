import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { __dirname } from './globals.js';
import { connectToMongo } from './mongo.js';
import AuthRouter from './app/routes/auth.js';
import { logger } from './app/middleware/logger/logger.js';
import { corsOptions } from './config/corsOptions.js';
import { createError } from './app/middleware/error/createError.js';
import { error404 } from './app/middleware/error/error404.js';
import UserRouter from './app/routes/user.js';
import PostRouter from './app/routes/post.js';
import CommentRouter from './app/routes/comment.js';


const app = express();
await connectToMongo();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(logger);
app.use(cookieParser());
app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "welcome.html"));
});


app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);
app.use('/api/post', PostRouter);
app.use('/api/comment', CommentRouter);


/*
 * Handle 404 error
 */
app.all('*', (req, res, next) => {
    error404(req, res);
});

app.use(createError);


app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("*    Server Started at " + process.env.PORT);
    console.log("****************************")
});

export default app;
