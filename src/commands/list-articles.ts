import { searchResultsTemplate } from '../search-result-template';
import { debounce, isNotDefined, whenElementReady } from '../utils';
import {closeCommandPalette, isCommandPaletteOpen, openCommandPalette} from './open-command-palette';
import { Command } from './types';
import {env} from '../env'

async function fetchArticles(): Promise<void> {
    whenElementReady('#article-div').then((articles) => {
        fetch(`${env.API_ADDRESS}/posts`).then(response => response.json()).then(async (response: {posts: string[]}) => {
            const {posts} = response;
            if (isNotDefined(posts)) {
              return;
            }
            // TODO: work on the API to only return the first 10 results
            articles.innerHTML = searchResultsTemplate(posts.map((post) => ({
              dataType: 'article', 
              data: post, 
              title: post.split('.')[2],
              description: post.split('.')[1]
            })));        
            const articleLinks = articles.querySelectorAll('[data-article]');
        
            articleLinks.forEach((element) => element.addEventListener('click', () => {
              const articleTitle = element.getAttribute('data-article');
              closeCommandPalette().then(() => {
                console.log('clicked article', element.getAttribute('data-article'));
                fetch(`${env.API_ADDRESS}/article-html?article=${articleTitle}`).then(response => response.json()).then((response: {article: string}) => {
                  articles!.innerHTML = response.article;
                });
              });
            }));
          });
    })
  
}



export async function renderInCommandPalette(){
    await closeCommandPalette();
    return await fetchArticles();
}

export async function action(){
  fetchArticles();
}

export const Command_ListArticles: Command = {
  name: 'Fetch Articles',
  action,
  renderInCommandPalette
};