import {Link} from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar(){
    return (
        <div className={styles.flex}>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/about">About</Link>
            </div>
        </div>
    )
}

export default Navbar;
