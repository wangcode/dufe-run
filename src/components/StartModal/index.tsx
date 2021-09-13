import React from 'react';
import Dialog, { DialogProps } from 'rc-dialog';
import StartPNG from '../../assets/images/start.png';

import styles from './index.module.scss';
import { CloseCircleOutlined } from '@ant-design/icons';
import Button from '../Button';

interface StartModalProps {
    onClose: () => void;
}

const StartModal: React.FC<StartModalProps> = ({ onClose }) => {
    return (
        <div className={styles.wrap}>
            <div className={styles.modal}>
                <div className={styles.content}>
                    <div className={styles.closeBtn}><CloseCircleOutlined onClick={onClose} /></div>
                    <img src={StartPNG} alt="start" />
                    <div className={styles.button}>
                        <Button size="large" theme="hot">查看攻略</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartModal;