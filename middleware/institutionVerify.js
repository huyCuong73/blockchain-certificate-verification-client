import jwt from "jsonwebtoken"

export default function institutionVerify(req,res,next) {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, "ads", (err, user) =>{
            if(err){
                console.log(err);
                return res.status(403).json("Not valid")
            }
            if(user.role !== "institution"){
                return res.status(400).json("you don't have permission")
            }
            req.user = user;
            next()
        })
    } else{
        return res.status(401).json("Not authenticated")
    }
}