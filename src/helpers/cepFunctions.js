export const getAddress = async (param) => {
  const pegandoApi = await Promise.any([
    fetch(`https://cep.awesomeapi.com.br/json/${param}`),
    fetch(`https://brasilapi.com.br/api/cep/v2/${param}`),
  ]);
  const dados = await pegandoApi.json();
  return dados;
};

export const searchCep = async () => {
  const pegandoTexto = document.querySelector('.cep-input');
  const endereco = document.querySelector('.cart__address');
  if (pegandoTexto.value === '00000000') {
    endereco.innerHTML = 'CEP não encontrado';
    return;
  }
  const pegaApi = await getAddress(pegandoTexto.value);
  const { city, district, state, address } = pegaApi;
  if (district === undefined) {
    endereco.innerHTML = 'CEP não encontrado';
  } else {
    endereco.innerHTML = `${address} - ${district} - ${city} - ${state}`;
  }
};
