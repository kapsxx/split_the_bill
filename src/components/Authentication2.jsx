import { useContext, useState } from "react";
import { DataContext } from "../context/DataContextProvider.jsx";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import styles from "./Authentication.module.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },

    input: {
        marginBottom: "5%",
        backgroundColor: "white",
        width: "100%"
        // borderRadius: "8px"
    },
    btn: {
        width: "100%",
        paddingTop: "3.5%",
        paddingBottom: "3.5%"
    }
}));

function Authentication2() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const{auth, setAuth, setMyToken} = useContext(DataContext);

    const handleAuth = async()=>{
        axios({
            url: "http://localhost:2244/user/login",
            method: "post",
            data: {
                email: email,
                password: password
            }
        }).then(function(res){
            console.log("token", res.data.token);
            if(res.data.token){
                setMyToken(res.data.token);
                setAuth(!auth);
            }else{
                alert("wrong email or password");
            }
        })
    }

    const handleLogout = ()=>{
        setMyToken("");
        setAuth(false);
        setEmail("");
        setPassword("");
    }

    const classes = useStyles();

    return (
        <>
        {
            !auth ?
            <div className={styles.authContainer}>
                <TextField onChange={(e)=>setEmail(e.target.value)} value={email} className={classes.input} id="outlined-basic" label="Email" variant="outlined" /><br />
                <TextField type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className={classes.input} id="outlined-basic" label="Password" variant="outlined" /><br />
                <Button disabled={email.length==0 || password.length==0} onClick={handleAuth} className={classes.btn} variant="contained" color="primary">
                Login
                </Button>
                <br />
            </div> : 
            <div className={styles.authContainer}>
                <Button onClick={handleLogout} className={classes.btn} variant="contained" color="primary">
                    Logout
                </Button>
            </div>
        }
        </>
    )
}

export default Authentication2;