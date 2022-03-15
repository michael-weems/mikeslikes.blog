import './style.css';
import './keyboard-shortcuts/register';
import { isNotDefined } from './utils';

const app = document.querySelector<HTMLDivElement>('#app');
if (isNotDefined(app)) throw new Error('Could not find the app HTML Element!');

const elements = new Map<'search-button' | 'search-results', Node>();

function titleCase(value: string): string{
  return value.split('-').map( (word) => 
    (word.charAt(0).toUpperCase() + word.slice(1))
  ).join(' ');
}

function registerSearchClickObserver(results: HTMLElement): void {
  const searchResultsObserver = new MutationObserver((mutations, observer) => {
    let linksRegistered = false;
    mutations.forEach((mutation) => {
      if (isNotDefined(mutation.addedNodes)) return;
      if (linksRegistered) return;
      const articleLinks = results.querySelectorAll('[data-article]');
      const articleDiv = document.getElementById('article-div');
      if (isNotDefined(articleDiv)) throw new Error('articleDiv not defined');

      articleLinks.forEach((element) => element.addEventListener('click', (event) => {
        console.log('clicked article', element.getAttribute('data-article'));
        fetch('http://localhost:8080/article-html?article=review.anime.black-clover').then(response => response.json()).then((response: {article: string}) => {
          articleDiv!.innerHTML = response.article;
        });
      }));
      linksRegistered = true;
    });
  });
  
  searchResultsObserver.observe(results, {
    childList: true
    , subtree: true
    , attributes: false
    , characterData: false
  });
}

type SearchResult = {
  Str: string;
  Index: number;
  MatchedIndexes: number[];
  Score: number
}
const clickRegistered = false;
function registerButtonClick(){
  if (clickRegistered) return;
  const searchResults = document.getElementById('search-results');
  if (isNotDefined(searchResults)) return;
  registerSearchClickObserver(searchResults);
  const searchButton = document.getElementById('search-button');
  if (isNotDefined(searchButton)) return;

  searchButton.addEventListener('click', (event) => {
    console.log('button clicked!');
    fetch('http://localhost:8080/search?query=a').then(response => response.json()).then((response: {posts: SearchResult[]}) => {
      console.log('fetched results!', response);

      const results = response.posts.map((result) => `
      <div class="card" data-article="${result.Str}">
        <h4>${titleCase(result.Str.split('.')[2])}</h4>
        <p style="color:red">${result.Str.split('.')[1]}</p>
      </div>`
      ).join('');
      searchResults.innerHTML = results;
    });
  });
  searchContainerObserver.disconnect();
}

const searchContainerObserver = new MutationObserver((mutations, observer) => {
  mutations.forEach((mutation) => {
    if (isNotDefined(mutation.addedNodes)) return;

    for (const node of Array.from(mutation.addedNodes)) {
      if (isNotDefined(node.id)) continue;
      // do things to your newly added nodes here
      if (node.id == 'search-button'){
        console.log('search-button found');
        elements.set('search-button', node);
      }
      if (node.id == 'search-results'){
        console.log('search-results found');
        elements.set('search-results', node);
      }
      registerButtonClick();
    }
    // stop watching using:
    // observer.disconnect();
  });
});

searchContainerObserver.observe(document.body, {
  childList: true
  , subtree: true
  , attributes: false
  , characterData: false
});



app.innerHTML = `
  <!-- body overlay -->
  <div class="body-blackout"></div>

  <!-- Command Palette -->
  <div id="commandPalette"
    class="command-palette shadow card">
    <i class="fas fa-2x fa-times text-white bg-primary p-3 close"></i>
    <h1 class="font-weight-bold">
      Command Palette
    </h1>
  </div>

  <div class="article-container">
    <div></div>
    <div id="article-div" class="article"></div>
    <div></div>
  </div>
  

  <h1>Jebus Bebus</h1>
  <button id="search-button" type="button">Fetch Posts</button>
  <div id="search-results"></div>
`;

