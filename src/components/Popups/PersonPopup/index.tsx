
import PersonPopupPNG from 'assets/images/person_popup.png'
import Button from 'components/Base/Button';
import { useHistory } from 'react-router';
import Popup from '..';

import styles from './index.module.scss';

interface PersonPopupProps {
  visible: boolean;
  onClose: () => void;
}

const PersonPopup: React.FC<PersonPopupProps> = ({ visible, onClose }) => {

  const history = useHistory()

  return (
    <Popup visible={visible} onClose={onClose} closePostion='bottom'>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.detail}>
            校友打开微信运动进行关联后即可参与此次活动。个人赛以步数进行排位，设冠、亚、季各一名。
            每名校友可关注10名参与活动的校友，在自己的地图中进行显示。地图中设有藏宝处10处，宝箱中投放相应积分，校友可以通过领取积分兑换道具进行使用，道具使用后扣除相应积分。
          </div>
          <div className={styles.button}>
            <Button theme="hot" onClick={() => history.push("/introduction/person")}>查看详细</Button>
          </div>
        </div>
        <div className={styles.background}>
          <img src={PersonPopupPNG} alt="" />
        </div>
      </div>
    </Popup>
  )

}

export default PersonPopup;


