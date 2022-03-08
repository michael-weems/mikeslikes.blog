import { keyPress } from "./key-press";
import { registerKeyPresses } from "./key-press-register";
import * as KeyCode from './key-codes'
import { openCommandPalette } from "../commands/open-command-palette";

const keyboardShortcuts = [
    keyPress([KeyCode.COMMAND, KeyCode.SHIFT, KeyCode.P], openCommandPalette),
];


registerKeyPresses(keyboardShortcuts);