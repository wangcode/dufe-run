import TeamUserLine from "components/User/TeamUserLine";

import styles from './index.module.scss';


const Follows = () => {
    return (
        <div>


            <div>

                <div className={styles.followTitle}>
                    <div>关注的战队</div>
                    <span className={styles.count}>2 / 10</span>
                </div>

                <div className={styles.lineList}>
                    <div className={styles.lineItem}><TeamUserLine name="上海战队" number="4.5KM" /></div>
                    <div className={styles.lineItem}><TeamUserLine name="上海战队" number="4.5KM" /></div>
                    <div className={styles.lineItem}><TeamUserLine name="上海战队" number="4.5KM" /></div>
                    <div className={styles.lineItem}><TeamUserLine name="上海战队" number="4.5KM" /></div>
                </div>

            </div>

            <div>

                <div className={styles.followTitle}>
                    <div>关注的队友</div>
                    <span className={styles.count}>2 / 10</span>
                </div>

                <div className={styles.lineList}>
                    <div className={styles.lineItem}><TeamUserLine name="上海战队" number="4.5KM" /></div>
                    <div className={styles.lineItem}><TeamUserLine name="上海战队" number="4.5KM" /></div>
                    <div className={styles.lineItem}><TeamUserLine name="上海战队" number="4.5KM" /></div>
                    <div className={styles.lineItem}><TeamUserLine name="上海战队" number="4.5KM" /></div>
                </div>

            </div>


        </div>
    )
}

export default Follows
