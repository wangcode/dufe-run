import React from 'react';
import Button from 'components/Base/Button';

import StartPNG from 'assets/images/start.png';
import styles from './index.module.scss';
import Popup from '..';
import { useHistory } from 'react-router';

interface HomePopupProps {
  onClose: () => void;
  visible: boolean;
}

const HomePopup: React.FC<HomePopupProps> = ({ onClose, visible }) => {

  const history = useHistory()

  return (
    <Popup visible={visible} onClose={onClose}>
      <div className={styles.content}>
        <img src={StartPNG} alt="start" />
        <div className={styles.button}>
          <Button size="large" theme="hot" onClick={() => history.push("/introduction")}>查看攻略</Button>
        </div>
      </div>
    </Popup>
  )
}

export default HomePopup;
