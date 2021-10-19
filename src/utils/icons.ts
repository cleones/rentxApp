import { SvgProps } from "react-native-svg";
import ForceSVG from '../assets/force.svg';
import AccelerationSVG from '../assets/acceleration.svg';
import SpeedSVG from '../assets/speed.svg';
import GasolineSVG from '../assets/gasoline.svg';
import ExchangeSVG from '../assets/exchange.svg';
import PeopleSVG from '../assets/people.svg';
import ElectricsSVG from '../assets/energy.svg';
import HybridSVG from '../assets/hybrid.svg';

interface IIcons {
  [key: string]: React.FC<SvgProps>;
}

export const icons: IIcons = {
  turning_diameter: ForceSVG,
  acceleration: AccelerationSVG,
  speed: SpeedSVG,
  gasoline_motor: GasolineSVG,
  exchange: ExchangeSVG,
  seats: PeopleSVG,
  electric_motor: ElectricsSVG,
  hybrid_motor: HybridSVG,
};