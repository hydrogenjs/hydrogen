interface PageArgs {
  dev: boolean;
}

interface HeadArgs {
  dev: boolean;
}

export interface PageTemplate {
  layout: string;
  title: string;
  page(args: PageArgs): string;
  default: PageTemplate;
}

export interface PageProperties extends PageTemplate {
  name: string;
  path: string;
}

interface LayoutArgs {
  title: string;
  content: string;
  dev: boolean;
}

export interface LayoutTemplate {
  default: (args: LayoutArgs) => string;
}

export interface LayoutProperties extends LayoutTemplate {
  name: string;
}
