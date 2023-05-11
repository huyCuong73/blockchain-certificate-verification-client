import verify from "../middleware/verify.js";
import express from "express";
import { UserModel } from "../models/User.js";
import institutionVerify from "../middleware/institutionVerify.js";
import cryptico from "cryptico"

const router = express.Router();

router.post("/get-stu", institutionVerify ,async (req, res) => {
    try{
        const students = await UserModel.find({
            createdBy: req.body.id
        })

        res.status(200).json(students)
    } catch(err){
        console.log(err);
        res.status(500).json(err)
    }
    
})

router.post("/get-key",(req,res) =>{
    try{
        const id = req.body.id
        const privateKey = cryptico.generateRSAKey(id, 1024);
        const publicKeyString = cryptico.publicKeyString(privateKey);
        return res.status(200).json(publicKeyString)
    }catch(err){
        console.log(err);
        return res.status(500).json("something wrong")
    }
})

export default router;



