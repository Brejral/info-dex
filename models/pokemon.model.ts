import { PokemonForm } from './pokemon-form.model';

export interface Pokemon {
  name: string;
  number: number;
  localNumbers: { [version: string]: number };
  types: string[];
  forms: PokemonForm[];
}
