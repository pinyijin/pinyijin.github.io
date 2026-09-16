import type { Command } from '../shell/types';

export const pinyi: Command = {
  name: 'pinyi',
  description: 'Reveal a childhood photograph',
  async run(ctx) {
    if (!ctx.tty) {
      ctx.stdout.print('Run pinyi without a pipe to view the photograph.');
      return;
    }
    const dialog = document.createElement('dialog');
    dialog.className = 'pinyi-photo';
    dialog.setAttribute('aria-label', 'Pinyi childhood photograph');
    const photo = document.createElement('img');
    photo.src = `${import.meta.env.BASE_URL}pinyi.jpg`;
    photo.alt = 'Pinyi as a child beside a computer and bookshelf';
    const close = document.createElement('button');
    close.textContent = 'Close · Esc';
    close.addEventListener('click', () => dialog.close());
    dialog.append(photo, close);
    document.body.append(dialog);
    await new Promise<void>((resolve) => {
      dialog.addEventListener('close', () => {
        dialog.remove();
        ctx.term.focus();
        resolve();
      }, { once: true });
      dialog.showModal();
    });
  },
};
