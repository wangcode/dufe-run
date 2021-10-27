
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
            全部校友打开活动界面即可参加活动，以步数多少进行排名，设冠亚季各一名。每名校友可关注10名参与活动的校友，并在自己的地图中有所显示。地图中设有藏宝处10处，宝箱中投放相应积分，校友可以通过积分兑换道具进行使用。道具兑换不设置背包，使用列表包含全部参与的的校友，道具使用后扣除相应积分。
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


