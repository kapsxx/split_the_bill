import TextField from "../../node_modules/@mui/material/TextField";
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Modal from '@mui/material/Modal';

import styles from "./Search.module.css";
import { useContext, useState } from "react";
import axios from "axios";
import {DataContext} from "../context/DataContextProvider";
import SearchCard from "./SearchCard.jsx";
import SearchCardEmpty from "./SearchCardEmpty.jsx";

function Search(){

    const[myHash, setMyHash] = useState("");

    const{SBH, setSBH} = useContext(DataContext);

    const handleChange = (e)=>{
        setMyHash(e.target.value);
    }

    const handleSearch = ()=>{
        setOpen(true);

        axios({
            url: `http://localhost:2244/user/hash/${myHash}`,
            method: "get"
        }).then(function(res){
            console.log(res.data.data);
            if(res.data.data){
                setSBH(res.data.data);
            }else{
                setSBH(undefined);
            }
        })
    }

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    return (
        <>
        <div className={styles.container}>
            <TextField
            onChange={handleChange}
            value={myHash}
            label="search invoices by hash"
            id="outlined-start-adornment"
            InputProps={{
                startAdornment: <InputAdornment position="start">#</InputAdornment>,
                }}
            />
            {/* <TextField onChange={handleChange} value={myHash} id="outlined-basic" label="search invoices by #" variant="outlined" /> */}
            <Button disabled={myHash.trim().length==0} onClick={handleSearch} variant="contained">
                <SearchIcon/>
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.modal_container}>
                    {
                        SBH ? <SearchCard invoiceDate={SBH.invoice_date} invoiceId={SBH.hash} statement={SBH.statement} /> : <SearchCardEmpty/>
                    }
                </div>
            </Modal>
        </div>
        </>
    )
}

export default Search;
