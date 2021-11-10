
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
            每名校友只能选择一个战队加入，加入战队将不可更改。加入战队后，每日步数将会折算计入战队总路程。战队将按照人均路程（战队总路程/战队人数）进行排位，并设冠、亚、季各一队。
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
