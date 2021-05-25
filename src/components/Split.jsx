import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataContextProvider";
import MemberCard from "./MemberCard.jsx";
import styles from "./Split.module.css";
import MemberCardInvoice from "./MemberCardInvoice.jsx";
import FinalStatement from "./FinalStatement.jsx";
import EmptyPockets from "../images/emptypockets.png";

function Split(){

    const{statement, empty, setEmpty, membersList, setMembersList, setCreateGroupFlag, createGroupFlag, settlementArr, handleSettle, settleFlag, setSettleFlag} = useContext(DataContext);
    const[member, setMember] = useState("");

    //====================================================

    //=======================================================

    const handleChange = (e)=>{
        setMember(e.target.value);
    }

    const handleAdd = (e)=>{
        e.preventDefault();
        setEmpty(true);
        setMembersList([...membersList, member]);
        setMember("");
    }

    if(!createGroupFlag){
        return (
            <>
            {/* split */}
            <form onSubmit={handleAdd}>
                <input type="text" onChange={handleChange} value={member} placeholder="Add Member..." className={styles.padding}/>
                <input type="submit" value="ADD" disabled={member.trim().length===0} className={styles.padding}/>
            </form>

            {
                !empty && <div className={styles.empty} style={{backgroundColor: "white"}}>
                                <img src={EmptyPockets}/>
                                <h2>Start adding members to your group and spend your money wisely! Need atleast 2 members to create a group.</h2>
                           </div>
            }

            {
                empty && <div className={styles.box}>
                            {
                                membersList.map((person, i)=><MemberCard key={i} person={person} />)
                            }
                         </div>
            }

            <button className={styles.create_grp_btn} disabled={membersList.length<2} onClick={()=>setCreateGroupFlag(true)}>Create Group</button>
            </>
        )
    }

    return (
        <>
        <button className={styles.custombtn} style={{marginBottom: "1%"}} disabled={membersList.length<2} onClick={()=>setCreateGroupFlag(false)}>Back</button>
        {
            membersList.map((person, i)=><MemberCardInvoice key={i} id={i} person={person} />)
        }
        <button disabled={statement.comodity.length===0} className={styles.custombtn} style={{marginTop: "1%"}} onClick={handleSettle}>Settle</button>
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
