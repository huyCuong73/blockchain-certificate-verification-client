import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import styles from "./management.module.scss"
import { useState } from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { createStu, getStudents, register } from '../../api/user';
import { useSelector } from 'react-redux';
import { getGeneratedCerts } from '../../api/cert';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Link } from 'react-router-dom';

const Management = () => {
    const user = useSelector(state => state.user.user)

    const [studentList, setStudentList] = useState([])
    const [grouped, setGrouped] = useState(null)
    const [classes, setClasses] = useState([])
    const [certs, setCerts] = useState(null)
    const [stuGenerated, setStuGenerated] = useState(null)
                    
    const [openRegis, setOpenRegis] = useState(false)
    const [className, setClassName] = useState("")
    const [email, setEmail] = useState("")
    const [stuId, setStuId] = useState("")
    const [stuName, setStuName] = useState("")
    const [password, setPassword] = useState("")
    const [stuClass, setStuClass] = useState("")
    const [update, setUpdate] = useState(0)
    const [openAddClass, setOpenAddClass] = useState(false)
    const [newClass, setNewClass] = useState("")
        
    useEffect(() => {
        if(user){
            getStudents({id: user._id})
                .then(res => {
                    setStudentList(res.data)
                    setGrouped(groupBy (res.data, "stuClass"))
                })
        }
    },[user,update])
    
    useEffect(() => {
        getGeneratedCerts({
            id: user._id
        })
            .then(res => {
                setCerts(res.data)
            }) 
            .catch(err => {
                console.log(err)
            })
    }, [user])

    useEffect(() => {
        if(certs){
            let stu = [];
            for( let i = 0; i < certs.length ; i++){
                if(certs[i].to){
                    stu.push(certs[i].to)
                }
            }
            setStuGenerated([...stu])
        }
    }, [certs])


    useEffect(() => {
        if(grouped){
            setClasses(Object.keys(grouped))
        }
    },[grouped])


    var groupBy = function (xs, key) {
        return xs.reduce (function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push (x);
        return rv;
        }, {});
    };

    // var grouped = groupBy (studentList, "stuClass");
    // const classes = Object.keys(grouped)

    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.class}>
                <h1>Class</h1>
                {
                    (classes.length !== 0) && classes.map ((e,i) => 
                        <div className={styles.classItem} onClick={() => {
                            setClassName(e)
                            setStuClass(e)
                        }}>
                            {e}
                        </div>
                    )
                }
                <div className={styles.addClass} onClick={() => setOpenAddClass(true)}>
                    <AddCircleIcon />
                </div>
            </div>

            <div className={styles.stuList}>
                <h1>List</h1>


                <div className={styles.addStu} onClick = {() => {
                    setOpenRegis(true)
                }}>
                    <AddCircleIcon />
                </div>
                
                {
                    className &&
                    grouped[className]
                    ?
                    grouped[className].map( (e) => 
                        <div className={styles.stu}>
                            <div className={styles.stuId}>
                                {e.stuId}
                            </div>
                            {
                                stuGenerated
                                &&
                                stuGenerated.includes(e._id)
                                ?
                                <div className={styles.status}>
                                    <CheckCircleRoundedIcon />
                                </div>
                                :
                                <div className={styles.status}>
                                    <Link to = "/generate" state = {{
                                        stuInfo:{
                                            stuId: e.stuId,
                                            stuClass: e.stuClass
                                        }
                                        
                                    }}>
                                        <div className={styles.generateBtn}>
                                            Generate
                                        </div>
                                    
                                    </Link>
                                </div>
                            }
                        </div>
                    )
                    :
                    <></>
                }

            </div>

            {
                openAddClass
                &&
                <div className={styles.addClassModal}>
                    <div className={styles.modal}>
                        <CancelRoundedIcon className={styles.closeIcon} onClick = {() => {
                            setOpenAddClass(false)
                        }}/>
                        <div className={styles.input}>
                            <div>Class:</div>
                            <input type="text" onChange={(e) => setNewClass(e.target.value)}/>
                        </div>

                        <div className={styles.addBtn} onClick = {() => {
                            setClasses([...classes, newClass])
                            setOpenAddClass(false)
                        }}>
                            Add Class
                        </div>
                    </div>
                </div>
            }
            
            {
                openRegis
                &&
                <div className={styles.regisModal}>
                    <div className={styles.box}>
                        <CancelRoundedIcon className={styles.closeIcon} onClick = {() => {
                            setOpenRegis(false)
                        }}/>
                        <div className={styles.input}>
                            <div>Student Email:</div>
                            <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className={styles.input}>
                            <div>Password:</div>
                            <input type="text" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className={styles.input}>
                            <div>Student ID:</div>
                            <input type="text" onChange={(e) => setStuId(e.target.value)}/>
                        </div>
                        <div className={styles.input}>
                            <div>Student Name:</div>
                            <input type="text" onChange={(e) => setStuName(e.target.value)}/>
                        </div>
                        <div className={styles.input}>
                            <div>Student Class:</div>
                            <input type="text" defaultValue={className} onChange={(e) => setStuId(e.target.value)}/>
                        </div>
                        <div className={styles.addBtn} onClick = {() => {
                            createStu({
                                email,
                                password,
                                stuId,
                                stuName,
                                stuClass,
                                createdBy: user._id
                            })
                                .then(() => {
                                    setUpdate(pre => pre +  1)
                                    setOpenRegis(false)
                                })
                        }}>
                            Add Student
                        </div>
                    </div>

                </div>
            }

        </div>
    );
}

export default Management;



