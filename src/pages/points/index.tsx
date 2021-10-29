import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import Button from 'components/Base/Button';
import { getCumIntegral, getMySteps, saveStepIntegral, TOTAL_LENGTH } from 'services';

import walk from 'assets/images/foot_icon.png';
import CoinIcon from 'assets/images/coin_point.png';

import styles from './index.module.scss';

const Point = () => {

  const queryClient = useQueryClient()

  const myStep = useQuery("mySteps", getMySteps)

  const points = useQuery(
    ["points"],
    getCumIntegral
  )

  const mutation = useMutation(saveStepIntegral, {
    onSuccess: () => {
      message.success("领取成功！")
      queryClient.invalidateQueries("mySteps")
      points.refetch()
    }
  })

  return (
    <div className={styles.main}>
      <div className={styles.points}>
        <img src={CoinIcon} alt="" />
        当前积分：<span>{myStep.data?.allPoint || 0}</span> 积分
      </div>
      <div className={styles.total}>
        <div>今日行程：<span>{myStep.data?.nowStep || 0}KM</span></div>
        <div>累计行程：<span>{myStep.data?.allKm || 0}KM</span></div>
        <div>全程：<span> {TOTAL_LENGTH / 1000}KM</span></div>
      </div>
      <div className={styles.missionPanel}>
        {points.data?.map(point => (
          <div key={point.id} className={styles.mission}>
            <div className={styles.detail}>
              <img src={walk} className={styles.walk} alt="walk" />
              <div>{point.name}</div>
            </div>
            {point.flag === "0" && <Button
              disabled
              onClick={() => mutation.mutate(point.id.toString())}
              icon={<div className={styles.coin} />}
            >
              <span>领取{point.point}积分</span>
            </Button>}
            {point.flag === "1" && <Button
              onClick={() => mutation.mutate(point.id.toString())}
              icon={<div className={styles.coin} />}
              theme="hot"
            >
              <span>领取{point.point}积分</span>
            </Button>}
            {point.flag === "2" && <Button disabled>已领取{point.point}积分</Button>}
          </div>
        ))}
      </div>
    </div>
  )

}

export default Point;
