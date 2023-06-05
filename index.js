import express from 'express'
import http from 'http'
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import route from './routers/route.js';
import dotenv from "dotenv"
import multer from 'multer'
import { PDFDocument } from 'pdf-lib';
import crypto from "crypto"
import CryptoJS from 'crypto-js';
import {Server} from 'socket.io'


dotenv.config();



const app = express();
const PORT = 3333

// const URI = 'mongodb://127.0.0.1:27017/certify'
const URI = process.env.URI        

console.log(process.env.CLIENT_ID );

app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({extended: true, limit : '30mb'}));

app.use(cors());

route(app)
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
app.post('/upload', upload.single('pdf'), async (req, res) => { 

    const pdfContent = await req.file.buffer;
    const pdfDoc = await PDFDocument.load(pdfContent);
    const pdfBytes = await pdfDoc.save();
    const bytes = new Uint8Array(pdfBytes)

    return res.status(200).json([...bytes])

});



mongoose.set('strictQuery', true);

mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => {console.log(`server is running on port ${PORT}`)}
    )})
    .catch((err) => {
        console.log('err',err);
    })

