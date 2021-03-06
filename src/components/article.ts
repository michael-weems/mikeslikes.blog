import { Component, ComponentConstructor } from '../component';
import { whenElementReady } from '../utils';

const selector = 'article';

export const Article: Promise<Component<{}>> = whenElementReady(`#${selector}`).then((elem) => {
  return ComponentConstructor(elem, {
    selector, 
    onInit(){},
    readyWhen: ['#article-div'],
    data: {}, 
    template: () => `
    <div class="article-container">
      <div></div>
      <div id="article-div" class="article"></div>
      <div></div>
    </div>`,
  });
});


Article.then((article) => {
  article.render();
  article.onInit();
});