import { titleCase, whenElementReady } from '../utils';
import {closeCommandPalette} from './open-command-palette';
import { Command } from './types';
export enum Theme {
  light = 'light',
  dark = 'dark'
}
const ThemeList = Object.values(Theme);

export async function renderInCommandPalette(){
  const searchResults = await whenElementReady('#search-results');
  
  searchResults.innerHTML = ThemeList.map((theme) => `
  <div class="card--small" data-command="${theme}">
    <div class="result-title">${titleCase(theme)}</div>
  </div>
  `).join('');

  const themeChoices = searchResults.querySelectorAll('[data-command]');

  themeChoices.forEach((element) => element.addEventListener('click', (event) => {
    const themeChoice = element.getAttribute('data-command') as Theme;
    console.log('selected theme', themeChoice);
    setTheme(themeChoice);
    closeCommandPalette().then();
  }));
}

export async function setTheme(theme: Theme){
  document.body.className = theme;
}

export const Command_SetTheme: Command = {
  name: 'Set Theme',
  action: setTheme,
  renderInCommandPalette
};