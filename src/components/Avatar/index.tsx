import React from 'react';

import { Avatar as ANTDAvatar } from 'antd';

const AvatarSize = {
    small: {
        width: 35,
        height: 35
    },
    middle: {
        width: 53,
        height: 53
    },
    large: {}
}

interface AvatarProps {
    src: string;
    radius?: number;
    size?: keyof typeof AvatarSize;
}

const Avatar: React.FC<AvatarProps> = ({ src, size="middle", radius=10 }) => {

    return <ANTDAvatar src={src} style={{borderRadius: radius, ...AvatarSize[size]}} />

}

export default Avatar;