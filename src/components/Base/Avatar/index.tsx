import React from 'react';

import { Avatar as ANTDAvatar } from 'antd';

import styles from './index.module.scss';

const AvatarSize: {small: React.CSSProperties, middle: React.CSSProperties, large: React.CSSProperties} = {
    small: {
        width: 35,
        height: 35,
        fontSize: "24px",
        lineHeight: "35px",
        textAlign: "center"
    },
    middle: {
        width: 40,
        height: 40,
        fontSize: "24px",
        lineHeight: "40px",
        textAlign: "center"
    },
    large: {}
}

interface AvatarProps {
    src?: string;
    radius?: number;
    size?: keyof typeof AvatarSize;
    text?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, size="middle", radius=10, text }) => {

    return <ANTDAvatar className={styles.avatar} src={src} style={{borderRadius: radius, ...AvatarSize[size]}} >{text?.split("")[0]}</ANTDAvatar>

}

export default Avatar;