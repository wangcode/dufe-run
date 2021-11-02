import L from 'leaflet';
import PersonMark from 'assets/images/person.svg';
import TreasuresMark from 'assets/images/box_icon.gif';

export const getPersonMark = (size = [60, 60]) => {
  const [width, height] = size;
  return new L.Icon({
    iconUrl: PersonMark,
    iconAnchor: [width / 2, height],
    iconSize: [width, height],
  });
}


export const getTreasureMark = (size = [40, 40]) => {
  const [width, height] = size;
  return new L.Icon({
    iconUrl: TreasuresMark,
    iconAnchor: [width / 2, height],
    iconSize: [width, height],
  });
}
