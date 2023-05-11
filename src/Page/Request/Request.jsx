import React, { useEffect, useRef, useState } from 'react';

import styles from "./request.module.scss"
import Header from '../../components/Header/Header';
import { Contract } from "@ethersproject/contracts";
import { abi } from '../../contract/abi';
import { useWeb3React } from '@web3-react/core';
import { address } from '../../contract/contractAddress';
import { useSelector } from 'react-redux';
import { createKey, getKey } from '../../api/user';
import CryptoJS from 'crypto-js';
import { createRequest, getRequest, getUserRequest, getUserResponses } from '../../api/cert';
import DisplayData from '../../components/DispalyData/DisplayData';

const { ethers } = require("ethers");

const Request = () => {
    const user = useSelector(state => state.user.user)
    const [userRequests, setUserRequests] = useState(null)
    const [userResponse, setUserResponse] = useState(null)
    const [responseId, setResponseId] = useState([])
    const [key, setKey] = useState(null)
    const [hasRole, setHasRole] = useState(false)
    const [docUrl, setDocUrl] = useState(false)
    const [reload, setReload] = useState(1)
    const [openDisplay, setOpenDisplay] = useState(false)
    const [displayData, setDisplayData] = useState(null)
    const docRef = useRef()
    const { library, account} = useWeb3React();
    const contract = new Contract(address, abi, account ? library.getSigner(account) : library)

    // const provider = new ethers.providers.JsonRpcProvider("https://ethereum-sepolia-rpc.allthatnode.com");
    // const viewContract = new ethers.Contract(address, abi, provider);
    useEffect(() => {
        function handleClickOutside(event) {
            if (docRef.current && !docRef.current.contains(event.target) ) {
					setDisplayData(false);
				}
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [docRef]);


    useEffect(() => {
        setHasRole(false)
        if(account){
            contract.userRoles(account)
            .then((res)=> {
                const role = res.toString()
                if(role == "4" || role == "6"){
                    setHasRole(true)
                }
            })
            .catch((err) => {
                alert("Lỗi hệ thống, xin hãy thử lại sau");
            })
        }
    },[account])

    useEffect(() => {
        if(user){
            getUserRequest({
                id: user._id
            })
                .then(res => {
                    setUserRequests(res.data)
                })
        }
    }, [user, reload])

    useEffect(() => {
        if(user){
            getUserResponses({id: user._id})
                .then((res) => {
                    setUserResponse(res.data)
                    const r = {}
                    for (let i = 0; i < res.data.length ; i++){
                        r[res.data[i].reqId] = res.data[i]._id
                    }
                    setResponseId(r)
                })
        }
    },[user])


    const findData = (resId) => {
        for (let i = 0 ; i < userResponse.length; i++){
            if(userResponse[i]._id == resId){
                console.log(resId);
                return CryptoJS.AES.decrypt(userResponse[i].encryptedData, userResponse[i].decryptedKey).toString(CryptoJS.enc.Utf8)
            }
        }
    }
    function convertToBytes(obj) {

        const encoder = new TextEncoder();
        var byteArr = encoder.encode(obj);
        return byteArr
    }

    console.log(userResponse) 

    if(!account){
        return (
            <div className={styles.container}>
                <Header />
                
                Hãy kết nối đến tài khoản Metamask để sử dụng tính năng này
            </div>
        )
    }

    if(!hasRole){
        return (
            <div className={styles.container}>
                <Header />
                
                <div className={styles.warning}>
                    <div>
                        Bạn chưa có quyền sử dụng tính năng này
                    </div>

                    <div className={styles.createKeyBtn} onClick = {() => {
                        contract.userRoles(account)
                            .then((res)=> {
                                console.log(res.toString());
                            })
                            .catch((err) => {
                                alert("có lỗi");
                            })
                    }}>
                        Yêu cầu
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className={styles.container}>
            <Header />
            
            <div className = {styles.input}>
                <label htmlFor="">Nhập link mời:</label>
                <input type="text" onChange = {(e) => {
                    setDocUrl(e.target.value) 
                }}/>
                <button onClick={() => {
                    getKey({
                        id: user._id
                    })
                        .then(res => {
                            
                            createRequest({
                                id: user._id,
                                docId: docUrl.split("/").pop(),
                                publicKey: res.data
                            })
                                .then(() => {
                                    setReload(prev => prev + 1)
                                })
                        })

                        .catch(err => {
                            alert("Không lấy được key")
                        })
                }}>
                    Gửi
                </button>
            </div>
            <div className={styles.userRequests}>
                {
                    userRequests
                    &&
                    userRequests.map((req) => 
                        <div className={styles.request}>
                            <div className={styles.label}>
                                {`Yêu cầu xem tài liệu tới ${req.to}`}
                            </div>
                            <div className={styles.btn}>

                                {
                                    responseId.hasOwnProperty(req._id)
                                    ?
                                    <>
                                        <button onClick = {() => {
                                            const data = findData(responseId[req._id])
                                            const bytes = convertToBytes(data)
                                            contract.dataIssuer(bytes)
                                                .then((res) => {
                                                    alert(`Tài liệu được cung cấp bởi ${res}`)
                                                })
                                                .catch((err) => {
                                                    alert("Tài liệu chưa được xác minh")
                                                } )
                                        }}>
                                            Xác minh
                                        </button>
                                        <button onClick={ () => {
                                            console.log(responseId[req._id]);
                                            const data = findData(responseId[req._id])
                                            setDisplayData( JSON.parse(data));
                                            setOpenDisplay(true)
                                        }}>
                                            Xem
                                        </button>
                                    </>
                                    :
                                    <>
                                     
                                        <button>
                                            Chờ xác nhận
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    )
                }
            </div>

            {
                openDisplay && displayData 
                &&

                <div className={styles.doc}>
                    <div ref = {docRef} className={styles.docRef}>

                        <DisplayData  data = {displayData}/>
                    </div>
                </div>
            }
        </div>
    );
}

export default Request;
