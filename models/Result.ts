import { Sports } from './Sports.enum';
import { Medals } from './Medals.enum';

export interface Result {
  // Result has a sport and medal
  // TODO
  sport: Sports;
  medal: Medals;
}