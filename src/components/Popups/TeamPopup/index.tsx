
import TeamPopupPNG from 'assets/images/team_popup.png'
import Button from 'components/Base/Button';
import { useHistory } from 'react-router-dom';
import Popup from '..';

import styles from './index.module.scss';

interface TeamPopupProps {
  visible: boolean;
  onClose: () => void;
}

const TeamPopup: React.FC<TeamPopupProps> = ({ visible, onClose }) => {

  const history = useHistory()

  return (
    <Popup visible={visible} onClose={onClose} closePostion='bottom'>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.detail}>
            战队玩法，校友根据省份进行划分，需列出省份参与人数、总步数、人均步数，最终排名榜将以人均步数为基准进行排名，设冠亚季各一队，其他奖项待定。每位校友能且只能够选择一个战队加入，不可退换。加入战队后，个人头像需要有一定的标识，以便后续战队队员道具的使用。
          </div>
          <div className={styles.button}>
            <Button theme="hot" onClick={() => history.push("/introduction/team")}>查看详细</Button>
          </div>
        </div>
        <div className={styles.background}>
          <img src={TeamPopupPNG} alt="" />
        </div>
      </div>
    </Popup>
  )

}

export default TeamPopup;
