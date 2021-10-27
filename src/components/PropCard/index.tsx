interface PropCardProps {
  name: string
  pic: string
  point: string
  surUseNum: number;
  onClick: () => void;
}

export const PropCard: React.FC<PropCardProps> = (props) => {

  return (
    <div>
      <div>{props.name}</div>
      <div>{props.point}</div>
      <button onClick={props.onClick}>使用</button>
    </div>
  )

}
