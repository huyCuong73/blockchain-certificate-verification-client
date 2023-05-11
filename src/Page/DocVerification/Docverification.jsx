import React, { useState } from "react";
import { useDropzone } from 'react-dropzone'

import styles from "./doc.module.scss"
import Header from "../../components/Header/Header";


const Docverification = () => {
    const [file, setFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        
        const file = acceptedFiles[0];

        if (file && file.type === "application/pdf") {
            setFile(file);
            
        } else {
            setFile(null);
            alert("You can only upload PDF file")
        }
    };
    const handleDragOver = (e) => {
        e.target.classList.add(styles['dragOver']);
    };

    const handleDragLeave = (e) => {
        e.target.classList.remove(styles['dragOver']);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/pdf': ['.pdf', '.PDF']
        }
    });

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.input} {...getRootProps({
                onDrop: (e) => {
                    e.preventDefault()
                    e.target.classList.remove(styles['dragOver']);
                },
                onDragOver: handleDragOver,
                onDragLeave: handleDragLeave
            })}        
            >
                {!file && <p>Click to browse or drag over a pdf file to this area to upload</p>}
                {file && 
                    <>
                        <img src="/pdf.svg" alt="" />
                        <span>{file.name}</span>
                    </>
                }
            </div>
            <div className={styles.btn}>
                VERIFY
            </div>
        </div>
    );
};

export default Docverification;
