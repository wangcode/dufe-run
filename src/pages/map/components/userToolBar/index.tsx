import { Badge, Spin, Space } from 'antd';
import React, { useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import Avatar from 'components/Base/Avatar';
import Button from 'components/Base/Button';
import DrawerPanel from 'components/Base/DrawerPanel';
import FollowButton from 'components/FollowButton';
import SNSPanel from 'components/Panels/SNSPanel';
import { getSomeoneStep } from 'services';
import { transStep2Kilometer } from 'utils';
import SelfDetailPanel from 'components/Panels/SelfDetailPanel';

import CoinIcon from 'assets/images/coin.png'
import PersonToggle from 'assets/images/person_toggle.png'
import GroupToggle from 'assets/images/group_toggle.png'

import styles from './index.module.scss';


interface UserToolBarProps {
    userId: string;
}

export const OtherToolBar: React.FC<UserToolBarProps> = ({ userId }) => {

    const { data, refetch, isLoading } = useQuery(["user", userId], () => getSomeoneStep(userId))

    return (
        <Spin spinning={isLoading}>
            {/* <div className={styles.fullToolbar}>
                <div className={styles.left}>
                    <div className={styles.avatar}>
                        <Avatar size="small" src={data?.pic} text={data?.name} />
                    </div>
                    <div className={styles.score}>{data?.name}</div>
                    <div className={styles.distance}>当前 <span>{transStep2Kilometer(data?.nowStep)} KM</span></div>
                </div>
                <FollowButton followId={data?.followId} userId={userId} follow={data?.followFlag==="1"} onChange={refetch} />
            </div> */}

            <div className={styles.toolbar_v2}>
                <div className={styles.left}>
                    <Space>
                        <div className={styles.user}>
                            <div className={styles.avatar}>
                                <Avatar size="small" src={data?.pic} />
                            </div>
                            <div>345分</div>
                        </div>
                        <div className={styles.point}>
                            <img src={CoinIcon} alt="coin" />
                            <div>领积分</div>
                        </div>
                    </Space>
                </div>


                <div className={styles.toggleBtn}>
                    <img src={false ? PersonToggle : GroupToggle} alt="person_group_toggle" />
                    <div>切换</div>
                </div>

            </div>

        </Spin>
    )
}

interface SelfToolBar {
    pic: string;
    name: string;
    steps: string;
}

export const SelfToolBar: React.FC<SelfToolBar> = ({ pic, name, steps }) => {

    const history = useHistory()

    const [visible, setVisible] = useState(false)

    const point = 365

    return (
        <div>
            {/* <div className={styles.blockToolbar}>
                <div className={styles.left}>
                    <div className={styles.avatar} onClick={()=>self && setVisible(true)}>
                        <Avatar size="small" src={pic} text={name} />
                    </div>
                    {self && <span className={styles.score}>{point}分</span>}
                    {self && <Badge dot><div className={styles.scoreBtn} onClick={() => history.push("/points")}>领积分</div></Badge>}
                </div>
            </div> */}

            <div className={styles.toolbar_v2}>
                <div className={styles.left}>
                    <Space align="center">
                        <div className={styles.user} onClick={() => setVisible(true)}>
                            <div className={styles.avatar}>
                                <Avatar size="small" src={pic} />
                            </div>
                            <div>345分</div>
                        </div>
                        {/* <div className={styles.point}>
                            <img src={CoinIcon} alt="coin" />
                            <div>领积分</div>
                        </div> */}
                        <FollowButton followId={"123"} userId={"123"} follow={true} onChange={() => { }} />
                    </Space>
                </div>


                <div className={styles.toggleBtn}>
                    <img src={false ? PersonToggle : GroupToggle} alt="person_group_toggle" />
                    <div>切换</div>
                </div>

            </div>

            <SelfDetailPanel destroyOnClose height="230px" visible={visible} onClose={() => setVisible(false)} />
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