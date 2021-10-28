
import GoldLogo from 'assets/images/gold_logo.png';
import GoldBar from 'assets/images/gold_bar.png';
import SilverLogo from 'assets/images/silver_logo.png';
import SilverBar from 'assets/images/silver_bar.png';
import BronzeLogo from 'assets/images/bronze_logo.png';
import BronzeBar from 'assets/images/bronze_bar.png';

import styles from './index.module.scss';

interface RankItemType {
  id: number;
  name: string;
  aveKm: number;
}
interface GraphRankProps {
  list?: RankItemType[];
  onClick?: (id: number) => void;
}

const GraphRank: React.FC<GraphRankProps> = ({ list, onClick }) => {

  return (
    <div className={styles.rankGraph}>
      {list && list.length > 1 && <div className={styles.silver} onClick={() => onClick?.(list[1].id)}>
        <img src={SilverLogo} alt="" />
        <div className={styles.detail}>
          <div>{list[1].name || "--"}</div>
          <div>{list[1].aveKm || 0}KM</div>
        </div>
        <img src={SilverBar} alt="" />
      </div>}
      {list && list.length > 0 && <div className={styles.gold} onClick={() => onClick?.(list[0].id)}>
        <img src={GoldLogo} alt="" />
        <div className={styles.detail}>
          <div>{list[0].name || "--"}</div>
          <div>{list[0].aveKm || 0}KM</div>
        </div>
        <img src={GoldBar} alt="" />
      </div>}
      {list && list.length > 2 && <div className={styles.bronze} onClick={() => onClick?.(list[2].id)}>
        <img src={BronzeLogo} alt="" />
        <div className={styles.detail}>
          <div>{list[2].name || "--"}</div>
          <div>{list[2].aveKm || 0}KM</div>
        </div>
        <img src={BronzeBar} alt="" />
      </div>}
    </div>
  )
}

export default GraphRank;
