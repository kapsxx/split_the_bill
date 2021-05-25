function HistoryOf({history, person, invoice, setInvoice, amount, setAmount, bill, setBill}){

    if(history){
        return (
            <>
            <h2>
                {
                    invoice.billList.length!==0 ? `History of ${person}` : `${person}'s history is empty`
                }
            </h2>
            {
                    invoice.amountPaid.map((cost, i)=><div key={i}>{invoice.billList[i]} - Rs. {cost}.00</div>)
            }

            {/* --------------------- */}

            {
                    invoice.amountPaid.map((cost, i)=><div key={i}>{invoice.billList[i]}</div>)
            }

            {
                    invoice.amountPaid.map((cost, i)=><div key={i}>{cost}.00</div>)
            }
            </>
        )
    }

    return (
        <>
        </>
    )
}

export default HistoryOf;
