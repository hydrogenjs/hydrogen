import { HeadTag, Head } from '../head/types';

interface PageArgs {
  data: object;
  config: Config;
  dev: boolean;
}

interface DataArgs {
  config: Config;
  dev: boolean;
}

interface HeadArgs {
  dev: boolean;
  data: object;
}

export interface PageTemplate {
  layout: string;
  title: string;
  page(args: PageArgs): string;
  data?(args: DataArgs): Promise<object>;
  head?(args: HeadArgs): Promise<HeadTag[]>;
  default: PageTemplate;
}

export interface PageProperties extends PageTemplate {
  name: string;
  path: string;
}

interface LayoutArgs {
  title: string;
  content: string;
  head: string;
  config: Config;
  dev: boolean;
}

export interface LayoutTemplate {
  default: (args: LayoutArgs) => string;
}

export interface LayoutProperties extends LayoutTemplate {
  name: string;
}

export interface Config {
  name?: string;
  staticFolder?: string;
  head?: Head;
}
