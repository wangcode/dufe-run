import { Typography } from 'antd';
import styles from './index.module.scss';

const { Paragraph } = Typography;


const Introduction = () => {

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.title}>推荐最佳行走姿势</div>
        <div className={styles.paragraph}>
          <Paragraph>1.早中晚，在积累一定步数后（大于100步），进行线上行走（Go）。</Paragraph>
          <Paragraph>2.步数不足100步，可收起手机，养成走路习惯。</Paragraph>
        </div>
        <div className={styles.title}>运动币怎么获得</div>
        <div className={styles.paragraph}>
          <Paragraph>1.累计不同的里程可以领取相应积分。</Paragraph>
          <Paragraph>2.线上行走时，会遇见宝箱，拾取可获得，宝箱里打开有积分。</Paragraph>
          <Paragraph>2.线上行走时，会遇见宝箱，拾取可获得，宝箱里打开有积分。</Paragraph>
        </div>
        <div className={styles.title}>推荐最佳行走姿势</div>
        <div className={styles.paragraph}>
          <Paragraph>1.早中晚，在积累一定步数后（大于100步），进行线上行走（Go）。</Paragraph>
          <Paragraph>2.步数不足100步，可收起手机，养成走路习惯。</Paragraph>
        </div>
        <div className={styles.title}>推荐最佳行走姿势</div>
        <div className={styles.paragraph}>
          <Paragraph>1.早中晚，在积累一定步数后（大于100步），进行线上行走（Go）。</Paragraph>
          <Paragraph>2.步数不足100步，可收起手机，养成走路习惯。</Paragraph>
        </div>
      </div>
    </div>
  )


}

export default Introduction;
