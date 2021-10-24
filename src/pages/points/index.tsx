import Button from 'components/Base/Button';

import walk from 'assets/images/foot_icon.png';
import CoinIcon from 'assets/images/coin_point.png';

import { getMySteps, getStepMapIntegral, TOTAL_LENGTH } from 'services';
import { useQuery } from 'react-query';

import styles from './index.module.scss';

const Point = () => {

    const { data: myStep } = useQuery("mySteps", getMySteps)

    const { data, isLoading } = useQuery(
        ["points"],
        getStepMapIntegral
    )

    return (
        <div className={styles.main}>
            <div className={styles.points}>
                <img src={CoinIcon} alt="" />
                当前积分：<span>100</span>积分
            </div>
            <div className={styles.total}>
                <div>今日行程：<span>{myStep?.nowStep}KM</span></div>
                <div>累计行程：<span>{myStep?.allKm}KM</span></div>
                <div>全程：<span> {TOTAL_LENGTH / 1000}KM</span></div>
            </div>
            <div className={styles.missionPanel}>
                {data?.map(point => (
                    <div key={point.id} className={styles.mission}>
                        <div className={styles.detail}>
                            <img src={walk} className={styles.walk} alt="1" />
                            <div>{point.name}</div>
                        </div>
                        {
                            point.flag==="1"?
                            <Button disabled>已领取{point.point}积分</Button>
                            :
                            <Button icon={<div className={styles.coin} />} theme="hot" >
                                <span>领取{point.point}积分</span>
                            </Button>
                        }
                    </div>
                ))}
            </div>
        </div>
    )

}

export default Point;