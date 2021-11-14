import React, { useState } from 'react';
import { Col, Row } from 'antd';

import Card from 'components/Base/Card';
import Button from 'components/Base/Button';
import TeamBox from 'components/TeamBox';

import TeamDetailPanel from 'components/Panels/TeamDetailPanel';

import RuleIcon from 'assets/images/rule_icon.png';
import TimeOutlineIcon from 'assets/images/time_outline_icon.png';
import GroupOutlineIcon from 'assets/images/group_outline_icon.png';

import styles from './index.module.scss';
import { useQuery } from 'react-query';
import { getAllStepTeam } from 'services';
import { useHistory } from 'react-router';

interface TeamSelectProps {

}

const TeamSelect: React.FC<TeamSelectProps> = () => {

  const history = useHistory()

  const [selected, setSelected] = useState<number | undefined>(undefined)

  const { data } = useQuery(
    ["teams"],
    getAllStepTeam
  )

  return (
    <div className={styles.teamselect}>
      <Card>
        <div className={styles.cardInner}>

          <div>
            <div className={styles.title}>
              <img src={RuleIcon} alt="" />
              <div>战队赛规则</div>
            </div>
            <div className={styles.content}>每名校友只能选择一个战队加入，加入战队将不可更改。加入战队后，每日步数将会折算计入战队总路程。战队将按照人均路程（战队总路程/战队人数）进行排位，并设冠、亚、季各一队。</div>
          </div>

          <div>
            <div className={styles.title}>
              <img src={TimeOutlineIcon} alt="" />
              <div>活动时间</div>
            </div>
            <strong className={styles.content}>11月15日至11月30日</strong>
          </div>

          <div className={styles.detailBtn}>
            <Button size="middle" theme="hot" onClick={() => history.push("/introduction/team")}>活动具体说明</Button>
          </div>

          <div>
            <div className={styles.title_noborder}>
              <img src={GroupOutlineIcon} alt="" />
              <div>选择战队</div>
            </div>
            <div>
              <Row gutter={[25, 15]}>
                {data?.map((team, index) => (
                  <Col key={team.id} onClick={() => setSelected(team.id)} span={6}>
                    <TeamBox name={team.name} rank={index + 1} count={team.personNum || 0} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>

        </div>
      </Card>

      <TeamDetailPanel
        type="select"
        height="85vh"
        destroyOnClose
        teamId={selected?.toFixed(0)}
        visible={!!selected}
        onClose={() => setSelected(undefined)}
      />
    </div>
  )

}

export default TeamSelect;
