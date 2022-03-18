import { Component, ComponentConstructor } from '../component';
import { whenElementReady } from '../utils';

const selector = 'search';

export const Search: Promise<Component<{}>> = whenElementReady(`#${selector}`).then((elem) => {
  return ComponentConstructor(elem, {
    selector, 
    onInit(){},
    readyWhen: ['#search-bar', '#search-results'],
    data: {}, 
    template: (props) => `
    <input id="search-bar" type="text" />
    <div id="search-results"></div>`,
  });
});

Search.then((search) => {
  search.render();
  search.onInit();
});
