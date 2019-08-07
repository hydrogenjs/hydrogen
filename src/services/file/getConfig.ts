import { Config } from './types';

const FILE = 'hydrogen.config.js';

const CWD = process.cwd();

const getConfig = (): Promise<Config> => import(`${CWD}/${FILE}`);

export default getConfig;
