import { createContext, Suspense, useState } from "react"

export const DataContext = createContext({
    membersList: [],
    setMembersList: ()=>{},
    createGroupFlag: false,
    setCreateGroupFlag: ()=>{},
    values: [[]],
    setValues: ()=>{},
    handleSettle: ()=>{},
    settleFlag: false,
    setSettleFlag: ()=>{},
    settlementArr: [],
    setSettlementArr: ()=>{},
    statement: {},
    setStatement: ()=>{},
    empty: false,
    setEmpty: ()=>{}
})

function DataContextProvider({children}){

    const[empty, setEmpty] = useState(false);
    const[membersList, setMembersList] = useState([]);
    const[createGroupFlag, setCreateGroupFlag] = useState(false);
    const[values, setValues] = useState({});
    const[settlementArr, setSettlementArr] = useState([]);
    const[settleFlag, setSettleFlag] = useState(false);
    const[statement, setStatement] = useState({
        comodity: [],
        price: [],
        paidBy: []
    })

    const handleSettle = ()=>{
        setSettleFlag(!settleFlag);

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
        
            console.log("Person " + (membersList[mxDebit] ? membersList[mxDebit] : "God") + " pays " + Math.ceil(min) + " to " + "Person " + (membersList[mxCredit] ? membersList[mxCredit] : "God"));
            let temp = "Person " + (membersList[mxDebit] ? membersList[mxDebit] : "God") + " pays " + Math.ceil(min) + " to " + "Person " + (membersList[mxCredit] ? membersList[mxCredit] : "God");

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

    const value = {
        membersList: membersList,
        setMembersList: setMembersList,
        createGroupFlag: createGroupFlag,
        setCreateGroupFlag: setCreateGroupFlag,
        values: values,
        setValues: setValues,
        handleSettle: handleSettle,
        settlementArr: settlementArr,
        setSettlementArr: setSettlementArr,
        settleFlag: settleFlag,
        setSettleFlag: setSettleFlag,
        statement: statement,
        setStatement: setStatement,
        empty: empty,
        setEmpty: setEmpty
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;
