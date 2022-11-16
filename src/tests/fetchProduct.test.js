import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProduct).toEqual('function');
  });
  it('fetch é chamado ao executar fetchProductList', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toBeCalled();
  });
  it('fetch é chamado com o endpoint correto ao executar fetchProductList', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });
 
});
