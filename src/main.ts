import './style.css';
import { isNotDefined } from './utils';
import './components/command-palette';
import './components/article';
import './components/search';

const app = document.querySelector<HTMLDivElement>('#app');
if (isNotDefined(app)) throw new Error('Could not find the app HTML Element!');

app.innerHTML = `
  <div id="command-palette"></div>
  <div id="article"></div>
`;
