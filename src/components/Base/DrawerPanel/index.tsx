import { CloseCircleOutlined } from '@ant-design/icons';
import { Drawer, DrawerProps, Spin } from 'antd';
import React from 'react';

import styles from './index.module.scss';

const CloseIcon = () => <CloseCircleOutlined style={{fontSize: 23, color: "rgb(220, 220, 220)"}} />

interface DrawerPanelProps extends DrawerProps {
    loading?: boolean;
}

const DrawerPanel: React.FC<DrawerPanelProps> = ({ loading, ...props }) => {

    return (
        <Drawer className={styles.drawerPanel} closeIcon={<CloseIcon />} {...props} placement="bottom" push={false}>
            {/* {loading ? <Spin spinning={loading} /> : props.children} */}
            <Spin spinning={!!loading}>
                {props.children}
            </Spin>
        </Drawer>
    )

}

export default DrawerPanel;