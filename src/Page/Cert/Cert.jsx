import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import { createResponse, getRequest, getStudentCerts } from '../../api/cert';
import { useSelector } from 'react-redux';
import styles from "./cert.module.scss"
import { PDFViewer } from '@react-pdf/renderer';
import Pdf from '../../components/PDF/PDF';

const Cert = () => {

    const docRef = useRef()
    const user = useSelector(state => state.user.user)
    const [data, setData] = useState(null)
    const [requests, setRequests] = useState(null)
    const [displayDoc, setDisplayDoc] = useState(false)
    const [certs, setCerts] = useState(null)

    useEffect(() => {
        if(user){
            getStudentCerts({id: user._id})
                .then(res => {
                    setCerts(res.data)
                    getRequest({
                        id: user._id
                    })
                        .then(res => {
                            console.log(groupBy(res.data, "to"));
                            setRequests(groupBy(res.data, "to"));
                        })
                })
                .catch(err => {
    
                })
        }
    },[user])

    
    // useEffect(() => {
    //     if(user){
    //         getRequest({
    //             id: user._id
    //         })
    //             .then(res => {
    //                 console.log(res.data);
    //             })
    //     }
    // },[user])

    useEffect(() => {
        function handleClickOutside(event) {
            if (docRef.current && !docRef.current.contains(event.target) ) {
					setDisplayDoc(false);
				}
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [docRef]);

    const groupBy = function (xs, key) {
        return xs.reduce (function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push (x);
        return rv;
        }, {});
    };

    if(!user || !certs){
        return (
        <div className={styles.container}>
            <Header ></Header>
            <h2>
                Bạn hiện không có chứng chỉ nào
            </h2>
        </div>
        )
    }
    
    return (
        <div className={styles.container}>
            <Header />

            {
                certs
                &&
                certs.map((cert) => 
                    <div className={styles.cert}>
                        <div className = {styles.title}>
                            Chứng nhận kết quả học tập
                        </div>
                        <div className={styles.docId}>
                            {`Id tài liệu: ${cert.docId}`}
                        </div>
                        <div className = {styles.actions}>
                            <div className={styles.invite}>
                                <span>Link mời: </span>
                                <div className= {styles.link}>
                                    {`http://localhost:3333/request/${cert._id}`}
                                </div>
                            </div>
                            <div className={styles.view}>
                                <div className={styles.viewBtn} onClick = {() => {
                                    setData(cert.data)
                                    setDisplayDoc(true)
                                }}>
                                    Xem
                                </div>
                            </div>
                        </div>
                        <div className={styles.reqList}>
                                {
                                    (user && requests && requests[user._id])
                                    &&
                                    requests[user._id].map(req => 
                                        <div className={styles.request}>
                                            <span>
                                            
                                                {`Bạn có 1 yêu cầu xem tài liệu đến từ ${req.from}`}
                                            </span>
                                            <div className={styles.btnWrapper}>
                                                <button onClick = {() => {
                                                    createResponse({
                                                        reqId: req._id,
                                                        to: req.from,
                                                        data: cert.data,
                                                        key : Math.random().toString(36).substr(2, 12),
                                                        publicKey: req.publicKey
                                                    })
                                                }}>
                                                    Đồng ý
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                        </div>
                    </div>
                )
            }

{
                displayDoc &&
                <div className={styles.docContainer}>
                    <div ref = {docRef}>
           
                        <PDFViewer className= {styles.doc}>
                            <Pdf data = {data}/>
                        </PDFViewer>
        
                    </div>
                </div>
            }    
        </div>
    );
}

export default Cert;
