import React, { useEffect, useRef, useState } from 'react';
import s from "./generateDoc.module.css"
import sanitizeHtml from "sanitize-html"
import Pdf from '../../components/PDF/PDF';
import ContentEditable from 'react-contenteditable';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Header from '../../components/Header/Header';
import { PDFViewer, pdf } from '@react-pdf/renderer'
import { Web3Storage } from 'web3.storage'
import ReactPDF from '@react-pdf/renderer';
import { Buffer } from "buffer";
import { useWeb3React } from "@web3-react/core";
import { Contract } from "@ethersproject/contracts";
import { getRevertReason, defaultAbiCoder, } from 'ethers/lib/utils'
import { abi } from '../../contract/abi';
import { createCert } from '../../api/cert';
import { useSelector } from 'react-redux';
import { address } from '../../contract/contractAddress';
import { useLocation } from 'react-router-dom';
const { ethers } = require("ethers");

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDllRDk3MjBDOTg3NDZkRTZhNjNFRjJlYzY3YzFhOTFkNkU5QTJkMjQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODMyNDc5MjgwMTcsIm5hbWUiOiJjZXJ0aWZ5In0.uvah3s464AbPXFVBa3hAWdnB58093PXatC-SqzCb4SE'
const client = new Web3Storage({ token })

