import { Component, ComponentConstructor } from '../component';
import { whenElementReady } from '../utils';

const selector = 'list-articles';

export const ListArticles: Promise<Component<{}>> = whenElementReady(`#${selector}`).then((elem) => {
  return ComponentConstructor(elem, {
    selector, 
    onInit(){},
    readyWhen: ['#articles'],
    data: {}, 
    template: () => `
    <div class="article-container">
      <div></div>
      <div id="article-div" class="article"></div>
      <div></div>
    </div>`,
  });
});

ListArticles.then((listArticles) => {
  listArticles.render();
  listArticles.onInit();
});