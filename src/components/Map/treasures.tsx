import { FeatureGroup, Marker } from "react-leaflet";
// import { useQuery } from "react-query";
// import { getStepMapIntegral } from "services";
import { getTreasureMark } from "./marks";

interface TreasuresProps {

}

const Treasures: React.FC<TreasuresProps> = () => {

  // const { data } = useQuery(["map", "integral"], getStepMapIntegral)

  return (
    <FeatureGroup>
      <Marker icon={getTreasureMark()} position={[1000, 1000]} />
    </FeatureGroup>
  )

}

export default Treasures;
