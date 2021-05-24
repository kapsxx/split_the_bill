import styles from "./MemberCard.module.css";

function MemberCard({person}){
    return (
        <div style={{margin: "2%"}}>
            <div className={styles.usercard}>
                {person}
            </div>
        </div>

    )
}

export default MemberCard;
