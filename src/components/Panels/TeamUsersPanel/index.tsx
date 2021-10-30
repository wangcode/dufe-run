import { Col, DrawerProps, Empty, Row } from "antd";

import Button from 'components/Base/Button';
import DrawerPanel from 'components/Base/DrawerPanel';
import SearchInputStyle from 'components/Panels/SNSPanel/index.module.scss';
import TeamIcon from 'assets/images/group_icon.png';
import UserIcon from 'assets/images/user_icon.png';

import TeamUserLine from "components/LineItem/TeamUserLine";
import { useQuery } from "react-query";
import { getMyStepTeam, getStepTeamPerson } from "services";

import styles from './index.module.scss';
import { useEffect, useState } from "react";

interface TeamUsersPanelProps extends DrawerProps {
  id?: string;
  haveFollow?: boolean;
}

const TeamUsersPanel: React.FC<TeamUsersPanelProps> = (props) => {

  const [keyword, setKeyword] = useState("")
  const [searchKey, setSearchKey] = useState("")

  const team = useQuery(["teams", props.id], () => getMyStepTeam(props.id!), { enabled: !!props.id && props.visible })
  const users = useQuery(["teams", props.id, "users", searchKey], () => getStepTeamPerson(props.id!, searchKey), { enabled: !!props.id && props.visible })

  useEffect(() => {
    if (!props.visible) {
      setSearchKey("")
      setKeyword("")
    }
  }, [props.visible])

  return (
    <DrawerPanel {...props}>

      <div className={styles.head}>
        <div className={styles.title}>
          <img src={TeamIcon} alt="" />
          <div>{team.data?.name || "--"}</div>
        </div>
        <div className={styles.extend}>
          <img src={UserIcon} alt="" />
          <div>{team.data?.personNum || 0} 人</div>
        </div>
      </div>

      <div className={styles.search}>
        <Row gutter={12} wrap={false}>
          <Col flex={1}>
            <input
              type="text"
              value={keyword}
              className={SearchInputStyle.searchInput}
              onChange={e => setKeyword(e.target.value)}
            />
          </Col>
          <Col><Button onClick={() => setSearchKey(keyword)} theme="hot">搜索</Button></Col>
        </Row>
      </div>

      <div className={styles.userList}>
        {users.data?.map((user, index) => (
          <div key={user.userId} className={styles.user}>
            <TeamUserLine
              id={user.userId}
              avatar={user.pic}
              type="person"
              hiddenMap
              follow={{
                follow: user.flag === "1",
                followId: user.followId
              }}
              hidden={!props.haveFollow}
              onFav={users.refetch}
              name={user.name || "--"}
              number={`${user.allKm || 0}KM`}
            />
          </div>
        ))}
      </div>

      {users.data?.length === 0 && <Empty description={`没有找到 ${searchKey}！`} />}

    </DrawerPanel>
  )

}

export default TeamUsersPanel;
