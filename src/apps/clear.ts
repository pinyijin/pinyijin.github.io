import type { Command } from '../shell/types';

export const clear: Command = {
  name: 'clear',
  description: 'clear the screen',
  async run(ctx) {
    ctx.term.write('\x1b[2J\x1b[3J\x1b[H');
  },
};
