import { isDefined, whenElementReady } from './utils';

interface BaseOptions<Data> {
  selector: string;
  readyWhen: string[];
  onInit(): void;
  template: (props: Data) => string;
  data: Data
}
export interface Component<Data> {
  selector: string;
  render(): Promise<Record<string, Element>>;
  onInit(): void
  setState(data: Data): void;
  unrender(): void
}
export interface Popup<Data> extends Component<Data> {
  openPopup(): Promise<void>;
  closePopup(): Promise<void>;
}

export interface Commandable {
  registerKeyboardShortcuts(): void;
}
export function isCommandable<T>(obj: Commandable | T): obj is Commandable {
  return isDefined((<Commandable>obj).registerKeyboardShortcuts);
}

export function ComponentConstructor<Data>(host: Element, options: BaseOptions<Data>): Component<Data> {
  let state = options.data;
  const template = options.template;

  return {
    selector: options.selector,
    async render() {
      host.innerHTML = template(state);
      
      const innerElements = await Promise.all(options.readyWhen
        .map(async (innerElement) => ({[innerElement]: await whenElementReady(innerElement) }))
      );
      return innerElements.reduce((elements, innerElement) => ({...elements, ...innerElement}));
    },
    onInit(){
      return options.onInit();
    },
    setState(data: Data){
      state = data;
    },
    unrender(){
      host.innerHTML = '';
    }
  };
}

