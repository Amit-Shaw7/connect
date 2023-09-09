import path from "path";
import { __dirname } from "../../../globals.js";


export const error404 = (req, res, next) => {
    if (req.accepts('html')) {
        res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts('json')) {
        res.status(404).json({ msg: '404 Not Found' })
    } else {
        res.status(404).type('txt').send('404 Not Found')
    }
}