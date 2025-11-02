import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'votePercentPipe',
})
export class VotePercentPipe implements PipeTransform {
  transform(vote: number | null): string {
    if (vote == null) return '-';
    return `${Math.round(vote * 10)}%`;
  }
}
