import './style.css';
import { isNotDefined, titleCase, whenElementReady } from './utils';
import { CommandPalette } from './components/command-palette';
import { isCommandable } from './component';
import { Search } from './components/search';
import { Article } from './components/article';

const app = document.querySelector<HTMLDivElement>('#app');
if (isNotDefined(app)) throw new Error('Could not find the app HTML Element!');

app.innerHTML = `
  <div id="command-palette"></div>
  <div id="article"></div>
`;

CommandPalette.then(async (commandPalette) => {
  const article = await Article;
  article.render();

  commandPalette.render();
  commandPalette.registerKeyboardShortcuts();

  Search.then((search) => {
    search.render();

    whenElementReady('#search-button').then(async (searchButton) => {
      const searchResults = await whenElementReady('#search-results');

      searchButton.addEventListener('click', (event) => {
        console.log('button clicked!');
        type SearchResult = {
          Str: string;
          Index: number;
          MatchedIndexes: number[];
          Score: number
        }
        fetch('http://localhost:8080/search?query=a').then(response => response.json()).then(async (response: {posts: SearchResult[]}) => {
          // TODO: work on the API to only return the first 10 results
          const results = response.posts.splice(0, 10).map((result) => `
          <div class="card--small" data-article="${result.Str}">
            <div class="result-title">${titleCase(result.Str.split('.')[2])}</div>
            <div class="result-tag">${result.Str.split('.')[1]}</div>
          </div>`
          ).join('');
          searchResults.innerHTML = results;

          const searchContainer = await whenElementReady('[data-article]');
          document.documentElement.style.setProperty('--command-palette-height', `${searchContainer.clientHeight}`);

          const articleLinks = searchResults.querySelectorAll('[data-article]');
          const articleDiv = document.getElementById('article-div');
          if (isNotDefined(articleDiv)) throw new Error('articleDiv not defined');

          articleLinks.forEach((element) => element.addEventListener('click', (event) => {
            const articleTitle = element.getAttribute('data-article');
            commandPalette.closePopup().then(() => {
              console.log('clicked article', element.getAttribute('data-article'));
              fetch(`http://localhost:8080/article-html?article=${articleTitle}`).then(response => response.json()).then((response: {article: string}) => {
                articleDiv!.innerHTML = response.article;
              });
            });
          }));
        });
      });
    });
  });
});


