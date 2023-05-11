import React, { useState } from 'react';

import styles from "./register.module.scss"
import { useDispatch } from 'react-redux';
import axios from "axios"
import { register } from '../../api/user';
import { loginRequest } from '../../redux/actions/user';

const Register = () => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        register({
            email,password
        })
        .then(res => {
            dispatch(
                loginRequest({
                    email: res.data.email,
                    password: res.data.password
                })
            )
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div>
                    <div>Email:</div>
                    <input type="text" onChange={ e => setEmail(e.target.value)}/>
                </div>

                <div>
                    <div>Password:</div>
                    <input type="text" onChange={ e => setPassword(e.target.value)}/>
                </div>
                <button onClick={() => handleSubmit()}>register</button>
            </div>
        </div>
    );
}

export default Register;
