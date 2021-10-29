import { Empty, Spin } from "antd";
import moment from "moment";
import { useQuery } from "react-query";
import { propUseMe, propUseOther } from "services";

import MapIcon from 'assets/images/map_circle_icon.png'

import styles from './index.module.scss';


interface PropsLineProps {
  receivedId: string;
  createTime: string;
  name: string;
  stepNum: string;
  propName: string;
  content: React.ReactNode;
  onClick?: () => void;
}

export const PropsLine: React.FC<PropsLineProps> = (props) => {

  return (
    <div className={styles.propsItem}>
      <div className={styles.datetime}>
        <div>{moment(props.createTime, "X").format("YYYY-MM-DD")}</div>
        <span>{moment(props.createTime, "X").format("HH:mm:ss")}</span>
      </div>
      <div className={styles.content}>{props.content}</div>
      <div onClick={props.onClick} className={styles.mapIcon}><img src={MapIcon} alt="map" /></div>
    </div>
  )

}

interface MePropsLogsProps {
  onClick?: (id: string) => void;
}

export const MePropsLogs: React.FC<MePropsLogsProps> = ({ onClick }) => {

  const { data, isLoading } = useQuery(["props", "logs", "me"], propUseMe)

  return (
    <Spin spinning={isLoading}>
      {data?.map((log, index) => (
        <div className={styles.propsLine} key={`me-${index}`}>
          <PropsLine
            {...log}
            content={<div><strong>{log.name}</strong> 对你使用了 <strong>{log.propName}</strong>，你的步数 <strong>{log.stepNum}</strong></div>}
            onClick={() => onClick?.(log.receivedId)}
          />
        </div>
      ))}
      {data?.length === 0 && <Empty description="暂无记录" />}
    </Spin>
  )

}


interface OtherPropsLogsProps {
  onClick?: (id: string) => void;
}

export const OtherPropsLogs: React.FC<OtherPropsLogsProps> = ({ onClick }) => {

  const { data, isLoading } = useQuery(["props", "logs", "other"], propUseOther)

  return (
    <Spin spinning={isLoading}>
      {data?.map((log, index) => (
        <div className={styles.propsLine} key={`other-${index}`}>
          <PropsLine
            {...log}
            content={<div> 你对 <strong>{log.name}</strong> 使用了 <strong>{log.propName}</strong>， 步数 <strong>{log.stepNum}</strong></div>}
            onClick={() => onClick?.(log.receivedId)}
          />
        </div>
      ))}
      {data?.length === 0 && <Empty description="暂无记录" />}
    </Spin>
  )

}
