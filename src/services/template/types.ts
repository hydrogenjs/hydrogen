import { LayoutTemplate, PageTemplate, Config } from '../file/types';

export interface PageAndLayoutProperties {
  name: string;
  title: string;
  path: string;
  layout: LayoutTemplate['default'];
  page: PageTemplate['page'];
  data?: PageTemplate['data'];
  head?: PageTemplate['head'];
  route?: PageTemplate['route'];
}

export interface HTMLObject {
  html: string;
  name: string;
  path: string;
}

export interface Options {
  dev: boolean;
  config: Config;
}
