const product = require('./product');
const search = require('./search');

const ENDPOINTS = {
  PRODUCT: 'https://api.mercadolibre.com/items/MLB1405519561',
  SEARCH: 'https://api.mercadolibre.com/sites/MLB/search?q=computador',
};

const TIME_IN_MILLISECONDS = 200;

const fetchSimulator = (url) => {
  if (url.endsWith('undefined')) {
    return Promise.reject(new Error('You must provide an url'));
  }
  const validUrl = Object.values(ENDPOINTS).includes(url);
  return Promise.resolve({
    status: validUrl ? 200 : 404,
    ok: validUrl,
    json: () => new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === ENDPOINTS.PRODUCT) {
          return resolve({...product});
        }

        if (url === ENDPOINTS.SEARCH) {
          return resolve({results: search});
        }

        return reject(new Error('URL não mapeada' + url));
      }, TIME_IN_MILLISECONDS);
    }),
  });
};

global.fetch = jest.fn(fetchSimulator);
afterEach(jest.clearAllMocks);

module.exports = fetchSimulator;
