import { useContext, useState } from "react";
import { DataContext } from "../context/DataContextProvider";
import MemberCard from "./MemberCard.jsx";
import styles from "./Split.module.css";
import MemberCardInvoice from "./MemberCardInvoice.jsx";
import EmptyPockets from "../images/emptypockets.png";
import DescriptiveBill from "./DescriptiveBill";
import PaidNotPaid from "./PaidNotPaid.jsx";
import {motion} from "framer-motion";
import {animate_value, initial_value, transition_value} from "./SplitFramerMotion.js";

function Split(){

    const{statement, empty, setEmpty, membersList, setMembersList, setCreateGroupFlag, createGroupFlag, settlementArr, handleSettle, finalFlag, verdictFlag, setVerdictFlag} = useContext(DataContext);
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
                                <img src={EmptyPockets} alt=""/>
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
        {
            !finalFlag && <button className={styles.custombtn} style={{marginBottom: "1%"}} disabled={membersList.length<2} onClick={()=>setCreateGroupFlag(false)}>Back</button>
        }
        {
            !finalFlag && membersList.map((person, i)=><MemberCardInvoice key={i} id={i} person={person} />)
        }
        {
            !finalFlag && <button disabled={statement.comodity.length===0} className={`${styles.custombtn} ${styles.bottommargin}`} style={{marginTop: "1%"}} onClick={handleSettle}>Settle</button>
        }

        {
            finalFlag && <DescriptiveBill/>
        }

        {/* {
            verdictFlag && settlementArr?.map((declaration, i)=><h2 onClick={()=>setHasPaid(!hasPaid)} className={hasPaid ? `${styles.verdict} ${styles.paid}` : `${styles.verdict} ${styles.not_paid}`} key={i}>{declaration}</h2>)
        } */}

        {
            verdictFlag && <motion.div animate={animate_value} initial={initial_value} transition={transition_value} className={styles.paid_parent}>{settlementArr?.map((declaration, i)=><PaidNotPaid key={i} declaration={declaration}/>)}</motion.div>
        }

        {
            finalFlag && <button className={styles.verdictbtn} onClick={()=>setVerdictFlag(!verdictFlag)}>{!verdictFlag ? "Verdict" : "Collapse"}</button>
        }
        </>
    )
}

export default Split;
