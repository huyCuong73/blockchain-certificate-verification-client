import jwt from "jsonwebtoken"

export default function verify (req,res,next) {
    const authHeader = req.headers.token;
    if(authHeader) {
        const token = authHeader.split(" ")[1]
        console.log(token);
        jwt.verify(token, "ads", (err, user) =>{
            if(err){
                console.log(err);
                return res.status(403).json("Not valid")
            }
            console.log("user", user);
            req.user = user;
            next()
        })
    } else{
        return res.status(401).json("Not authenticated")
    }
}