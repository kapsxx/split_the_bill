import styles from "./About.module.css";
import {motion, useSpring} from "framer-motion";
import { useState } from "react";

function About(){

    const[test, setTest] = useState(false);

    return (
        <>
        <h2>About Page</h2>
        <button onClick={()=>setTest(!test)}>test</button>

        {
            test && <motion.div animate={{height: "100%"}}  style={{border: "2px solid red", width: "45%", margin: "auto", height: "0px", overflow: "hidden"}}>
                         hello
                    </motion.div>
        }


        </>
    )
}

export default About;
