import { Commandable, ComponentConstructor, Popup } from '../component';
import { KeyCode } from '../keyboard-shortcuts/key-codes';
import { keyPress } from '../keyboard-shortcuts/key-press';
import { registerKeyPresses } from '../keyboard-shortcuts/key-press-register';
import { isDefined, isNotDefined, whenElementReady } from '../utils';

export const selector = 'command-palette';

function getElements() {
  const commandPalette = document.querySelector('.command-palette');
  if (isNotDefined(commandPalette)) throw new Error('yo the dev is a dingus! there is no command-palette to open');
  
  const bodyBlackout = document.querySelector('.body-blackout');
  if (isNotDefined(bodyBlackout)) throw new Error('yo the dev is a dingus! there is no body-blackout element');
  
  return {commandPalette, bodyBlackout};
}

async function closePopup(){
  await whenElementReady('.command-palette');

  const {commandPalette, bodyBlackout} = getElements();
  commandPalette.classList.remove('is-visible');
  bodyBlackout.classList.remove('is-blacked-out');
}
async function openPopup(){
  await whenElementReady('.command-palette');
  const {commandPalette, bodyBlackout} = getElements();

  commandPalette.classList.add('is-visible');
  bodyBlackout.classList.add('is-blacked-out');

  const closeCommandPalette = commandPalette.querySelector('.command-palette__close');
  if (isDefined(closeCommandPalette)){
    closeCommandPalette.addEventListener('click', () => {
      commandPalette.classList.remove('is-visible');
      if (isDefined(bodyBlackout)){
        bodyBlackout.classList.remove('is-blacked-out');
      }
    });
  }

  // Close the command palette if clicked outsideå
  bodyBlackout.addEventListener('click', () => {
    close();
  });
}

export const CommandPalette: Promise<Popup<{}> & Commandable> = whenElementReady(`#${selector}`).then((elem) => {
  return {
    ...ComponentConstructor(elem, {
      selector, 
      data: {}, 
      template: (props) => `
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
    openPopup,
    closePopup,
    commands: [
      closePopup, openPopup
    ], 
    registerKeyboardShortcuts() {
      registerKeyPresses([
        keyPress([KeyCode.Command, KeyCode.Shift, KeyCode.P], openPopup),
        keyPress([KeyCode.Control, KeyCode.Shift, KeyCode.P], openPopup)
      ]);
    }
  };
});