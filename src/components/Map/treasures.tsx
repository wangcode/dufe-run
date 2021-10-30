import { FeatureGroup, Marker } from "react-leaflet";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTreasureChest, saveStepIntegral } from "services";
import BoxOpenPopup from 'components/Popups/BoxOpenPopup'
import { getTreasureMark } from "./marks";
import { useState } from "react";

interface TreasuresProps {

}


const Treasures: React.FC<TreasuresProps> = () => {

  const queryClient = useQueryClient()

  const [box, setBox] = useState<{ name: string, point: string, id: number }>()

  const treasurechest = useQuery("treasurechest", getTreasureChest)

  const mutation = useMutation(saveStepIntegral, {
    onSuccess: (_, id) => {
      setBox(treasurechest.data?.find(item => item.id === parseInt(id)))
    }
  })

  const handleOnClose = () => {
    treasurechest.refetch()
    queryClient.invalidateQueries("mySteps")
    setBox(undefined)
  }

  return (
    <FeatureGroup>
      {treasurechest.data?.filter(chest => chest.surplusAmount > 0 && chest.flag === "0")
        .map(chest => (
          <Marker
            key={chest.id}
            icon={getTreasureMark()}
            eventHandlers={{ click: () => mutation.mutateAsync(chest.id.toString()) }}
            position={[chest.position[0], chest.position[1]]}
          />
        ))}
      <BoxOpenPopup visible={!!box} onClose={handleOnClose} name={box?.name} point={box?.point} />
    </FeatureGroup>
  )

}

export default Treasures;
