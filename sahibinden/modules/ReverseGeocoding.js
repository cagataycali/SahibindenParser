import request from 'request';

export async function reverse(lat, lon) {
  return new Promise((resolve) => {
    request(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}`, (err2, response, body) => {
      const content = JSON.parse(body);
      resolve(content);
    });
  });
}
