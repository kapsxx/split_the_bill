import stb_logo from "../images/stb_logo.png";
import styles from "./PassbookCard.module.css";

function PassbookCard({invoiceDate, invoiceId, statement}){

    // if(isBkLoading){
    //     return (
    //         <>
    //         <div>
    //             <h3>...uploading</h3>
    //         </div>
    //         </>
    //     )
    // }


    return (
        <>
        <div className={styles.container}>

            <div className={styles.smallflex}>
                <div className={styles.imgcontainer}><img src={stb_logo} alt="" /></div>
                <div>
                    <div className={styles.invoicebox}>INVOICE</div>
                    <div className={styles.datebox}>Date - {invoiceDate}</div>                    
                </div>
            </div>

            <div className={styles.hash}>invoice # - {invoiceId}</div>

            <div className={styles.flex}>
                <div>S.No.</div>
                <div>Comodity</div>
                <div>Price</div>
                <div>Paid By</div>

                <div>
                    {
                        statement.comodity_array.map((item, i)=><div key={i}>{i+1}</div>)
                    }
                </div>
                <div>
                    {
                        statement.comodity_array.map((item, i)=><div key={i}>{item}</div>)
                    }
                </div>
                <div>
                    {
                        statement.price_array.map((price, i)=><div key={i}>{"Rs. " + price}</div>)
                    }
                </div>
                <div>
                    {       
                        statement.paidBy_array.map((person, i)=><div key={i}>{person}</div>)
                    }
                </div>

                <div className={styles.grow}>Total</div>
                <div className={styles.grow}>
                    {
                        "Rs. " + statement.price_array.reduce(function(a, e){
                            return Number(a) + Number(e);
                        }, 0) + ".00"
                    }
                </div>
            </div>
        </div>


        </>
    )
}

export default PassbookCard;
