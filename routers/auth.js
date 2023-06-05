import express, { response } from "express";
const router = express.Router();
import { AuthModel } from "../models/Auth.js";
import jwt from "jsonwebtoken";
import {google} from "googleapis"
import nodemailer from "nodemailer";
import bcrypt from "bcrypt"
import CryptoJS from "crypto-js";

import dotenv from "dotenv"
import { UserModel } from "../models/User.js";
import verify from "../middleware/verify.js";
import institutionVerify from "../middleware/institutionVerify.js";
dotenv.config();

var salt = bcrypt.genSaltSync(10); 

function hashPassword(plainPassword) {
    return bcrypt.hash(plainPassword, salt);
}


router.post("/register",async (req,res) => {
    try{

        hashPassword(req.body.password)
            .then(async hashedPassword => {

                const newAuthInfo = new AuthModel({
                    email: req.body.email,
                    password: hashedPassword
                })

                await newAuthInfo.save()

                
                const newUser = new UserModel({
                        email: newAuthInfo.email,
                        defaultBackground: Math.floor(Math.random() * 7)
                    })
               
                await newUser.save()
                return res.status(200).json({email: req.body.email, password: req.body.password})
            })
            .catch(function(error) {
                console.log(error);
                return res.status(500).json(error)
            });
        
    } catch (err) {
        console.log(err);
    }
    
})


router.post("/register-stu", institutionVerify, async (req,res) => {
    try{
        let hashedPw 
        hashPassword(req.body.password)
            .then(async function(hashedPassword) {
                hashedPw = hashedPassword

                const newAuthInfo = new AuthModel({
                    email: req.body.email,
                    password: hashedPw,
                    role: "student",
                })

                await newAuthInfo.save()

                const newUser = new UserModel({
                        email: newAuthInfo.email,
                        stuName: req.body.stuName,
                        stuId: req.body.stuId,
                        stuClass: req.body.stuClass,
                        createdBy: req.body.createdBy,
                        defaultBackground: Math.floor(Math.random() * 7)
                    })

                await newUser.save()
                return res.status(200).json({email: req.body.email, password: req.body.password})
            })
            .catch(function(error) {
                console.log(error);
                return res.status(500).json(error)
            });
        
    } catch (err) {
        console.log(err);
    }
    
})


router.post("/get-user", async(req, res) => {

    try{
        const user = await UserModel.findOne({email:req.body.email})
        return res.status(201).json(user)
    } catch (err){
        return res.status(500).json(err);
        console.log(err);
    }
}) 


router.post("/login", async (req,res) => {

    AuthModel.findOne({email: req.body.email}, function(err, userAuth) {
        if (err) {
            console.log(err);
        } else if (userAuth) {

        bcrypt.compare(req.body.password, userAuth.password, function(err, isMatch) {
            if (err) {
                console.log(err);
                res.status(404).json("not found")
            } else if (isMatch) {
                const accessToken = jwt.sign(
                    { id: userAuth._id, role : userAuth.role},
                    process.env.JWT_KEY,
                    { expiresIn: "1y" }
                );

                const encryptedToken = CryptoJS.AES.encrypt(
                    accessToken,
                    process.env.AES_KEY
                ).toString()

                return res.status(200).json({...userAuth._doc, encryptedToken})
            } else {
                console.log('Wrong password');
              return res.status(400).json("wrong password")
            }
        });

        } else {
            console.log('User not found');
          return res.status(404).json("not found")
        }
    });
      
})

export default router;