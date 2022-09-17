import Parser from 'rss-parser';

import { script } from './script.mjs';
import { style } from './style.mjs';
import { template } from './template.mjs';

const rss = 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en';

const parser = new Parser({
  customFields: {
    item: ['description']
  }
});

export const handler = async () => {
  const feed = await parser.parseURL(rss);
  const body = template({ feed, script, style });

  return {
    status: '200',
    statusDescription: 'OK',
    headers: {
      'cache-control': [{
        key: 'Cache-Control',
        value: 'max-age=300'
      }],
      'content-type': [{
        key: 'Content-Type',
        value: 'text/html; charset=utf-8'
      }]
    },
    body,
  };
};
