import 'babel-polyfill';
import scrapeIt from 'scrape-it';


// lat: {
//     selector: "#gmap",
//     attr: "data-lat",
// },
// lon: {
//   selector: "#gmap",
//   attr: "data-lon",
// }
// pages: {
//     listItem: ".vitrin-list > li"
//   , name: "pages"
//   , data: {
//         title: "a"
//       , url: {
//             selector: "a"
//           , attr: "href"
//         }
//     }
// }
// page.pages.forEach(function(piece, idx) {
//   // console.log(piece.url);
//   let url = piece.url;
//   console.log(url);
// }

// scrapeIt('https://www.sahibinden.com', {
//   pages: {
//     listItem: '.vitrin-list > li',
//     name: 'pages',
//     data: {
//       title: 'a',
//       url: {
//         selector: 'a',
//         attr: 'href',
//       },
//     },
//   },
// }).then(page => {
//     page.pages.forEach(function(piece, idx) {
//       // console.log(piece.url);
//       let url = piece.url;
//       console.log(url);
//     });
// });

function doScrape(string) {
  scrapeIt('https://www.sahibinden.com/emlak-konut?query_text=denizli+emlak', string).then(pages => {
    // const detailedString = {
    //   title: 'title',
    //   lat: {
    //     selector: '#gmap',
    //     attr: 'data-lat',
    //   },
    //   lon: {
    //     selector: '#gmap',
    //     attr: 'data-lon',
    //   },
    // };
    // for (let piece of page.url) {
    //   console.log(piece);
    //   // scrapeIt(piece.url, detailedString).then(content => {
    //   //     console.log(content);
    //   // });
    // }

    // console.log(pages);
    let pagesArr = [];
    for (let page of pages.pages) {
      // console.log(page.url);
      pagesArr.push(page);
    }
    return new Promise((resolve) => {
      resolve(pagesArr);
    });
    // scrapeIt('')
  });
}

const main = {
  pages: {
    listItem: '.vitrin-list > li',
    name: 'pages',
    data: {
      title: 'a',
      url: {
        selector: 'a',
        attr: 'href',
      },
    },
  },
};



async function getPages() {
  const url = {
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

  let pagesArray = await doScrape(url);

  console.log(pagesArray);
}

getPages();
