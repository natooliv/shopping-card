import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const carregandoo = document.querySelector('#carregando');

const carregando = () => {
  const criandoElemento = document.createElement('h1');
  criandoElemento.className = 'loading';
  criandoElemento.innerText = 'carregando...';
  carregandoo.appendChild(criandoElemento);
};

const removeCarregando = () => {
  const carregando2 = document.querySelector('.loading');
  carregando2.remove();
};

const criandoItem = async (param) => {
  carregando();
  const produtos = await fetchProductsList(param);
  console.log(produtos);
  const criandoMaisUm = document.querySelector('.products');
  produtos.forEach((item) => {
    const { id, title, thumbnail, price } = item;
    criandoMaisUm.appendChild(
      createProductElement({ id, title, thumbnail, price }),
    );
  });
  removeCarregando();
};

window.onload = async () => {
  await criandoItem('computador');
};
