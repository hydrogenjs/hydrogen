import { Head, HeadTag } from './types';
import { Config } from '../file/types';

const mapHeadTags = ([tag, props, content = null]: HeadTag): string => {
  const keys = Object.keys(props);
  const attributes = keys.map((key: string): string => (props[key] === true ? `${key}` : `${key}="${props[key]}"`)).join(' ');

  if (content) {
    if (content === true) {
      return `<${tag} ${attributes}></${tag}>`;
    }

    if (!keys.length) {
      return `<${tag}>${content}</${tag}>`;
    }

    return `<${tag} ${attributes}>${content}</${tag}>`;
  }

  return `<${tag} ${attributes} />`;
};

export const transformHeadToHTML = async ({ head, data, config, dev }: { head?: Head; data: object; config: Config; dev: boolean }): Promise<string> => {
  const tags = head ? [
    ...config.head ? await config.head({ data, config, dev }) : [],
    ...await head({ data, config, dev }),
  ] : [];

  return tags.map(mapHeadTags).join('\n');
};
