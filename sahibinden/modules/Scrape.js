import scrapeIt from 'scrape-it';

export function doScrape(uri, string) {
  return new Promise((resolve) => {
    scrapeIt('https://www.sahibinden.com'+uri, string).then(pages => {
      resolve(pages);
    });
  });
}
