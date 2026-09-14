import type { Command } from '../shell/types';

export const oneHeartDownload: Command = {
  name: 'download_one_heart',
  description: 'Download One Heart after author verification',
  run(ctx) {
    const birthday = window.prompt('Author verification required. Enter author birthday (YYYYMMDD):');
    if (birthday !== '20030222') {
      ctx.stdout.print('Verification failed.');
      return;
    }
    const link = document.createElement('a');
    link.href = '/one_heart-v2.pdf';
    link.download = 'One_Heart_V2.pdf';
    link.click();
    ctx.stdout.print('Verification successful. One Heart download started.');
  },
};
