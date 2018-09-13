import { cancan } from './lib';
import gameStuff from './game';
import './index.css';

window.onerror = alert;

const { el } = cancan({ scale: 'auto', ...gameStuff });
document.querySelector('body').appendChild(el);
