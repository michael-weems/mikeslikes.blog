import { keyPress } from './key-press';
import { registerKeyPresses } from './key-press-register';
import {KeyCode} from './key-codes';
import { openCommandPalette } from '../commands/open-command-palette';

const keyboardShortcuts = [
  keyPress([KeyCode.Command, KeyCode.Shift, KeyCode.P], openCommandPalette),
  keyPress([KeyCode.Control, KeyCode.Shift, KeyCode.P], openCommandPalette),
];


registerKeyPresses(keyboardShortcuts);