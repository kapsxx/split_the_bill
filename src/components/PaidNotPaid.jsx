import { useState } from "react";
import styles from "./PaidNotPaid.module.css";

function PaidNotPaid({declaration}){

    const[hasPaid, setHasPaid] = useState(false);

    return (
        <>
        <h2 onClick={()=>setHasPaid(!hasPaid)} className={hasPaid ? `${styles.verdict} ${styles.paid}` : `${styles.verdict} ${styles.not_paid}`} >{declaration}</h2>
        </>
    )
}

export default PaidNotPaid;
