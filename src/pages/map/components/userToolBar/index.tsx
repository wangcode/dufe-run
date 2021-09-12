import { Badge } from 'antd';
import React, { useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router';

import Avatar from '../../../../components/Avatar';
import Button from '../../../../components/Button';
import DrawerPanel from '../../../../components/DrawerPanel';
import FollowButton from '../../../../components/FollowButton';
import SNSPanel from '../../../../components/SNSPanel';
import { getSomeoneStep } from '../../../../services';
import SelfDetailPanel from '../selfDetailPanel';

import styles from './index.module.scss';


interface UserToolBarProps {
    userId: string;
}

export const OtherToolBar: React.FC<UserToolBarProps> = ({ userId }) => {

    const { data } = useQuery(["user", userId], () => getSomeoneStep(userId))

    const handleOnFollow = () => {

    }

    return (
        <div>
            <div className={styles.fullToolbar}>
                <div className={styles.left}>
                    <div className={styles.avatar}>
                        <Avatar size="small" src={data?.pic||""} />
                    </div>
                    <div className={styles.score}>{data?.name}</div>
                    <div className={styles.distance}>当前 <span>{data?.allStep} KM</span></div>
                </div>
                <FollowButton follow={data?.followFlag==="1"} />
            </div>
        </div>
    )
}

interface SelfToolBar {
}

export const SelfToolBar = () => {

    const history = useHistory()

    const [ visible, setVisible ] = useState(false)

    const avatar = "https://images.generated.photos/TLpLhkWOu0ROL4_KZsXodUeOYwWXS8evz3jO8KS40ds/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY2NjgyLmpwZw.jpg"

    const point = 365

    const name = "孟浩"

    const steps = 10.1

    return (
        <div>
            <div className={styles.blockToolbar}>
                <div className={styles.left}>
                    <div className={styles.avatar} onClick={()=>self && setVisible(true)}>
                        <Avatar size="small" src={avatar} />
                    </div>
                    {self && <span className={styles.score}>{point}分</span>}
                    {self && <Badge dot><div className={styles.scoreBtn} onClick={() => history.push("/points")}>领积分</div></Badge>}
                </div>
            </div>
            <DrawerPanel destroyOnClose height="212px" visible={visible} onClose={() => setVisible(false)}>
                <SelfDetailPanel />
            </DrawerPanel>
        </div>
    )
}

// interface UserToolBarProps {
//     self: boolean;
//     userId?: string;
// }

// const UserToolBar: React.FC<UserToolBarProps> = ({ self, userId }) => {

//     const history = useHistory()

//     const [ visible, setVisible ] = useState(false)

//     const {} = useQuery(["user", userId], () => getSomeoneStep(userId!), {
//         enabled: !!userId
//     })

//     const follow = useMutation(followSomeone)

//     const unFollow = useMutation(removeFollow)


//     const handlePointClick = () => {
//         history.push("/points")
//     }

//     const handleOnFollow = () => {

//     }

//     const avatar = "https://images.generated.photos/TLpLhkWOu0ROL4_KZsXodUeOYwWXS8evz3jO8KS40ds/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTY2NjgyLmpwZw.jpg"

//     const point = 365

//     const name = "孟浩"

//     const steps = 10.1

//     return (
//         <div>
//             <div className={self?styles.blockToolbar:styles.fullToolbar}>
//                 <div className={styles.left}>
//                     <div className={styles.avatar} onClick={()=>self && setVisible(true)}>
//                         <Avatar size="small" src={avatar} />
//                     </div>
//                     {self && <span className={styles.score}>{point}分</span>}
//                     {self && <Badge dot><div className={styles.scoreBtn} onClick={handlePointClick}>领积分</div></Badge>}
//                     {!self && <div className={styles.score}>{name}</div>}
//                     {!self && <div className={styles.distance}>当前 <span>{steps}KM</span></div>}
//                 </div>
//                 {!self && <Button theme="success" onClick={handleOnFollow}>+关注</Button>}
//             </div>
//             <DrawerPanel destroyOnClose height="212px" visible={visible} onClose={() => setVisible(false)}>
//                 <SelfDetailPanel />
//             </DrawerPanel>
//         </div>
//     )

// }

export default SelfToolBar;