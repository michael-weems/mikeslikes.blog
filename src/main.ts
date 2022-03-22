import './style.css';
import { isNotDefined, whenElementReady } from './utils';
import './components/command-palette';
import './components/article';
import './components/search';
import { openCommandPalette } from './commands/open-command-palette';

const app = document.querySelector<HTMLDivElement>('#app');
if (isNotDefined(app)) throw new Error('Could not find the app HTML Element!');

app.innerHTML = `
  <img src="https://i.redd.it/itafxefzhd0z.jpg"/>
  <div id="command-palette"></div>
  <div id="article"></div>
  
  <div class="fab-wrapper">
    <label class="fab">
      <span class="material-icons md-48 md-light">search</span>
    </label>
  </div>
</div>
`;

whenElementReady('.fab').then((fab) => {
  fab.addEventListener('click', () => {
    openCommandPalette({mode: 'search'})
  })
})