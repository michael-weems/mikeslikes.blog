import './style.css';
import { isNotDefined, whenElementReady } from './utils';
import './components/command-palette';
import './components/article';
import './components/search';
import { closeCommandPalette, openCommandPalette } from './commands/open-command-palette';
import { detectswipe } from './swipe';

const app = document.querySelector<HTMLDivElement>('#app');
if (isNotDefined(app)) throw new Error('Could not find the app HTML Element!');

app.innerHTML = `
<div class="content">
  <img style="width:320px; height:180px;" src="https://i.redd.it/itafxefzhd0z.jpg"/>
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

detectswipe('body', () => openCommandPalette({mode: 'search'}).then());