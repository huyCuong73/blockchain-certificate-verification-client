import { CertificationModel } from "../models/Certification.js";
import verify from "../middleware/verify.js";
import express from "express";
import institutionVerify from "../middleware/institutionVerify.js";
import { UserModel } from "../models/User.js";
import { RequestModel } from "../models/Request.js";
import { ResponseModel } from "../models/Response.js";
import CryptoJS from "crypto-js";
import cryptico from "cryptico"

const router = express.Router();

router.post("/create-cert", institutionVerify ,async (req, res) => {
    try{

        const stu = await UserModel.findOne({
            createdBy:req.body.from,
            stuId: req.body.stuId
        })  
                       
        const certification = new CertificationModel({
            from: stu._doc.createdBy,
            to: stu._doc._id,
            data: req.body.data,
            docId: req.body.docId
        })
    
        const newCert = await certification.save()
        res.status(200).json(newCert)

    } catch(err){
        console.log(err);
        res.status(500).json(err)
    }
    
})

router.post("/get-certs", verify ,async (req, res) => {
    try{
        
        const certs = await CertificationModel.find({
            to: req.body.id
        })
    
        res.status(200).json(certs)

    } catch(err){
        console.log(err);
        res.status(404).json("not found")
    }
    
})

router.post(("/get-generated-certs"),institutionVerify,  async (req,res) => {
    try{
        const certs = await CertificationModel.find({
            createdBy: req.body.id
        })

        return res.status(200).json(certs)

    } catch(err) {
        console.log(err);
        return res.status(404).json("not found")
    }

})

router.post("/request/:docId", async (req, res) => {
    try{
        const cert = await CertificationModel.findById(req.params.docId)
        console.log(req.params.docId);
        const newReq = new RequestModel({
            from: req.body.id,
            to: cert.to,
            requestedDoc: req.params.id,
            publicKey: req.body.publicKey
        })
        
        const r = await newReq.save()
        res.status(200).json(r)

    } catch(err){
        console.log(err);
        res.status(404).json("not found")
    }
    
})

router.post("/create-response", async (req, res) => {
    try{
        console.log(JSON.stringify(req.body.data));
        const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(req.body.data),
            req.body.key
        ).toString()
        const encryptedAesKey = cryptico.encrypt(req.body.key, req.body.publicKey).cipher;
        // console.log(encrypted);
        const newRes = new ResponseModel({
            reqId: req.body.reqId,
            to: req.body.to,
            encryptedData: encryptedData,
            encryptedAesKey: encryptedAesKey
        })
        
        const r = await newRes.save()       
        res.status(200).json(1)

    } catch(err){
        console.log(err);
        res.status(404).json("not found")
    }
    
})

router.get("/get-requests/:id", async (req, res) => {
    try{
        const requests = await RequestModel.find({
            to: req.params.id
        })
        
        res.status(200).json(requests)

    } catch(err){
        console.log(err);
        res.status(404).json("not found")
    }
    
})

router.get("/get-user-requests/:id", async (req, res) => {
    try{
        const requests = await RequestModel.find({
            from: req.params.id
        })
        
        res.status(200).json(requests)

    } catch(err){
        console.log(err);
        res.status(404).json("not found")
    }
    
})

router.get("/get-user-responses/:id", async (req, res) => {
    try{
        const requests = await ResponseModel.find({
            from: req.params.id
        })
        
        const responses = []

        for(let i = 0 ; i < requests.length ; i ++){
            var decryptedKey = cryptico.decrypt(requests[i].encryptedAesKey, cryptico.generateRSAKey(req.params.id, 1024));
            requests[i] = {...requests[i]._doc, decryptedKey:decryptedKey.plaintext}
        }
        console.log(requests);
        res.status(200).json(requests)

    } catch(err){
        console.log(err);
        res.status(404).json("not found")
    }
    
})
export default router;