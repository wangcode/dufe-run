import React from 'react';

import Popup from '..';
import BoxOpenPNG from 'assets/images/box.png';

interface BoxOpenPopupProps {
  name?: string;
  point?: string;
  onClose: () => void;
  visible: boolean;
}

const BoxOpenPopup: React.FC<BoxOpenPopupProps> = ({ name, point, onClose, visible }) => {
  return (
    <Popup visible={visible} onClose={onClose}>
      <div style={{ padding: "5vw" }}>
        <img src={BoxOpenPNG} alt="start" />
        <div style={{ color: '#f3d81b', textAlign: "center" }}>已打开 {name} 宝箱，恭喜您获得 {point} 积分</div>
      </div>
    </Popup>
  )
}

export default BoxOpenPopup;
