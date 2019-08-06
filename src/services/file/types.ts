interface PageArgs {
  dev: boolean;
}

interface HeadArgs {
  dev: boolean;
}

export interface PageTemplate {
  layout: string;
  page(args: PageArgs): string;
  default: PageTemplate;
}

export interface PageProperties extends PageTemplate {
  name: string;
  path: string;
}

interface LayoutArgs {
  dev: boolean;
}

export interface LayoutTemplate {
  default: (args: LayoutArgs) => string;
}
