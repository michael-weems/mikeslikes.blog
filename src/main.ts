import './style.css'
import './keyboard-shortcuts/register'

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
`;