const GenerateDoc = () => {

    const user = useSelector(state => state.user.user)
    const { library, account} = useWeb3React();
    // const contractAddress = "0xd8da596ce8947cb7cddb927087f94d5baa845b5c";
    const contractABI = abi;
    const contractAddress = address

    const docRef = useRef()

    const [semesters, setSemesters] = useState([])
    const [uniName, setUniName] = useState("")
    const [stuName, setStuName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [stuClass, setStuClass] = useState("")
    const [stuId, setStuId] = useState("")
    const [type, setType] = useState("")
    const [major, setMajor] = useState("")
    const [gpa, setGPA] = useState("")
    const [grade, setGrade] = useState("")
    const [openPreview, setOpenPreView] = useState(false)

    const location = useLocation()
    const data = {
        uniName,
        stuName,
        stuId,
        dateOfBirth,
        stuClass,
        type,
        major,
        gpa,
        grade,
        semesters 
    }

    useEffect(() => {
        if (location.state) {
            setStuId(location.state.stuInfo.stuId)
            setStuClass(location.state.stuInfo.stuClass)
        }
    },[location])

    useEffect(() => {
        function handleClickOutside(event) {
            if (docRef.current && !docRef.current.contains(event.target) ) {
					setOpenPreView(false);
				}
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [docRef]);

  

    // const provider = new ethers.providers.JsonRpcProvider("https://ethereum-sepolia-rpc.allthatnode.com");

    // const viewContract = new ethers.Contract(contractAddress, contractABI, provider);

    const contract = new Contract(contractAddress, contractABI, account ? library.getSigner(account) : library)
                      
    const sanitizeConf = {
        allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
        allowedAttributes: { a: ["href"] }
    };


    const sanitize = (content) => {
        sanitizeHtml(content,sanitizeConf)
    }

    async function uploadFile(file) {
        const cid = await client.put([file])
        return cid
    }

    function convertToBytes(obj) {
        var str = JSON.stringify(obj)

        const encoder = new TextEncoder();
        var byteArr = encoder.encode(str);

        const decoder = new TextDecoder();
        const sstr = decoder.decode(byteArr);
        console.log(typeof(byteArr));
        return byteArr
    }


    return (           
        <div className={s.container}>
            <Header />
            <div className={s.input}>
                <div className={s.inputWrapper}>
                    <ContentEditable
                        className={s.uniName}
                        tagName="div"
                        html={uniName}
                        onChange={e => setUniName(e.target.value)} 
                        onBlur={() => sanitize(uniName)}
                    />
                    
                    <div className={s.title}>CHỨNG NHẬN KẾT QUẢ HỌC TẬP</div>

                    <div className={s.studentInfo}> 
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Họ và tên
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>
                                <ContentEditable
                                    className={s.infoEditor}
                                    tagName="div"
                                    html={stuName}
                                    onChange={e => setStuName(e.target.value)} 
                                    onBlur={() => sanitize(stuName)}
                                />
                            </div>
                        </div>
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Ngày sinh
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>
                                <ContentEditable
                                    className={s.infoEditor}
                                    tagName="div"
                                    html={dateOfBirth}
                                    onChange={e => setDateOfBirth(e.target.value)} 
                                    onBlur={() => sanitize(dateOfBirth)}
                                />
                            </div>
                        </div>
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Mã sinh viên
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>
                                <ContentEditable
                                    className={s.infoEditor}
                                    tagName="div"
                                    html={stuId}
                                    onChange={e => setStuId(e.target.value)} 
                                    onBlur={() => sanitize(stuId)}
                                />
                            </div>
                        </div>
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Khóa/ Lớp
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>
                                <ContentEditable
                                    className={s.infoEditor}
                                    tagName="div"
                                    html={stuClass}
                                    onChange={e => setStuClass(e.target.value)} 
                                    onBlur={() => sanitize(stuClass)}
                                />
                            </div>
                        </div>
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Chuyên ngành
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>
                                <ContentEditable
                                    className={s.infoEditor}
                                    tagName="div"
                                    html={major}
                                    onChange={e => setMajor(e.target.value)} 
                                    onBlur={() => sanitize(major)}
                                />
                            </div>
                        </div>
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Hệ đào tạo
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>
                                <ContentEditable
                                    className={s.infoEditor}
                                    tagName="div"
                                    html={type}
                                    onChange={e => setType(e.target.value)} 
                                    onBlur={() => sanitize(type)}
                                />
                            </div>
                        </div>

                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                GPA
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>
                                <ContentEditable
                                    className={s.infoEditor}
                                    tagName="div"
                                    html={gpa}
                                    onChange={e => setGPA(e.target.value)} 
                                    onBlur={() => sanitize(gpa)}
                                />
                            </div>
                        </div>
                        
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Xếp loại
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>
                                <ContentEditable
                                    className={s.infoEditor}
                                    tagName="div"
                                    html={grade}
                                    onChange={e => setGrade(e.target.value)} 
                                    onBlur={() => sanitize(grade)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={s.transcript}>
                        {
                            semesters.map((semester,i) => 
                            <>
                                <div>Học kỳ {i+1}</div>
                                <div className={s.table}>
                                    <div className={s.tableHeader}>
                                        <div className={s.col1}>
                                            Mã môn học
                                        </div>
                                        <div className={s.col2}>
                                            Tên môn học
                                        </div>
                                        <div className={s.col3}>
                                            Số tín chỉ
                                        </div>
                                        <div className={s.col4}>
                                            Kết quả
                                        </div>
                                    </div>
                                    {
                                        semesters[i].map((subject,j) =>
                                            <>
                                                <div className={s.subject}>
                                                    <div className={s.id}>
                                                        <input type="text" className={s.subjectInput} onChange = {e => {
                                                            const a = [...semesters]
                                                            a[i][j].subjectId = e.target.value
                                                            setSemesters(a)
                                                        }}/>
                                                    </div>
                                                    <div className={s.subjectName}>
                                                    <input
                                                        className={s.subjectNameInput}
                                                        onChange={e => {
                                                            const a = [...semesters]
                                                            a[i][j].subjectName = e.target.value
                                                            setSemesters(a)
                                                        }} 
                                                    />
                                                    </div>
                                                    <div className={s.credits}>
                                                        <input type="text" className={s.subjectInput} onChange = {e => {
                                                            const a = [...semesters]
                                                            a[i][j].credits = e.target.value
                                                            setSemesters(a)
                                                        }}/>
                                                    </div>
                                                    <div className={s.mark}>
                                                        <input type="text" className={s.subjectInput} onChange = {e => {
                                                            const a = [...semesters]
                                                            a[i][j].mark = e.target.value
                                                            setSemesters(a)
                                                        }}/>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                    <div className={s.addSubject} onClick={() => {
                                        const a = [...semesters]
                                        a[i].push({
                                            subjectId:'',
                                            subjectName:'',
                                            credits:'',
                                            mark:''
                                        })
                                        setSemesters(a)
                                    }}>
                                        <AddCircleIcon className={s.icon}/> Thêm môn học
                                    </div>
                                </div>
                            </>
                            )
                        }
                    </div>
                    <div className={s.addSemester} onClick={() => setSemesters([...semesters,[]])}>
                        <AddCircleIcon /> Thêm kì học
                    </div>

                </div>
            </div> 
            

            <div className={s.actions}>
                <button className={s.docAction} onClick={() => {

                    setOpenPreView(true)
                }}>xem trước</button>

                <button className={s.docAction} onClick={() => {
                        if (!account) {
                            alert("please connect to your account!");
                        }else{
                            console.log("uploading...");

                            const PdfComponent = Pdf({data})
        
                            const pdfDocument = pdf(PdfComponent)
                
                            pdfDocument.toBlob()
                                .then(pdfBlob => {
                                    const pdfFile = new File([pdfBlob], 'myfile.pdf')     
                                    uploadFile(pdfFile).then(cid => {
                                        contract.generateCertificate(convertToBytes(data), account, cid)
                                            .then(() => {

                                                createCert({
                                                    from: user._id,
                                                    stuId: stuId,
                                                    data: data,
                                                    docId: cid    
                                                })
                                                    .then(() => {
                                                        alert("Tạo thành công")
                                                    })
                                                    .catch(() => {
                                                        alert("Lỗi Server")
                                                    })
                                            })
                                            .catch((err) => {
                                                if (err.transactionHash) {
                                                    const reason = getRevertReason(err)
                                                    alert(reason || 'Something went wrong')
                                                } else {
                                                    if(err.error){
                                                        if (err.error.message === "execution reverted: Not authorized") { 
                                                            alert("you don't have permission to do this")
                                                        }
                                                    }else{
                                                        alert("Something went wrong");
                                                    }
                                                }
                                            })
                                    })        
                                })
                                
                                .catch(err => {
                                    alert("Lỗi upload tài liệu")
                                })
                        }
                }}>Xác nhận</button>

            </div>

            {
                openPreview &&
                <div className={s.docContainer}>
                    <div ref = {docRef}>
           
                        <PDFViewer className= {s.doc}>
                            <Pdf   data = {data}/>
                        </PDFViewer>
        
                    </div>
                </div>
            }                                
        </div>
    );
}

export default GenerateDoc;
