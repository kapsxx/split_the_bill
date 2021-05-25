import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContextProvider";
import styles from "./MemberCardInvoice.module.css";
import HistoryOf from "./HistoryOf.jsx";
import historyImage from "../images/history.png";
import {motion} from "framer-motion";
import {animate_value, initial_value, transition_value} from "./MemberCardInvoiceFramerMotion.js";

function MemberCardInvoice({person, id}){

    const[history, setHistory] = useState(false);

    const[amount, setAmount] = useState("");
    const[bill, setBill] = useState("");

    const[invoice, setInvoice] = useState({ //--------------------------
        amountPaid: [],
        billList: []
    });

    const{values, setValues, statement, setStatement} = useContext(DataContext);

    useEffect(()=>{

        const temp = invoice.amountPaid.reduce(function(a, e){
            return a+e;
        }, 0)
        setValues({...values, [id]: temp});


    }, [invoice])

    const handleAdd = (bill, amount, person)=>{
        setInvoice({
            ...invoice, amountPaid: [...invoice.amountPaid, Math.ceil(amount)], billList: [...invoice.billList, bill]
        });

        setStatement({
            comodity: [...statement.comodity, bill],
            price: [...statement.price, amount],
            paidBy: [...statement.paidBy, person]
        })

        setAmount("");
        setBill("");

        // console.log(id, person);
    }

    return (
        <>
        <div className={styles.flex}>
            <div>
                <button className={styles.history} onClick={()=>setHistory(!history)}> <img src={historyImage}/> </button>
            </div>
            <div className={styles.box}>
                <div className={styles.basis}>{person}</div>
                <input type="number" min={0} step={0} onChange={(e)=>setAmount(e.target.value)} value={amount} placeholder="Amount Paid"/>
                <input type="text" onChange={(e)=>setBill(e.target.value)} value={bill} placeholder="Bill"/>
                <button disabled={amount==="" || bill===""} onClick={()=>handleAdd(bill, amount, person)}>ADD</button>
            </div>
        </div>
        {history && <motion.div animate={animate_value} initial={initial_value} transition={transition_value} className={styles.historyBox}>
                        <HistoryOf history={history} person={person} invoice={invoice} setInvoice={setInvoice} amount={amount} setAmount={setAmount} bill={bill} setBill={setBill} />
                    </motion.div>}
        </>
    )
}

export default MemberCardInvoice;
