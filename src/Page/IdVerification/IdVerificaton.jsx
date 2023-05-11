import React, { useState } from 'react';
import styles from "./iv.module.scss"
import Header from '../../components/Header/Header';
import { address } from '../../contract/contractAddress';
import { abi } from '../../contract/abi';
const { ethers } = require("ethers");

const IdVerificaton = () => {

    const [id, setId] = useState("")

    const provider = new ethers.providers.JsonRpcProvider("https://ethereum-sepolia-rpc.allthatnode.com");
    const viewContract = new ethers.Contract(address, abi, provider);
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.wrapper}>

                <div className={styles.imgContainer}>
                    <img src="/id-verify.png" alt= "" />
                </div>

                <div className={styles.verify}>
                    <h2>Type ID of the Document to verify</h2>

                    <div className={styles.verifyAction}>
                        <input type="text" onChange={ e => setId(e.target.value)}/>
                        <div className={styles.verifyBtn} onClick = {() => {
                            viewContract.idIssuer(id)
                                .then((tx) => {
                                 
                                    alert(`Tài liệu được cung cấp bởi ${tx}`)
                                })
                                .catch(err => {
                                    console.log(err);
                                    alert("Tài liệu chưa được xác minh")
                                })
                        }}>Verify</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IdVerificaton;
