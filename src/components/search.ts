import { closeCommandPalette } from '../commands/open-command-palette';
import { Component, ComponentConstructor } from '../component';
import { whenElementReady } from '../utils';

const selector = 'search';

export const Search: Promise<Component<{}>> = whenElementReady(`#${selector}`).then((elem) => {
  return ComponentConstructor(elem, {
    selector, 
    onInit(){},
    readyWhen: ['#search-bar', '#search-results'],
    data: {}, 
    template: () => `
    <input id="search-bar" class="search-bar" type="text" />
    <button id="close" type="button">X</button>
    <div id="search-results"></div>`,
  });
});

Search.then((search) => {
  search.render();
  search.onInit();
});

whenElementReady('#close').then((closeButton) => {
  closeButton.addEventListener('click', () => {
    closeCommandPalette().then();
  })
})