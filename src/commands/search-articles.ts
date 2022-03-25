import { searchResultsTemplate } from '../search-result-template';
import { debounce, isNotDefined, whenElementReady } from '../utils';
import {closeCommandPalette, isCommandPaletteOpen, openCommandPalette} from './open-command-palette';
import { Command } from './types';
import {env} from '../env'

interface SearchResult {
  Str: string;
  Index: number;
  MatchedIndexes: number[];
  Score: number
}
async function performSearch(searchBar: Element): Promise<void> {
  const searchResults = await whenElementReady('#search-results');
  const text = (<HTMLInputElement>searchBar).value;
  if (text == '') return;

  fetch(`${env.API_ADDRESS}/search?query=${text}`).then(response => response.json()).then(async (response: {posts: SearchResult[]}) => {
    const {posts} = response;
    if (isNotDefined(posts)) {
      searchResults.innerHTML = '';
      return;
    }
    if (posts.length > 10) posts.splice(10);
    // TODO: work on the API to only return the first 10 results
    searchResults.innerHTML = searchResultsTemplate(posts.map((post) => ({
      dataType: 'article', 
      data: post.Str, 
      title: post.Str.split('.')[2],
      description: post.Str.split('.')[1]
    })));
    const searchContainer = await whenElementReady('[data-article]');
    document.documentElement.style.setProperty('--command-palette-height', `${searchContainer.clientHeight}`);

    const articleLinks = searchResults.querySelectorAll('[data-article]');
    const articleDiv = document.getElementById('article-div');
    if (isNotDefined(articleDiv)) throw new Error('articleDiv not defined');

    articleLinks.forEach((element) => element.addEventListener('click', () => {
      const articleTitle = element.getAttribute('data-article');
      closeCommandPalette().then(() => {
        console.log('clicked article', element.getAttribute('data-article'));
        fetch(`${env.API_ADDRESS}/article-html?article=${articleTitle}`).then(response => response.json()).then((response: {article: string}) => {
          articleDiv!.innerHTML = response.article;
        });
      });
    }));
  });
}



export async function renderInCommandPalette(){
  whenElementReady('#search-bar').then( (searchBar) => {

    const debouncedSearch = debounce(() => performSearch(searchBar), 100)
    searchBar.addEventListener('keyup', debouncedSearch);
  });
}

export async function action(){
  if (false == isCommandPaletteOpen()) {
    openCommandPalette({mode: 'search'});
  } 
  whenElementReady('#search-bar').then((searchBar) => {
    (searchBar as HTMLInputElement).value = '';
  });
}

export const Command_SearchArticles: Command = {
  name: 'Search Articles',
  action,
  renderInCommandPalette
};