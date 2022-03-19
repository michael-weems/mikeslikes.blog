import { isDefined, isNotDefined, whenElementReady } from '../utils';
import { Command_SetTheme } from './set-theme';
import { SearchResult, searchResultsTemplate } from '../search-result-template';
import {Command_SearchArticles} from './search-articles';
import { Command } from './types';

const COMMAND_LIST = [Command_SetTheme, Command_SearchArticles];
const COMMAND_MAP: Record<string, unknown> = COMMAND_LIST.reduce((a, c) => ({...a, [c.name]: c}), {});

function getElements() {
  const commandPalette = document.querySelector('.command-palette');
  if (isNotDefined(commandPalette)) throw new Error('yo the dev is a dingus! there is no command-palette to open');
  
  const bodyBlackout = document.querySelector('.body-blackout');
  if (isNotDefined(bodyBlackout)) throw new Error('yo the dev is a dingus! there is no body-blackout element');
  
  return {commandPalette, bodyBlackout};
}

export function isCommandPaletteOpen(): boolean {
  return document.querySelector('.command-palette')?.classList.contains('is-visible') || false;
}

function renderCommandSelect(){
  const searchResults = document.getElementById('search-results');
  if (isNotDefined(searchResults)) throw new Error('yo the dev is a dingus! there is no searchResults element');

  const results: SearchResult[] = COMMAND_LIST.map((command) => ({dataType: 'command', data: command.name, title: command.name, description: ''}));
  searchResults.innerHTML = searchResultsTemplate(results);

  const commands = searchResults.querySelectorAll('[data-command]');

  commands.forEach((element) => element.addEventListener('click', () => {
    const commandKey = element.getAttribute('data-command')!;
    (COMMAND_MAP[commandKey] as Command).renderInCommandPalette();
  }));
}

function renderSearchArticles(){
  const searchResults = document.getElementById('search-results');
  if (isNotDefined(searchResults)) throw new Error('yo the dev is a dingus! there is no searchResults element');

  searchResults.innerHTML = 'No matching articles';
  (COMMAND_MAP['Search Articles'] as Command).renderInCommandPalette();
}

export async function openCommandPalette(options: {mode: 'search' | 'command'}){
  await whenElementReady('.command-palette');
  const {commandPalette, bodyBlackout} = getElements();

  commandPalette.classList.add('is-visible');
  bodyBlackout.classList.add('is-blacked-out');

  const searchBar = document.getElementById('search-bar') as HTMLInputElement;
  if (isNotDefined(searchBar)) throw new Error('yo the dev is a dingus! there is no searchBar element');

  const searchResults = document.getElementById('search-results');
  if (isNotDefined(searchResults)) throw new Error('yo the dev is a dingus! there is no searchResults element');
  
  switch(options.mode){
    case 'command': {
      searchBar.value = '>'; 
      break;
    }
    case 'search': {
      searchBar.value = '';
      break;
    }
    default: 
  }

  searchBar.addEventListener('keyup', () => {
    if (searchBar.value.startsWith('>')){
      renderCommandSelect();
    } else {
      renderSearchArticles();
    }
  });

  searchBar.focus();

  commandPalette.classList.add('is-visible');
  bodyBlackout.classList.add('is-blacked-out');

  const closeCommandPaletteButton = commandPalette.querySelector('.command-palette__close');
  if (isDefined(closeCommandPaletteButton)){
    closeCommandPaletteButton.addEventListener('click', () => {
      commandPalette.classList.remove('is-visible');
      if (isDefined(bodyBlackout)){
        bodyBlackout.classList.remove('is-blacked-out');
      }
    });
  }

  // Close the command palette if clicked outsideå
  bodyBlackout.addEventListener('click', () => {
    closeCommandPalette();
  });
}

export async function closeCommandPalette(){
  const commandPalette = document.querySelector('.command-palette');
  if (isNotDefined(commandPalette)) throw new Error('yo the dev is a dingus! there is no command-palette to close');

  const bodyBlackout = document.querySelector('.body-blackout');
  if (isNotDefined(bodyBlackout)) throw new Error('yo the dev is a dingus! there is no bodyBlackout element');

  commandPalette.classList.remove('is-visible');
  bodyBlackout.classList.remove('is-blacked-out');
}
