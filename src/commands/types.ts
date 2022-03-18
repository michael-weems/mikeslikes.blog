export interface Command {
  name: string;
  action(options?: unknown): void;
  renderInCommandPalette(): void;
}