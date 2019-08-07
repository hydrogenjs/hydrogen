import { Head, HeadTag } from './types';

const mapHeadTags = ([tag, props, content = null]: HeadTag): string => {
  const keys = Object.keys(props).map((key: string): string => `${key}="${props[key]}"`).join(' ');

  if (content) {
    if (content === true) {
      return `<${tag} ${keys}></${tag}>`;
    }

    if (!Object.keys(props).length) {
      return `<${tag}>${content}</${tag}>`;
    }

    return `<${tag} ${keys}>${content}</${tag}>`;
  }

  return `<${tag} ${keys} />`;
};

export const transformHeadToHTML = async ({ head, data, dev }: { head?: Head; data: object; dev: boolean }): Promise<string> => {
  const tags = head ? await head({ data, dev }) : [];

  return tags.map(mapHeadTags).join('\n');
};
