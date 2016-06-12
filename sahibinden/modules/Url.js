export async function doUrl(param1, param2, param3, room) {
  return new Promise((resolve) => {
    let params = `${param1}+${param2}+${param3}`;
    let rooms = room.split('+');
    const roomParam = rooms[0] + "%2B" + rooms[1];
    params += "+"+roomParam;
    const listUrl = '/emlak-konut?query_text=' + params;
    resolve(listUrl);
  });
}
