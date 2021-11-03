import { useContext } from "react";
import {Link} from "react-router-dom";
import { DataContext } from "../context/DataContextProvider";
import styles from "./Navbar.module.css";
import Search from "./Search.jsx";

function Navbar(){

    const{auth} = useContext(DataContext);

    return (
        <div className={styles.flex}>
            <div className={styles.link_parent}>
                <Link to="/">Home</Link>
            </div>
            <div className={styles.link_parent}>
                <Link to="/about">About</Link>
            </div>
            {
                auth && <div className={styles.link_parent}>
                            <Link to="/passbook">Passbook</Link>
                        </div>
            }
            <div className={styles.link_parent}>
                <Link to="/auth">{auth ? "Logout" : "Login"}</Link>
            </div>

            <div style={{flexGrow: "1"}}></div>

            <div>
                <Search/>
            </div>
        </div>
    )
}

export default Navbar;
