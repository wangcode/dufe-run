import styles from './index.module.scss';

interface PropCardProps {
  pic: string
  point: string
  useNum: number;
  surUseNum: number;
  onClick?: () => void;
}

export const PropCard: React.FC<PropCardProps> = (props) => {


  return (
      <div className={styles.card} onClick={props.onClick}>
        <img className={styles.image} src={props.pic} alt="" />
        <div className={styles.content}>
          <div className={styles.top}>{props.surUseNum} / {props.useNum}</div>
          <div className={styles.bottom}>{props.point} 积分</div>
        </div>
      </div>
  )

}
