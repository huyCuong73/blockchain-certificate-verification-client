import React, { useState } from 'react';
import axios from "axios"
import CryptoJS from 'crypto-js';

import styles from "./login.module.scss"
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../redux/actions/user';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div >
                    <div>email:</div>
                    <input type="text" onChange={ e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <div>Password:</div>
                    <input type="text" onChange = {e => setPassword(e.target.value)}/>
                </div>

                <button onClick = {(e) => {
                    e.preventDefault()

                    dispatch(loginRequest({
                        email,password
                    }))
                }}>Đăng nhập</button>
            </div>

            {
                localStorage.getItem("user")
                &&
                <div>
                    <button onClick = {(e) => {
                        e.preventDefault()
                        const encryptedToken = JSON.parse(localStorage.getItem("user")).encryptedToken
                        const token = CryptoJS.AES.decrypt(
                            encryptedToken,
                            "ads"
                        ).toString(CryptoJS.enc.Utf8)
                        axios.post("http://localhost:3333/generate",{
                            data:"data"
                        },{
                            headers: {
                                token:  `Bearer ${token}`
                            }
                        })
                        .then(res => {
                            console.log(res.data);
                        })
                        .catch(err => {
                            console.log(err);
                        }) 
                    }}>
                        generate
                    </button>
                </div>
            }
        </div>
    );
}

export default Login;
