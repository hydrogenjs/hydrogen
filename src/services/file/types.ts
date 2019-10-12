import { HeadTag, Head } from '../head/types';

interface PageArgs {
  data: {
    [x: string]: any;
  };
  config: Config;
  dev: boolean;
  route?: {
    data: object;
    hash: string;
  };
}

interface DataArgs {
  config: Config;
  dev: boolean;
  route?: {
    data: object;
    hash: string;
  };
}

interface HeadArgs {
  dev: boolean;
  data: object;
}

export interface PageTemplate {
  layout?: string;
  title: string;
  route: {
    data: object;
    hash: string;
  };
  page(args: PageArgs): string;
  data?(args: DataArgs): Promise<object>;
  head?(args: HeadArgs): Promise<HeadTag[]>;
}

export interface PageProperties extends PageTemplate {
  name: string;
  path: string;
  dynamic: boolean;
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
  extraStaticFiles?: string[];
  sw?: string;
  head?: Head;
}

export interface Route {
  path: string;
  data: object;
  hash: string;
}
