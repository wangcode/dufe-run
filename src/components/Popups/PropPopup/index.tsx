import { message } from "antd";
import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getMySteps, getStepPropInfo, useStepProp } from "services";

import Button from "components/Base/Button";
import Popup from "..";

import styles from './index.module.scss';

interface PropPopupProps {
  id?: number;
  userId?: string;
  onCancel?: () => void;
  onUse?: () => void;
}

const PropPopup: React.FC<PropPopupProps> = (props) => {

  const queryClient = useQueryClient()

  const myStep = useQuery("mySteps", getMySteps)

  const { data } = useQuery(
    ["props", props.id],
    () => getStepPropInfo(props.id!),
    { enabled: !!props.id }
  )

  const canUse = useMemo(() => {
    if (!data?.point || !myStep.data) return false
    return myStep.data.allPoint >= parseInt(data.point)
  }, [data, myStep])

  const mutation = useMutation(useStepProp, {
    onSuccess: () => {
      message.success("使用成功！")
      queryClient.invalidateQueries(["props", props.id])
      props.onUse?.()
    }
  })

  const handleOnUse = () => {
    if (props.id && props.userId) {
      mutation.mutate({ id: props.id.toString(), userId: props.userId })
    }
  }

  return (
    <Popup closePostion="disabled" visible={!!props.id} onClose={console.log}>
      <div className={styles.modal}>
        <div className={styles.pic}><img src={data?.pic} alt="" /></div>
        <div className={styles.body}>
          <div className={styles.title}>{data?.name}</div>
          <div className={styles.desc}>
            {data?.name}：让指定对象 <strong>{data?.info}</strong> ，每天可以使用 <strong>{data?.useNum}</strong> 次，您今天还可以使用 <strong>{data?.surUseNum}</strong> 次。
          </div>
          {!canUse && <div className={styles.error}>抱歉，您的积分不够，请先赚取积分</div>}
          <div className={styles.buttons}>
            <Button size="xm" theme="cheese" onClick={props.onCancel}>取消</Button>
            {canUse && <Button loading={mutation.isLoading} size="xm" theme="hot" onClick={handleOnUse}>确定使用</Button>}
            {!canUse && <Button size="xm" theme="hot" onClick={() => wx.miniProgram.navigateTo({ url: '/pages/Point/EarnPoints/index' })}>去赚积分</Button>}
          </div>
        </div>
      </div>
    </Popup>
  )

}

export default PropPopup;
