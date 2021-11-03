import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {DataContext} from "../context/DataContextProvider";
import PassbookCard from "./PassbookCard";

function Passbook(){

    const{myToken} = useContext(DataContext);
    const[passbookList, setPassbookList] = useState([]);

    const[isPassbookLoading, setIsPassbookLoading] = useState(false)

    useEffect(()=>{
        setIsPassbookLoading(true);
        axios({
            url: `http://localhost:2244/user/invoice/${myToken}`,
            method: "get",
        }).then(function(res){
            console.log("res", res.data.data);
            setPassbookList(res.data.data);
            setIsPassbookLoading(false);
        })
    }, [])

    return (
        <>
        {/* <h1>Passbook page</h1> */}

        {
            isPassbookLoading ? <h3>...Loading</h3> : passbookList.length==0 ? <h3>Your invoice history is empty</h3> : passbookList.map(e => <PassbookCard invoiceDate={e.invoice_date} invoiceId={e.hash} statement={e.statement} />)
        }
        </>
    )
}

export default Passbook;
