import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';

const criandoItem = async (param) => {
  const produtos = await fetchProductsList(param);
  console.log(produtos);
  const criandoMaisUm = document.querySelector('.products');
  produtos.forEach((item) => {
    const { id, title, thumbnail, price } = item;
    criandoMaisUm.appendChild(
      createProductElement({ id, title, thumbnail, price })
    );
  });
};
window.onload = async () => {
  await criandoItem('computador');
};

document.querySelector('.cep-button').addEventListener('click', searchCep);
