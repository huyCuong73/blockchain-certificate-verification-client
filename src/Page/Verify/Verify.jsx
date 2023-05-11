import React from 'react';
import Header from '../../components/Header/Header';

import styles from "./verify.module.scss"
import { Link } from 'react-router-dom';

const Verify = () => {
    return (
        <div className = {styles.container}>
            <Header />  

            <div className={styles.intro}>
                <h1>Verify Document</h1>
                <Link to = "/verify/id">
                    <button>
                        VERIFY USING ID
                    </button>
                </Link>
                <Link to = "/verify/document">
                    <button>
                        VERIFY BY UPLOADING DOCUMENT
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Verify;
