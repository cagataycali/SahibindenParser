import scrapeIt from 'scrape-it';
import request from 'request';

function doScrape(uri, string) {
  return new Promise((resolve) => {
    scrapeIt('https://www.sahibinden.com'+uri, string).then(pages => {
      resolve(pages);
    });
  });
}

async function doRequest(lat, lon) {
  return new Promise((resolve) => {
    request(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}`, (err2, response, body) => {
      const content = JSON.parse(body);
      resolve(content);
    });
  });
}

async function doUrl(param1, param2, param3) {
  return new Promise((resolve) => {
    let params = `${param1}+${param2}+${param3}`;
    resolve(params);
  });
}


// https://www.sahibinden.com/emlak-konut?pagingSize=0&query_text=Çamlaraltı

(async function getPages() {
  const lat = 37.9158;
  const lon = 29.1202;
  const location = await doRequest(lat, lon);
  let url = await doUrl(location.results[0].address_components[4].short_name,location.results[0].address_components[2].short_name,location.results[0].address_components[1].short_name);
  const room = '2+2'.split('+');
  const roomParam = room[0] + "%2B" + room[1];
  url += "+"+roomParam;
  const listUrl = '/emlak-konut?query_text=' + url;
  console.log(listUrl);
  process.exit(1);
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
    id: 'span#classifiedId',
    author : 'div.username-info-area>h5',
    publised: 'ul.classifiedInfoList>li:nth-child(2)>span',
    m2 : 'ul.classifiedInfoList>li:nth-child(4)>span',
    room: 'ul.classifiedInfoList>li:nth-child(5)>span',
    items: 'ul.classifiedInfoList>li:nth-child(11)>span',
    whoSell: 'ul.classifiedInfoList>li:nth-child(16)>span',
    description: 'div#classifiedDescription',
    price: 'div.classifiedInfo>h3',
    work : 'ul#phoneInfoPart>li:nth-child(1)>span:nth-child(2)',
    mobile: 'ul#phoneInfoPart>li:nth-child(2)>span:nth-child(2)',
    images: {
      listItem: '.classifiedDetailMainPhoto > label',
      name: 'pages',
      data: {
        url: {
          selector: 'img',
          attr: 'data-src',
        },
      },
    },
  };

  const listUri = '/emlak-konut?query_text=denizli+emlak';

  let pagesArray = await doScrape(listUri, list);
  for (let page of pagesArray.pages) {
    let data = await doScrape(page.url, detailedString);
    console.log(data);
  }
})();
