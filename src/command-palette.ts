import { isDefined, isNotDefined } from "./utils";

export function openCommandPalette(){
    const commandPalette = document.getElementById(`commandPalette`);
    if (isNotDefined(commandPalette)) throw new Error('yo the dev is a dingus! there is no command-palette to open')

    const bodyBlackout = document.querySelector('.body-blackout')
    if (isNotDefined(bodyBlackout)) throw new Error('yo the dev is a dingus! there is no bodyBlackout element')


    commandPalette.classList.add('is--visible')
    bodyBlackout.classList.add('is-blacked-out')

    const closeCommandPalette = commandPalette.querySelector('.command-palette__close')
    if (isDefined(closeCommandPalette)){
        closeCommandPalette.addEventListener('click', () => {
            commandPalette.classList.remove('is--visible')
            if (isDefined(bodyBlackout)){
              bodyBlackout.classList.remove('is-blacked-out')
            }
        })
    }

  
  bodyBlackout.addEventListener('click', () => {
    // TODO: Turn into a function to close modal
    commandPalette.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out')
  })
}