const glyphs: Record<string, string[]> = {
  A: ['01110', '11011', '11011', '11111', '11011', '11011', '11011'],
  L: ['11000', '11000', '11000', '11000', '11000', '11000', '11111'],
  D: ['11110', '11011', '11011', '11011', '11011', '11011', '11110'],
  E: ['11111', '11000', '11000', '11110', '11000', '11000', '11111'],
  N: ['11001', '11101', '11101', '11011', '11011', '11001', '11001'],
  J: ['00111', '00011', '00011', '00011', '11011', '11011', '01110'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
};

export function drawPixelTitle(): void {
  const title = document.getElementById('pixel-title');
  if (!title) return;
  for (const [letterIndex, letter] of [...'ALDEN JIN'].entries()) {
    for (const [rowIndex, row] of (glyphs[letter] ?? []).entries()) {
      for (const [columnIndex, pixel] of [...row].entries()) {
        if (pixel !== '1') continue;
        const block = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        block.setAttribute('x', String(letterIndex * 6 + columnIndex));
        block.setAttribute('y', String(rowIndex));
        block.setAttribute('width', '0.92');
        block.setAttribute('height', '0.92');
        block.style.animationDelay = `${letterIndex * 100 + rowIndex * 35}ms`;
        title.append(block);
      }
    }
  }
}
