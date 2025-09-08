import { TVBase } from './tv-base';

export interface TVCard extends TVBase {
  popularity?: number;
  media_type?: 'tv';
}
