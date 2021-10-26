import L from 'leaflet';
import PersonMark from 'assets/images/person.svg';

export const getPersonMark = (size = [60, 60]) => {
  const [width, height] = size;
  return new L.Icon({
    iconUrl: PersonMark,
    iconAnchor: [width / 2, height],
    iconSize: [width, height],
  });
}
