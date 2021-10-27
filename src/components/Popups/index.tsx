import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  closePostion?: "top-right" | "bottom"
}

const Popup: React.FC<PopupProps> = ({ visible, children, onClose, closePostion = "top-right" }) => {

  if (!visible) return null;

  return (
    <div className={styles.wrap}>
      <div className={styles.modal}>
        <div className={styles.content}>
          {closePostion === "top-right" && <div className={styles.closeBtn}><CloseCircleOutlined onClick={onClose} /></div>}
          {children}
          {closePostion === "bottom" && <div className={styles.closeBtnBottom}><CloseCircleOutlined onClick={onClose} /></div>}
        </div>
      </div>
    </div>
  )
}

export default Popup;
