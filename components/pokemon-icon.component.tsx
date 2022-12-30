import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../assets/fonts/icomoon.json';

const PokemonIcon = createIconSetFromIcoMoon(icoMoonConfig, 'IcoMoon', 'icomoon.ttf');

export default PokemonIcon;
