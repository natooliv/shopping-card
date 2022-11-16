import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct } from './helpers/fetchFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
window.onload = async ()=>{
  console.log( await fetchProduct('MLB1405519561'));
}