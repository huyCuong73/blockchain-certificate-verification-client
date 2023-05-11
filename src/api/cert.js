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






export const createCert = (data) => axios.post(`${url}/create-cert`, data,{
    headers: {
        token:
        "Bearer " + getToken(),
    },
})

export const getGeneratedCerts = (id) => axios.post(`${url}/get-generated-certs`, id,{
    headers: {
        token:
        "Bearer " + getToken(),
    },
})

export const getStudentCerts = (data) => axios.post(`${url}/get-certs`, data,{
    headers: {
        token:
        "Bearer " + getToken(),
    },
})


export const createRequest = (data) => axios.post(`${url}/request/${data.docId}`, data,{
    headers: {
        token:
        "Bearer " + getToken(),
    },
})

export const createResponse = (data) => axios.post(`${url}/create-response`, data,{
    headers: {
        token:
        "Bearer " + getToken(),
    },
})

export const getRequest = (data) => axios.get(`${url}/get-requests/${data.id}`,{
    headers: {
        token:
        "Bearer " + getToken(),
    },
})

export const getUserRequest = (data) => axios.get(`${url}/get-user-requests/${data.id}`,{
    headers: {
        token:
        "Bearer " + getToken(),
    },
})

export const getUserResponses = (data) => axios.get(`${url}/get-user-responses/${data.id}`,{
    headers: {
        token:
        "Bearer " + getToken(),
    },
})