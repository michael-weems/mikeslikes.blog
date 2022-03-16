import { Component, ComponentConstructor } from '../component';
import { whenElementReady } from '../utils';

const selector = 'article';

export const Article: Promise<Component<{}>> = whenElementReady(`#${selector}`).then((elem) => {
  return ComponentConstructor(elem, {
    selector, 
    data: {}, 
    template: (props) => `
    <div class="article-container">
      <div></div>
      <div id="article-div" class="article"></div>
      <div></div>
    </div>`,
  });
});


