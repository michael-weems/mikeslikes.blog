import { searchResultsTemplate } from '../search-result-template';
import { isNotDefined, titleCase, whenElementReady } from '../utils';
import {closeCommandPalette, isCommandPaletteOpen, openCommandPalette} from './open-command-palette';
import { Command } from './types';

interface SearchResult {
  Str: string;
  Index: number;
  MatchedIndexes: number[];
  Score: number
}

export async function renderInCommandPalette(){
  whenElementReady('#search-bar').then( (searchBar) => {

    searchBar.addEventListener('keyup', async (event) => {
      const searchResults = await whenElementReady('#search-results');
      const text = (<HTMLInputElement>searchBar).value;

      if (text == '') return;
  
      // searchResults.innerHTML = '';
      fetch(`http://localhost:8080/search?query=${text}`).then(response => response.json()).then(async (response: {posts: SearchResult[]}) => {
        console.log('response', response);
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

        articleLinks.forEach((element) => element.addEventListener('click', (event) => {
          const articleTitle = element.getAttribute('data-article');
          closeCommandPalette().then(() => {
            console.log('clicked article', element.getAttribute('data-article'));
            fetch(`http://localhost:8080/article-html?article=${articleTitle}`).then(response => response.json()).then((response: {article: string}) => {
              articleDiv!.innerHTML = response.article;
            });
          });
        }));
      });
  
          
    });
  });
}

export async function action(){
  if (false == isCommandPaletteOpen()) {
    openCommandPalette({mode: 'search'});
  } 
  whenElementReady('#search-bar').then( (searchBar) => {
    (searchBar as HTMLInputElement).value = '';
  });
}

export const Command_SearchArticles: Command = {
  name: 'Search Articles',
  action,
  renderInCommandPalette
};