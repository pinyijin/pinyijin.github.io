import type { Command } from '../shell/types';

export const oneHeartDownload: Command = {
  name: 'download_one_heart',
  description: 'Download One Heart after author verification',
  async run(ctx) {
    const birthday = window.prompt('Author verification required. Enter author birthday (YYYYMMDD):');
    if (birthday === null) {
      ctx.stdout.print('Download cancelled.');
      return;
    }
    if (birthday.trim() !== '20030222') {
      ctx.stdout.print('Verification failed.');
      return;
    }
    const link = document.createElement('a');
    link.href = '/one_heart-v2.pdf';
    link.download = 'One_Heart_V2.pdf';
    document.body.append(link);
    link.click();
    link.remove();
    ctx.stdout.print('Verification successful. One Heart download started.');
  },
};
