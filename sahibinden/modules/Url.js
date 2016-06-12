import slugify from 'slugify';
export async function doUrl(param1, param2, param3, room) {
  return new Promise((resolve) => {
    let string = `${param1.toLowerCase()} ${param2.toLowerCase()}`;
   // let roomEncoded = room.replace('+','%2B');
    // params += "+"+roomEncoded;
    const listUrl = '/emlak-konut?query_text=' + slugify(string,'+');
    console.log('URL', listUrl);
    resolve(listUrl);
  });
}
