import TeamUserLine from "components/User/TeamUserLine";

import FlagIcon from 'assets/images/flag_icon.png';

import styles from './index.module.scss';


const Teams = () => {
    return (
        <div>

            <div className={styles.subTitle}>
                <img src={FlagIcon} alt="flag" />
                <div>共计34个战队</div>
            </div>

            <div className={`${styles.lineItem} ${styles.myTeam}`}>
                <TeamUserLine hidden={true} name="上海战队" number="4.5KM" />
            </div>

            <div>
                <div className={styles.lineItem}><TeamUserLine name="上海战队" number="4.5KM" /></div>
                <div className={styles.lineItem}><TeamUserLine name="上海战队" number="4.5KM" /></div>
                <div className={styles.lineItem}><TeamUserLine name="上海战队" number="4.5KM" /></div>
                <div className={styles.lineItem}><TeamUserLine name="上海战队" number="4.5KM" /></div>
            </div>

        </div>
    )
}

export default Teams