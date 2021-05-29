import styles from "./HistoryOf.module.css";

function HistoryOf({history, person, invoice, setInvoice, amount, setAmount, bill, setBill}){

    if(history){
        return (
            <>
            {/* <h2>
                {
                    invoice.billList.length!==0 ? `History of ${person}` : `${person}'s history is empty`
                }
            </h2> */}

                {
                    invoice.billList.length===0 && <h2 style={{backgroundColor: "#ff0a54", padding: "1% 0%"}}>{`${person}'s history is empty`}</h2>
                }

            {/* {
                    invoice.amountPaid.map((cost, i)=><div key={i}>{invoice.billList[i]} - Rs. {cost}.00</div>)
            } */}

            {/* --------------------- */}

            <div className={styles.flex}>

                {
                    invoice.billList.length!==0 && <>
                        <div>Bill</div>
                        <div>Amount Paid</div>
                    </>
                }

                <div>
                    {
                            invoice.amountPaid.map((cost, i)=><div key={i}>{invoice.billList[i]}</div>)
                    }
                </div>
                <div>
                    {
                            invoice.amountPaid.map((cost, i)=><div key={i}>{"Rs. " + cost}.00</div>)
                    }
                </div>
            </div>
            </>
        )
    }

    return (
        <>
        </>
    )
}

export default HistoryOf;
