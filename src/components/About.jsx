import {motion} from "framer-motion";
import { useState } from "react";
import styles from "./About.module.css";

function About(){

    const[test, setTest] = useState(false);

    return (
        <>
        {/* <h2>About Page</h2> */}
        {/* <button onClick={()=>setTest(!test)}>test</button> */}

        {/* {
            test && <motion.div animate={{height: "100%"}}  style={{border: "2px solid red", width: "45%", margin: "auto", height: "0px", overflow: "hidden"}}>
                         hello
                    </motion.div>
        } */}

        <div className={styles.container}>
            <div className={styles.sub_cont}>
                <li>Once you click on "Back", make sure you refresh the application</li>
                <li>Do not enter a very big number in place of "Amount Paid" as it may exceed the limit</li>
                <li>Try to keep the number of members of a group to be minimal as it may break the application</li>
            </div>
        </div>
        </>
    )
}

export default About;
