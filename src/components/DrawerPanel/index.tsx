import { CloseCircleOutlined } from '@ant-design/icons';
import { Divider, Drawer, DrawerProps, Progress } from 'antd';
import React, { CSSProperties } from 'react';

import styles from './index.module.scss';

const CloseIcon = () => <CloseCircleOutlined style={{fontSize: 23, color: "rgb(220, 220, 220)"}} />

interface DrawerPanelProps extends DrawerProps {

}

const DrawerPanel: React.FC<DrawerPanelProps> = ({ ...drawerProps }) => {

    return (
        <Drawer className={styles.drawerPanel} closeIcon={<CloseIcon />} {...drawerProps} placement="bottom" />
    )

}

export default DrawerPanel;