import axios from "axios";
import { createContext, useState } from "react"
import {v4 as uuid} from "uuid";

export const DataContext = createContext({
    auth: false,
    setAuth: ()=>{},
    membersList: [],
    setMembersList: ()=>{},
    createGroupFlag: false,
    setCreateGroupFlag: ()=>{},
    values: [[]],
    setValues: ()=>{},
    handleSettle: ()=>{},
    // settleFlag: false,
    // setSettleFlag: ()=>{},
    settlementArr: [],
    setSettlementArr: ()=>{},
    statement: {},
    setStatement: ()=>{},
    empty: false,
    setEmpty: ()=>{},
    finalFlag: false,
    setFinalFlag: ()=>{},
    invoiceId: "xyz123",
    setInvoiceId: ()=>{},
    verdictFlag: false,
    setVerdictFlag: ()=>{},
    invoiceDate: "29-02-2021",
    setInvoiceDate: ()=>{},
    isBkLoading: false,
    setIsBkLoading: ()=>{},
    handleUpload: ()=>{},
    isUploaded: false,
    setIsUploaded: ()=>{},
    myToken: "",
    setMyToken: ()=>{},
    SBH: {},
    setSBH: ()=>{}
})

function DataContextProvider({children}){

    const[myToken, setMyToken] = useState("");

    const[SBH, setSBH] = useState(undefined);

    const[auth, setAuth] = useState(false);
    const[empty, setEmpty] = useState(false);
    const[membersList, setMembersList] = useState([]);
    const[createGroupFlag, setCreateGroupFlag] = useState(false);
    const[values, setValues] = useState({});
    const[settlementArr, setSettlementArr] = useState([]);
    // const[settleFlag, setSettleFlag] = useState(false);
    const[statement, setStatement] = useState({
        comodity: [],
        price: [],
        paidBy: []
    })
    const[finalFlag, setFinalFlag] = useState(false);
    const[invoiceId, setInvoiceId] = useState("");
    const[invoiceDate, setInvoiceDate] = useState("");
    const[verdictFlag, setVerdictFlag] = useState(false);

    const[isBkLoading, setIsBkLoading] = useState(false);

    const handleSettle = ()=>{
        // setSettleFlag(!settleFlag);
        setInvoiceDate(new Date().toLocaleDateString());
        setInvoiceId(uuid());
        setFinalFlag(true);

        // setIsBkLoading(!isBkLoading);

        // setTimeout(() => {
        //     setIsBkLoading(false);
        // }, 2000);

        // axios({
        //     url: "http://localhost:2244/user",
        //     method: "post",
        //     data: {
        //         "first_name": "forntend",
        //         "last_name": "frontend",
        //         "email": "front@gmail.com",
        //         "bill_array": [
        //             {
        //                 "comodity_array": ["kk", "ll"],
        //                 "paidBy_array": ["kapil", "ajino"],
        //                 "price": ["55", "444"],
        //             }
        //         ]
        //     }
        // }).then(function(res){
        //     console.log(res.data);
        //     setIsBkLoading(false);
        // })



        console.log(values);
        console.log(membersList);

        var N = membersList.length + 1;
        console.log(N);

        function getMin(arr)
        {
            var minInd = 0;
            for (let i = 1; i < N; i++)
                if (arr[i] < arr[minInd])
                    minInd = i;
            return minInd;
        }

        function getMax(arr)
        {
            var maxInd = 0;
            for (let i = 1; i < N; i++)
                if (arr[i] > arr[maxInd])
                    maxInd = i;
            return maxInd;
        }

        function minOf2(x , y)
        {
            return (x < y) ? x: y;
        }

        function minCashFlowRec(amount)
        {
            var mxCredit = getMax(amount), mxDebit = getMin(amount);
        
            if (amount[mxCredit] === 0 && amount[mxDebit] === 0)
                return;
        
            var min = minOf2(-amount[mxDebit], amount[mxCredit]);
            amount[mxCredit] -= min;
            amount[mxDebit] += min;
        
            // console.log("Person " + (membersList[mxDebit] ? membersList[mxDebit] : "God") + " pays " + Math.ceil(min) + " to " + "Person " + (membersList[mxCredit] ? membersList[mxCredit] : "God"));
            let temp = (membersList[mxDebit] ? membersList[mxDebit] : "God") + " pays " + "Rs. " + Math.ceil(min) + " to " + (membersList[mxCredit] ? membersList[mxCredit] : "God");

            // setSettlementArr([...settlementArr, temp]);
            setSettlementArr((prev)=>[...prev, temp]);
            minCashFlowRec(amount);
        }

        function minCashFlow(graph)
        {
            var amount=Array.from({length: N}, (_, i) => 0);

            for (let p = 0; p < N; p++)
            for (let i = 0; i < N; i++)
                amount[p] += (graph[i][p] - graph[p][i]);
        
            minCashFlowRec(amount);
        }

        var graph = [];
        for(let i=0; i<N; i++){
            graph[i] = new Array(N).fill(0);
        }

        // console.log(graph);

        for(let i=0; i<N-1; i++){
            graph[i][N-1] = values[i] ? -values[i] : 0
        }

        var temp = Object.values(values).reduce(function(a, e){
            return a+e;
        }, 0);

        temp = -temp/(N-1);

        for(let i=0; i<N-1; i++){
            graph[N-1][i] = temp;
        }

        minCashFlow(graph);
    }

    const[isUploaded, setIsUploaded] = useState(false);

    const handleUpload = ()=>{
        setIsBkLoading(!isBkLoading);

        console.log("mytoken", myToken);

        axios({
            url: `http://localhost:2244/user/upload/${myToken}`,
            method: "post",
            data: {
                "statement": {
                    "comodity_array": statement.comodity,
                    "paidBy_array": statement.paidBy,
                    "price_array": statement.price
                },
                "hash": invoiceId,
                "invoice_date": invoiceDate
            }
        }).then(function(res){
            setIsBkLoading(false);
            setIsUploaded(true);
            console.log("hello");
            console.log("res", res.data.data);
        })

        // axios({
        //     url: "http://localhost:2244/user/upload",
        //     method: "post",
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Authorization": "Bearer" + myToken
        //     },
        //     data: {
        //         "statement": {
        //             "comodity_array": statement.comodity,
        //             "paidBy_array": statement.paidBy,
        //             "price_array": statement.price
        //         },
        //         "hash": invoiceId,
        //         "invoice_date": invoiceDate
        //     }
        // }).then(function(res){
        //     setIsBkLoading(false);
        //     setIsUploaded(true);
        //     console.log("hello");
        //     console.log("res", res.data.data);
        // })
    }

    // const handleUpload = ()=>{
    //     setIsBkLoading(!isBkLoading);
    //     axios({
    //         url: "http://localhost:2244/user",
    //         method: "patch",
    //         data: {
    //             "first_name": "abc",
    //             "last_name": "abclast",
    //             "email": "abcabc@gmail.com",
    //             "bill_array": [
    //                 {
    //                     "comodity_array": ["one", "two"],
    //                     "paidBy_array": ["p1", "p2"],
    //                     "price_array": ["22", "21"],
    //                     "hash": "myhash123",
    //                     "invoice_date": "11/01/1998"
    //                 }
    //             ]
    //         },
    //         headers: {
    //             "Authorization": "Bearer" + "kapil"
    //         }
    //     }).then(function(res){
    //         setIsBkLoading(false);
    //         setIsUploaded(true);
    //         console.log("hello");
    //         console.log("res", res.data);
    //     })
    // }

    // const handleUpload = ()=>{
    //     setIsBkLoading(!isBkLoading);
    //     axios({
    //         url: "http://localhost:2244/user",
    //         method: "get",
    //         data: {
    //             "first_name": "abc",
    //             "last_name": "abclast",
    //             "email": "abcabc@gmail.com",
    //             "bill_array": [
    //                 {
    //                     "comodity_array": ["one", "two"],
    //                     "paidBy_array": ["p1", "p2"],
    //                     "price_array": ["22", "21"],
    //                     "hash": "myhash123",
    //                     "invoice_date": "11/01/1998"
    //                 }
    //             ]
    //         },
    //         headers: {
    //             "Authorization": "Bearer" + "kapil"
    //         }
    //     }).then(function(res){
    //         setIsBkLoading(false);
    //         setIsUploaded(true);
    //         console.log("hello");
    //         console.log("res", res.data);
    //     })
    // }

    const value = {
        auth: auth,
        setAuth: setAuth,
        membersList: membersList,
        setMembersList: setMembersList,
        createGroupFlag: createGroupFlag,
        setCreateGroupFlag: setCreateGroupFlag,
        values: values,
        setValues: setValues,
        handleSettle: handleSettle,
        settlementArr: settlementArr,
        setSettlementArr: setSettlementArr,
        // settleFlag: settleFlag,
        // setSettleFlag: setSettleFlag,
        statement: statement,
        setStatement: setStatement,
        empty: empty,
        setEmpty: setEmpty,
        finalFlag: finalFlag,
        setFinalFlag: setFinalFlag,
        invoiceId: invoiceId,
        setInvoiceId: setInvoiceId,
        verdictFlag: verdictFlag,
        setVerdictFlag: setVerdictFlag,
        invoiceDate: invoiceDate,
        setInvoiceDate: setInvoiceDate,
        isBkLoading: isBkLoading,
        setIsBkLoading: setIsBkLoading,
        handleUpload: handleUpload,
        isUploaded: isUploaded,
        setIsUploaded: setIsUploaded,
        myToken: myToken,
        setMyToken: setMyToken,
        SBH: SBH,
        setSBH: setSBH
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;
