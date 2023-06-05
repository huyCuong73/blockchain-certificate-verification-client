import { CertificationModel } from "../models/Certification.js";
import verify from "../middleware/verify.js";
import express from "express";
import institutionVerify from "../middleware/institutionVerify.js";
import { UserModel } from "../models/User.js";
import { RequestModel } from "../models/Request.js";
import { ResponseModel } from "../models/Response.js";
import CryptoJS from "crypto-js";
import cryptico from "cryptico"
// import * as IPFS from 'ipfs-core'

// const ipfs = await IPFS.create()

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
        return res.status(200).json(newCert)

    } catch(err){
        console.log(err);
        return res.status(500).json(err)
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
        return res.status(404).json("not found")
    }
    
})

router.post(("/get-generated-certs"), institutionVerify,  async (req,res) => {
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
   
        const newReq = new RequestModel({
            from: req.body.id,
            to: cert.to,
            requestedDoc: req.params.id,
            publicKey: req.body.publicKey
        })
        
        const r = await newReq.save()
        return res.status(200).json(r)

    } catch(err){
        console.log(err);
        return res.status(404).json("not found")
    }
    
})

router.post("/create-response", async (req, res) => {
    try{
        
        const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(req.body.data),
            req.body.key
        ).toString()
        const encryptedAesKey = cryptico.encrypt(req.body.key, req.body.publicKey).cipher;

        const newRes = new ResponseModel({
            reqId: req.body.reqId,
            from: req.body.from,
            to: req.body.to,
            encryptedData: encryptedData,
            encryptedAesKey: encryptedAesKey
        })
        console.log(newRes);
        const r = await newRes.save()       
        return res.status(200).json(1)

    } catch(err){
        console.log(err);
        return res.status(404).json("not found")
    }
    
})

router.get("/get-requests/:id", async (req, res) => {
    try{
        const requests = await RequestModel.find({
            to: req.params.id
        })
        
        return res.status(200).json(requests)

    } catch(err){
        console.log(err);
        return res.status(404).json("not found")
    }
    
})

router.get("/get-user-requests/:id", async (req, res) => {
    try{
        const requests = await RequestModel.find({
            from: req.params.id
        })
        
        return res.status(200).json(requests)

    } catch(err){
        console.log(err);
        return res.status(404).json("not found")
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

        return res.status(200).json(requests)

    } catch(err){
        console.log(err);
        return res.status(404).json("not found")
    }
    
})

router.get("/get-accepted-response/:id", async (req, res) => {
    try{
        const responses = await ResponseModel.find({
            from: req.params.id
        })
        
        return res.status(200).json(responses)

    } catch(err){
        console.log(err);
        return res.status(404).json("not found")
    }
    
})

router.delete("/delete-response/:id", async (req, res) => {
    try{
        console.log(req);
        const request = await RequestModel.findById(req.params.id)

        await RequestModel.deleteOne(request._doc)

        await ResponseModel.deleteOne({
            reqId: request._doc._id,
        })

        return res.status(200).json("deleted")
    } catch(err){
        console.log(err);
        return res.status(404).json("not found")
    }
    
})

router.post("/get-cid" , async (req,res) => {
    try{
        // const uint8Array = req.body.uint8Array
        // const uint8 = new Uint8Array(uint8Array);
        // const file = await ipfs.add(uint8)  
        // const cid = file.cid 
        // const encoded = base32.encode(cid.bytes);
        // console.log(encoded);
        // res.json("a")

    } catch(err){
        console.log(err);
        return res.status(404).json("not found")
    }
    
})


export default router;