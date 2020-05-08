import fs from 'fs-extra';
import { normalize } from 'path';

interface Hooks {
  beforeDistRemoved?: (...args: unknown[]) => Promise<void>;
  afterDistRemoved?: (...args: unknown[]) => Promise<void>;
  beforeBuild?: (...args: unknown[]) => Promise<void>;
  afterBuild?: (...args: unknown[]) => Promise<void>;
  beforeEachPageGenerated?: (...args: unknown[]) => Promise<void>;
  beforeEachPageSaved?: (...args: unknown[]) => Promise<void>;
  afterEachPageGenerated?: (...args: unknown[]) => Promise<void>;
  beforeServiceWorkerGenerated?: (...args: unknown[]) => Promise<{ inject?: string; removeDefaults?: boolean }>;
  afterServiceWorkerGenerated?: (...args: unknown[]) => Promise<{ inject?: string; removeDefaults?: boolean }>;
}

const FILE = 'hydrogen.hooks.js';

const CWD = process.cwd();

const getHooks = async (): Promise<Hooks> => {
  if (!await fs.pathExists(normalize(`${CWD}/${FILE}`))) {
    return {};
  }

  return import(normalize(`${CWD}/${FILE}`));
};

export default getHooks;
