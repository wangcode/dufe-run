import Button from "components/Base/Button";
import { useQuery } from "react-query";
import { getStepPropInfo } from "services";
import styles from './index.module.scss';

interface PropsModalProps {
    onUse?: () => void;
    onGetPoint?: () => void;
    onCancel?: () => void;
}

const PropsModal: React.FC<PropsModalProps> = (props) => {

    const { data } = useQuery(
        [],
        () => getStepPropInfo("1")
    )

    return (
        <div className={styles.modal}>
            <div className={styles.pic}></div>
            <div className={styles.body}>
                <div className={styles.title}>{data?.name}</div>
                <div className={styles.desc}>{data?.info}</div>
                {/* <div classname={styles.error}>抱歉，您的积分不够，请先赚取积分</div> */}
                <div className={styles.buttons}>
                    <Button size="xm" theme="cheese" onClick={props.onCancel}>取消</Button>
                    <Button size="xm" theme="hot">确定使用</Button>
                    {/* <Button theme="hot">去赚积分</Button> */}
                </div>
            </div>
        </div>
    )

}

export default PropsModal;