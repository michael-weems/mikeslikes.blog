import { Component, ComponentConstructor } from '../component';
import { whenElementReady } from '../utils';

const selector = 'search';

export const Search: Promise<Component<{}>> = whenElementReady(`#${selector}`).then((elem) => {
  return ComponentConstructor(elem, {
    selector, 
    data: {}, 
    template: (props) => `
    <button id="search-button" type="button">Fetch Posts</button>
    <div id="search-results"></div>`,
  });
});


