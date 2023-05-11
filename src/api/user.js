import axios from "axios"
import CryptoJS from "crypto-js";
const url = "http://localhost:3333"


const getToken = () => {

    if(JSON.parse(localStorage.getItem("user"))){
    
        let encryptedToken = JSON.parse(localStorage.getItem("user")).accessToken
        let token = CryptoJS.AES.decrypt(
            encryptedToken,
            "ads"
        ).toString(CryptoJS.enc.Utf8)
    
        return (token);
    }
}



export const register = (data) => axios.post(`${url}/register`, data)

export const createStu = (data) => axios.post(`${url}/register-stu`, data, {
    headers: {
        token:
        "Bearer " + getToken(),
    },
})

export const getUser = (userCre) => axios.post(`${url}/get-user`, userCre)

export const login = (userCre) => axios.post(`${url}/login`, userCre)

export const getStudents = (id) => axios.post(`${url}/get-stu`, id, {
    headers: {
        token:
        "Bearer " + getToken(),
    },
})

export const getKey = (id) => axios.post(`${url}/get-key`, id, {
    headers: {
        token:
        "Bearer " + getToken(),
    },
})
