import { searchCep } from './helpers/cepFunctions';
import './style.css';
import {
  createProductElement,
  createCartProductElement,
} from './helpers/shopFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';

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

const erros = () => {
  const sinais = document.createElement('div');
  sinais.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  sinais.className = 'error';
  document.querySelector('.container').appendChild(sinais);
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

const addCarrinho = () => {
  const card = document.querySelector('.cart__products');
  const button = document.querySelectorAll('.product__add');

  button.forEach((botao) => {
    botao.addEventListener('click', async ({ target }) => {
      const ids = target.parentNode.firstChild.innerText;
      const data = await fetchProduct(ids);
      const { id, title, price, pictures } = data;
      card.appendChild(
        createCartProductElement({ id, title, price, pictures }),
      );
      const LocalStorage = JSON.parse(localStorage.getItem('salvaai'));
      if (LocalStorage === null) {
        localStorage.setItem(
          'salvaai',
          JSON.stringify([{ id, title, price, pictures }]),
        );
      } else {
        LocalStorage.push({ id, title, price, pictures });
        localStorage.setItem('salvaai', JSON.stringify(LocalStorage));
      }
    });
  });
};
const resgateLocal = () => {
  const card = document.querySelector('.cart__products');
  const LocalStorage = JSON.parse(localStorage.getItem('salvaai'));
  if (LocalStorage !== null) {
    LocalStorage.forEach((item) => {
      const { id, title, price, pictures } = item;
      card.appendChild(
        createCartProductElement({ id, title, price, pictures }),
      );
    });
  }
};
document.querySelector('.cep-button').addEventListener('click', searchCep);
window.onload = async () => {
  try {
    await criandoItem('computador');
  } catch (error) {
    erros();
  }
  addCarrinho();
  resgateLocal();
};
