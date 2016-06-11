import scrapeIt from 'scrape-it';

function doScrape(uri, string) {
  return new Promise((resolve) => {
    scrapeIt('https://www.sahibinden.com'+uri, string).then(pages => {
      resolve(pages);
    });
  });
}

async function getPages() {
  const list = {
    pages: {
      listItem: '.searchResultsItem > td.searchResultsTitleValue',
      name: 'pages',
      data: {
        title: 'a',
        url: {
          selector: '.classifiedTitle',
          attr: 'href',
        },
      },
    },
  };
  const detailedString = {
    lat: {
      selector: '#gmap',
      attr: 'data-lat',
    },
    lon: {
      selector: '#gmap',
      attr: 'data-lon',
    },
  };
  const listUri = '/emlak-konut?query_text=denizli+emlak';

  let pagesArray = await doScrape(listUri, list);
  //  console.log(pagesArray);
  for (let page of pagesArray.pages) {
    let data = await doScrape(page.url, detailedString);
    console.log(data);
  }
  // console.log(await detailScrape(`https://www.sahibinden.com/ilan/emlak-konut-satilik-ali-riza-kilinc-insaatdan-atalarda-88m2-alt-1-plus1-ust-1-plus1-2yillik-309203989/detay`, detailedString));
}

getPages();
