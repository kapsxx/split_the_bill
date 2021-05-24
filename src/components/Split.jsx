import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContextProvider";
import MemberCard from "./MemberCard.jsx";
import styles from "./Split.module.css";
import MemberCardInvoice from "./MemberCardInvoice.jsx";
import FinalStatement from "./FinalStatement.jsx";

function Split(){

    const{membersList, setMembersList, setCreateGroupFlag, createGroupFlag, settlementArr, handleSettle, settleFlag, setSettleFlag} = useContext(DataContext);
    const[member, setMember] = useState("");

    //====================================================

    //=======================================================

    const handleChange = (e)=>{
        setMember(e.target.value);
    }

    const handleAdd = (e)=>{
        e.preventDefault();
        setMembersList([...membersList, member]);
        setMember("");
    }

    if(!createGroupFlag){
        return (
            <>
            split
            <form onSubmit={handleAdd}>
                <input type="text" onChange={handleChange} value={member} placeholder="Add Member"/>
                <input type="submit" value="ADD"/>
            </form>

            <div className={styles.box}>
                {
                    membersList.map((person, i)=><MemberCard key={i} person={person} />)
                }
            </div>
            <button disabled={membersList.length<2} onClick={()=>setCreateGroupFlag(true)}>Create Group</button>
            </>
        )
    }

    return (
        <>
        <button style={{marginBottom: "1%"}} disabled={membersList.length<2} onClick={()=>setCreateGroupFlag(false)}>Back</button>
        {
            membersList.map((person, i)=><MemberCardInvoice key={i} id={i} person={person} />)
        }
        <button onClick={handleSettle}>Settle</button>
        {
            settlementArr?.map((declaration, i)=><div key={i}>{declaration}</div>)
        }
        {
            settleFlag && <FinalStatement/>
        }
        </>
    )
}

export default Split;
