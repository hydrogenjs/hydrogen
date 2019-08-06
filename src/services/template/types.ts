import { LayoutTemplate, PageTemplate } from '../file/types';

export interface PageAndLayoutProperties {
  name: string;
  title: string;
  path: string;
  layout: LayoutTemplate['default'];
  page: PageTemplate['page'];
}
