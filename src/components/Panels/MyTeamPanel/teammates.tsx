import TeamUserLine from "components/User/TeamUserLine"
import { useQuery } from "react-query"
import { getMyStepTeam, getMyStepTeamPersonRank, getStepTeamPerson } from "services"
import UserLine from "components/UserLine";
import { Col, Row } from "antd";
import Button from 'components/Base/Button';


import UserIcon from 'assets/images/user_icon.png';

import SearchInputStyle from 'components/Panels/SNSPanel/index.module.scss';
import MyRankStyle from 'pages/rank/index.module.scss';
import styles from './index.module.scss';

interface TeammatesProps {
    teamId: string;
}

const Teammates: React.FC<TeammatesProps> = ({ teamId }) => {

    const { data, isLoading } = useQuery(
        ["teams", teamId],
        () => getStepTeamPerson(teamId),
        {enabled: !!teamId}
    )

    const { data: TeamRank } = useQuery(
        ["myTeamSteps"],
        getMyStepTeamPersonRank,
        {enabled: !!teamId}
    )

    return (
        <div>

            <div style={{paddingRight: 50}} className={styles.subTitle}>
                <img src={UserIcon} alt="flag" />
                <div>512人</div>
            </div>

            <div style={{padding: "10px 35px 20px 35px"}}>
                <Row gutter={12} wrap={false}>
                    <Col flex={1}><input className={SearchInputStyle.searchInput} type="text" /></Col>
                    <Col><Button onClick={() => console.log(123)} theme="hot">搜索</Button></Col>
                </Row>
            </div>

            {data?.map(user => (
                <div key={user.userId} className={styles.lineItem}>
                    <TeamUserLine
                        avatar="123"
                        name="孟浩"
                        number="4.6KM"
                    />
                </div>
            ))}
        </div>
    )
}

export default Teammates