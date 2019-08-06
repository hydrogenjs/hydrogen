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

interface LayoutArgs {
  dev: boolean;
}

export interface LayoutTemplate {
  default: (args: LayoutArgs) => string;
}
