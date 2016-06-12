import { doUrl } from './modules/Url';
import { reverse } from './modules/ReverseGeocoding';
import { doScrape } from './modules/Scrape';
import { distance } from './modules/Distance';
import _ from 'underscore';


// https://www.sahibinden.com/emlak-konut?pagingSize=0&query_text=Çamlaraltı

(async function getPages(lat = 37.9158, lon = 29.1202, room = '2+2') {
  const location = await reverse(lat, lon);
  let url = await doUrl(location.results[0].address_components[4].short_name,location.results[0].address_components[2].short_name,location.results[0].address_components[1].short_name, room);
  console.log(url);
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

  let pagesArray = await doScrape(url, list);
  if (pagesArray.pages.length === 0) {
    console.log('İçeride ilan yok!');
  }
  let detailesArray = [];
  let count = 0;
  for (let page of pagesArray.pages) {
    let data = await doScrape(page.url, detailedString);
    // console.log(data);
    let distanceB = await distance(data.lat, data.lon, lat, lon, 'K');
    // console.log(distanceB);
    detailesArray.push({
      content:data,
      distance: distanceB,
    });
    count++;
    if (count == 2) { break; }
  }

  _.sortBy(detailesArray, 'distance');

  console.log(detailesArray);
})();
