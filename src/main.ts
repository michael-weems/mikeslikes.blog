import { keyPress } from './key-press'
import * as KeyCode from './key-codes'
import { registerKeyPresses} from './key-press-register'
import {openCommandPalette} from './command-palette'
import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
  <!-- body overlay -->
  <div class="body-blackout"></div>

  <!-- Command Palette -->
  <div id="commandPalette"
    class="command-palette shadow card">
    <i class="fas fa-2x fa-times text-white bg-primary p-3 command-palette__close"></i>
    <h1 class="font-weight-bold">
      Command Palette
    </h1>
  </div>

  <h1>Jebus Bebus</h1>
`




const keyPress_CommandPalette = keyPress([KeyCode.COMMAND, KeyCode.SHIFT, KeyCode.P], openCommandPalette);
const keyPress_Alert = keyPress([KeyCode.CONTROL, KeyCode.L], () => alert('yee'))
registerKeyPresses([keyPress_CommandPalette, keyPress_Alert]);