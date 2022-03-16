import { isDefined, isNotDefined } from './utils';

interface BaseOptions<Data> {
  selector: string;
  template: (props: Data) => string;
  data: Data
}
export interface Component<Data> {
  selector: string;
  render(): void;
  setState(data: Data): void;
  unrender(): void
}
export interface Popup<Data> extends Component<Data> {
  openPopup(): Promise<void>;
  closePopup(): Promise<void>;
}

export interface Commandable {
  registerKeyboardShortcuts(): void;
  commands: (() => void)[]
}
export function isCommandable<T>(obj: Commandable | T): obj is Commandable {
  return isDefined((<Commandable>obj).commands) && isDefined((<Commandable>obj).registerKeyboardShortcuts);
}

export function ComponentConstructor<Data>(host: Element, options: BaseOptions<Data>): Component<Data> {
  let state = options.data;
  const template = options.template;

  return {
    selector: options.selector,
    render() {
      host.innerHTML = template(state);
    },
    setState(data: Data){
      state = data;
    },
    unrender(){
      host.innerHTML = '';
    }
  };
}

