interface PageArgs {
  dev: boolean;
}

interface HeadArgs {
  dev: boolean;
}

export interface PageTemplate {
  layout: string;
  page(args: PageArgs): string;
}
