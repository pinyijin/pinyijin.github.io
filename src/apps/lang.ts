import type { Command } from '../shell/types';

export const lang: Command = {
  name: 'lang',
  description: 'Toggle interface language preference',
  run(ctx, argv) {
    const requested = argv[1]?.toLowerCase();
    const current = localStorage.getItem('alden-lang') ?? 'en';
    const next = requested === 'zh' || requested === 'en'
      ? requested
      : current === 'en' ? 'zh' : 'en';
    localStorage.setItem('alden-lang', next);
    ctx.stdout.print(next === 'zh'
      ? '语言已切换为中文。刷新页面后生效。输入 lang en 切换英文。'
      : 'Language switched to English. Refresh to apply. Use lang zh for Chinese.');
  },
};
