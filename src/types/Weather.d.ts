
interface WeatherProps {
  onSelect: (selectedItem: string) => void;
  city : string,
  active : boolean,
  onClose: () => void;
}

export default WeatherProps;