
import PersonToggleIcon from 'assets/images/person_toggle.png';
import GroupToggleIcon from 'assets/images/group_toggle.png';
import CoinIcon from 'assets/images/coin.png';

import Avatar from 'components/Base/Avatar';
import { Badge } from 'antd';

import styles from './index.module.scss';
import classNames from 'classnames';
import { useHistory } from 'react-router';
import SelfDetailPanel from 'components/Panels/SelfDetailPanel';
import { useState } from 'react';

interface ToggleButtonProps {
  value: "team" | "person";
  onChange: (value: "team" | "person") => void;
  shadow?: boolean;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({ value, onChange, shadow }) => {

  return (
    <div
      className={classNames(
        styles.toggleButton,
        { [styles.shadow]: shadow }
      )}
      onClick={() => onChange(value === "person" ? "team" : "person")} >
      <img src={value === "person" ? PersonToggleIcon : GroupToggleIcon} alt="person_group_toggle" />
      <div>切换</div>
    </div>
  )

}

interface AvatarBoxProps {
  avatar?: string;
  name?: string;
  number?: string;
  score?: string;
  shadow?: boolean;
}

export const AvatarBox: React.FC<AvatarBoxProps> = (props) => {

  const [visible, setVisible] = useState(false)

  return (
    <div
      className={classNames(
        styles.avatarBox,
        { [styles.shadow]: props.shadow }
      )}
    >
      <div className={styles.avatar} onClick={() => setVisible(true)}><Avatar text={props.name} src={props.avatar} /></div>
      <div className={styles.text}>{props.score}</div>
      {/* {props.score && <div className={styles.text}>{props.score}</div>}
      {(props.name || props.number) && <Space>
        {props.name && <div className={styles.text}>{props.name}</div>}
        {props.number && <div className={styles.ext}>当前 <span>{props.number}</span></div>}
      </Space>} */}
      <SelfDetailPanel height="230px" visible={visible} onClose={() => setVisible(false)} />
    </div>
  )

}

interface GetPointButtonProps {
  dot?: boolean;
  shadow?: boolean;
}

export const GetPointButton: React.FC<GetPointButtonProps> = (props) => {
  const history = useHistory()
  return (
    <div onClick={() => history.push("/points")} className={classNames(
      styles.getPoint,
      { [styles.shadow]: props.shadow }
    )}>
      <Badge dot={props.dot} className={styles.inner}>
        <img src={CoinIcon} alt="coin" />
        <div>领积分</div>
      </Badge>
    </div>
  )
}
