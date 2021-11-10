import { Typography } from 'antd';
import styles from './index.module.scss';

const { Paragraph } = Typography;


const Introduction = () => {

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.title}>推荐最佳行走姿势</div>
        <div className={styles.paragraph}>
          <Paragraph>1. 活动时间11月15日至11月30日</Paragraph>
          <Paragraph>2. 打开微信运动进行关联。</Paragraph>
          <Paragraph>3. 每日在行走积累一定步数，可以在校园地图中漫步。</Paragraph>
          <Paragraph>4. 此次活动分为个人赛与战队赛两种模式，可自行选择战队出战。</Paragraph>
        </div>
        <div className={styles.title}>积分如何获得</div>
        <div className={styles.paragraph}>
          <Paragraph>1. 累计不同的里程可以领取相应积分。</Paragraph>
          <Paragraph>2. 线上行走时，会遇见宝箱，拾取可获得积分，数量有限，先到先得。</Paragraph>
        </div>
        <div className={styles.title}>道具如何使用</div>
        <div className={styles.paragraph}>
          <Paragraph>1. 校友可以通过积分兑换道具进行使用。</Paragraph>
          <Paragraph>2. 道具兑换不设置背包，道具选择使用对象后直接扣除相应积分。</Paragraph>
          <Paragraph>3. 道具可以对全部对象进行使用。</Paragraph>
        </div>
      </div>
    </div>
  )


}

export default Introduction;
