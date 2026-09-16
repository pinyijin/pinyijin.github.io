import test from 'node:test';
import assert from 'node:assert/strict';
import { Shell } from './shell';
import { createRegistry } from './registry';
import { clear } from '../apps/clear';
import type { Term } from '../term/term';
import type { ContentStore } from '../content/store';

test('navigation replaces a draft, shares execution, supports history, completion and clear', async () => {
  Object.assign(globalThis, { document: { title: '' } });
  const writes: string[] = [];
  let executions = 0;
  const term = {
    write: (text: string) => writes.push(text),
    print: (text: string) => writes.push(text),
    onShellData: () => {},
    focus: () => {},
    cols: 80,
  } as unknown as Term;
  const registry = createRegistry();
  registry.register({ name: 'projects', description: '', async run() { executions++; } });
  registry.register(clear);
  const store = { all: () => [], get: () => undefined } as unknown as ContentStore;
  const shell = new Shell({ term, registry, store });
  void shell.start();
  const settle = () => new Promise((resolve) => setTimeout(resolve, 0));
  shell.input('draft');
  shell.inject('projects');
  await settle();
  assert.equal(executions, 1);
  assert.ok(writes.some((text) => text.startsWith('\r\x1b[0K') && text.endsWith('projects')));
  shell.input('\x1b[A');
  shell.input('\r');
  await settle();
  assert.equal(executions, 2);
  shell.input('proj');
  shell.input('\t');
  shell.input('\r');
  await settle();
  assert.equal(executions, 3);
  shell.inject('clear');
  await settle();
  assert.ok(writes.some((text) => text.includes('\x1b[2J')));
});
