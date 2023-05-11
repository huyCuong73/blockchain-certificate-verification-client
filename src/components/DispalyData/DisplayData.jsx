import React from 'react';
import s from "./displayData.module.css"
const DisplayData = ({data}) => {
    return (
        <div className={s.input}>
                <div className={s.inputWrapper}>

                    <div className={s.uniName}>
                        {data.uniName}
                    </div>
                    <div className={s.title}>CHỨNG NHẬN KẾT QUẢ HỌC TẬP</div>

                    <div className={s.studentInfo}> 
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Họ và tên
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>

                                <div className={s.infoEditor}>
                                    {data.stuName}
                                </div>
                            </div>
                        </div>
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Ngày sinh
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>

                                <div className={s.infoEditor}>
                                    {data.dateOfBirth}
                                </div>
                            </div>
                        </div>
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Mã sinh viên
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>

                                <div className={s.infoEditor}>
                                    {data.stuId}
                                </div>                                
                            </div>
                        </div>
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Khóa/ Lớp
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>

                                <div className={s.infoEditor}>
                                    {data.stuClass}
                                </div>
                            </div>
                        </div>
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Chuyên ngành
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>

                                <div className={s.infoEditor}>
                                    {data.major}
                                </div>
                            </div>
                        </div>
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Hệ đào tạo
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>

                                <div className={s.infoEditor}>
                                    {data.type}
                                </div>
                            </div>
                        </div>

                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                GPA
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>

                                <div className={s.infoEditor}>
                                    {data.gpa}
                                </div>
                            </div>
                        </div>
                        
                        <div className={s.info}>
                            <div className={s.infoLabel}>
                                Xếp loại
                            </div>
                            <div className={s.infoInput}>
                                <span style={{marginRight: "10px"}}>:</span>

                                <div className={s.infoEditor}>
                                    {data.grade}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={s.transcript}>
                        {
                            data.semesters && data.semesters.map((semester,i) => 
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
                                        semester.map((subject,j) =>
                                            <>
                                                <div className={s.subject}>
                                                    <div className={s.id}>

                                                        <div className={s.subjectInput}>
                                                            {subject.subjectId}
                                                        </div>
                                                    </div>
                                                    <div className={s.subjectName}>

                                                        <div className={s.subjectNameInput}>
                                                            {subject.subjectName}
                                                        </div>
                                                    </div>
                                                    <div className={s.credits}>
                                                        <div className={s.subjectInput}>
                                                            {subject.credits}
                                                        </div>
                                                    </div>
                                                    <div className={s.mark}>
                                                        <div className={s.subjectInput}>
                                                            {subject.mark}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }

                                </div>
                            </>
                            )
                        }
                    </div>
                </div>
            </div> 
    );
}

export default DisplayData;
