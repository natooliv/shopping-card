export const fetchProduct = async (param) => {
  const urlApi = `https://api.mercadolibre.com/items/${param}`;
  const response = await fetch(urlApi);
  const dados = await response.json();
  return dados;
};

export const fetchProductsList = async (param) => {
  const apiUrlComp = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
  const response = await fetch(apiUrlComp);
  const dados = await response.json();
  return dados;
};
