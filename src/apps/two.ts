import type { Command } from '../shell/types';

export const two: Command = {
  name: '222',
  description: 'A private philosophical easter egg',
  async run(ctx) {
    ctx.stdout.print('TWO IS PHILOSOPHY.');
  },
};
