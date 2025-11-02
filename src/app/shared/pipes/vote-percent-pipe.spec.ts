import { VotePercentPipe } from './vote-percent-pipe';

describe('VotePercentPipe', () => {
  const pipe = new VotePercentPipe();

  it('should convert vote to percentage string', () => {
    expect(pipe.transform(7.8)).toBe('78%');
  });

  it('should handle null and undefined', () => {
    expect(pipe.transform(null)).toBe('-');
  });
});
