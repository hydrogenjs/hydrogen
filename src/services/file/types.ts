interface PageArgs {
  dev: boolean;
}

interface HeadArgs {
  dev: boolean;
}

interface PageTemplate {
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

interface LayoutTemplate {
  default: (args: LayoutArgs) => string;
}

export interface LayoutProperties extends LayoutTemplate {
  name: string;
}
