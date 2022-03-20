import { closeCommandPalette, openCommandPalette } from '../commands/open-command-palette';
import { Commandable, ComponentConstructor, Popup } from '../component';
import { KeyCode } from '../keyboard-shortcuts/key-codes';
import { keyPress } from '../keyboard-shortcuts/key-press';
import { registerKeyPresses } from '../keyboard-shortcuts/key-press-register';
import { whenElementReady } from '../utils';

export const selector = 'command-palette';


export const CommandPalette: Promise<Popup<{}> & Commandable> = whenElementReady(`#${selector}`).then((elem) => {
  return {
    ...ComponentConstructor(elem, {
      selector, 
      onInit(){},
      readyWhen: ['.body-blackout', '.command-palette'],
      data: {}, 
      
      template: () => `
      <!-- body overlay -->
      <div class="body-blackout"></div>

      <!-- Command Palette -->
      <div class="command-palette shadow card">
        <i class="fas fa-2x fa-times text-white bg-primary p-3 close"></i>
        <h1 class="font-weight-bold">
          <div id="search"></div>
        </h1>
      </div>`,
    }),
    async openPopup(){
      return openCommandPalette({mode: 'search'});
    },
    async closePopup(){      
      return closeCommandPalette();
    },
    registerKeyboardShortcuts() {
      registerKeyPresses([
        keyPress([KeyCode.Command, KeyCode.Shift, KeyCode.P], () => openCommandPalette({mode: 'command'})),
        keyPress([KeyCode.Control, KeyCode.Shift, KeyCode.P], () => openCommandPalette({mode: 'command'})),
        keyPress([KeyCode.Command, KeyCode.K], () => openCommandPalette({mode: 'search'})),
        keyPress([KeyCode.Control, KeyCode.K], () => openCommandPalette({mode: 'search'})),
      ]);
    }
  };
});

CommandPalette.then((commandPalette) => {
  commandPalette.render();
  commandPalette.onInit();
  commandPalette.registerKeyboardShortcuts();
});