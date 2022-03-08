import { KeyPressEvents } from "./key-press";

const onKeyPressOperations: KeyPressEvents[] = [];
export function registerKeyPresses(commands: KeyPressEvents[]): void {
  onKeyPressOperations.push(...commands);
  document.onkeydown = (event: KeyboardEvent) => onKeyPressOperations.map(({onkeydown}) => onkeydown(event))
  document.onkeyup = (event: KeyboardEvent) => onKeyPressOperations.map(({onkeyup}) => onkeyup(event))
}